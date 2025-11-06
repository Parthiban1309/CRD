import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Case, SearchFilters } from '@/types/case';

export function useCases(filters?: SearchFilters) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: cases = [], isLoading, error } = useQuery({
    queryKey: ['cases', filters],
    queryFn: async () => {
      let query = supabase
        .from('cases')
        .select('*')
        .eq('workflow_stage', 'published')
        .order('date_reported', { ascending: false });

      // Apply filters
      if (filters?.keywords) {
        query = query.or(`title.ilike.%${filters.keywords}%,description.ilike.%${filters.keywords}%,case_number.ilike.%${filters.keywords}%`);
      }

      if (filters?.crimeType && filters.crimeType !== 'all') {
        query = query.eq('crime_type', filters.crimeType);
      }

      if (filters?.severity && filters.severity !== 'all') {
        query = query.eq('severity', filters.severity);
      }

      if (filters?.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }

      if (filters?.dateFrom) {
        query = query.gte('date_reported', filters.dateFrom);
      }

      if (filters?.dateTo) {
        query = query.lte('date_reported', filters.dateTo);
      }

      if (filters?.sortBy) {
        query = query.order(filters.sortBy, { ascending: filters.sortOrder === 'asc' });
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching cases:', error);
        throw error;
      }

      return data || [];
    },
  });

  const analyzeCase = useMutation({
    mutationFn: async (caseId: string) => {
      const { data, error } = await supabase.functions.invoke('analyze-case', {
        body: { caseId }
      });

      if (error) throw error;
      return data;
    },
    onError: (error: Error) => {
      toast({
        title: 'Analysis Failed',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  const suggestActions = useMutation({
    mutationFn: async (caseId: string) => {
      const { data, error } = await supabase.functions.invoke('suggest-actions', {
        body: { caseId }
      });

      if (error) throw error;
      return data;
    },
    onError: (error: Error) => {
      toast({
        title: 'Suggestion Failed',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  return {
    cases,
    isLoading,
    error,
    analyzeCase,
    suggestActions,
    refetch: () => queryClient.invalidateQueries({ queryKey: ['cases'] })
  };
}