import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { History, Bookmark, Star, Trash2, Clock, Mic, FileText } from 'lucide-react';
import { SearchHistoryItem } from '@/types/case';
import { mockSearchHistory } from '@/utils/mockData';
import { format } from 'date-fns';

interface SearchHistoryProps {
  onSelectQuery?: (query: string) => void;
}

const SearchHistory = ({ onSelectQuery }: SearchHistoryProps) => {
  const [history, setHistory] = useState<SearchHistoryItem[]>(mockSearchHistory);
  const [filter, setFilter] = useState<'all' | 'bookmarked' | 'recent'>('all');

  const filteredHistory = history.filter(item => {
    if (filter === 'bookmarked') return item.isBookmarked;
    if (filter === 'recent') {
      const dayAgo = new Date();
      dayAgo.setDate(dayAgo.getDate() - 1);
      return new Date(item.timestamp) > dayAgo;
    }
    return true;
  });

  const toggleBookmark = (id: string) => {
    setHistory(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item
      )
    );
  };

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear search history?')) {
      setHistory([]);
    }
  };

  return (
    <Card className="p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Search History</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={clearHistory}
          className="h-8 w-8"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex gap-2 mb-4">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
          className="flex-1"
        >
          All
        </Button>
        <Button
          variant={filter === 'recent' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('recent')}
          className="flex-1"
        >
          Recent
        </Button>
        <Button
          variant={filter === 'bookmarked' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('bookmarked')}
          className="flex-1"
        >
          <Star className="h-3 w-3" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {filteredHistory.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No search history</p>
            </div>
          ) : (
            filteredHistory.map(item => (
              <div
                key={item.id}
                className="p-3 rounded-lg border border-border hover:bg-accent transition-colors cursor-pointer group"
                onClick={() => onSelectQuery?.(item.query)}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {item.queryType === 'voice' ? (
                      <Mic className="h-4 w-4 text-primary flex-shrink-0" />
                    ) : (
                      <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    )}
                    <p className="text-sm font-medium truncate">{item.query}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(item.id);
                    }}
                  >
                    <Bookmark
                      className={`h-3 w-3 ${item.isBookmarked ? 'fill-primary text-primary' : ''}`}
                    />
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{format(new Date(item.timestamp), 'MMM d, HH:mm')}</span>
                  <span>{item.resultsCount} results</span>
                  <span className="flex items-center gap-1">
                    <div className={`h-2 w-2 rounded-full ${
                      item.relevanceScore > 0.8 ? 'bg-green-500' :
                      item.relevanceScore > 0.6 ? 'bg-yellow-500' : 'bg-orange-500'
                    }`} />
                    {Math.round(item.relevanceScore * 100)}%
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default SearchHistory;
