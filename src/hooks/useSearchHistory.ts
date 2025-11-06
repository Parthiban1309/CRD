import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import type { SearchHistoryItem } from '@/types/case';

export function useSearchHistory() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: history = [], isLoading } = useQuery({
    queryKey: ['search-history', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('search_history')
        .select('*')
        .eq('user_id', user.id)
        .order('searched_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error fetching search history:', error);
        throw error;
      }

      return data as SearchHistoryItem[];
    },
    enabled: !!user
  });

  const addSearch = useMutation({
    mutationFn: async (params: {
      query: string;
      filters?: any;
      resultsCount: number;
    }) => {
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('search_history')
        .insert({
          user_id: user.id,
          query: params.query,
          filters: params.filters,
          results_count: params.resultsCount
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['search-history'] });
    }
  });

  const toggleBookmark = useMutation({
    mutationFn: async (id: string) => {
      const item = history.find(h => h.id === id);
      if (!item) throw new Error('Item not found');

      const { error } = await supabase
        .from('search_history')
        .update({ is_bookmarked: !item.is_bookmarked })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['search-history'] });
    }
  });

  const deleteItem = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('search_history')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['search-history'] });
    }
  });

  const clearAll = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('search_history')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['search-history'] });
    }
  });

  return {
    history,
    isLoading,
    addSearch,
    toggleBookmark,
    deleteItem,
    clearAll
  };
}