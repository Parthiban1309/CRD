import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Case } from '@/types/case';
import { 
  FileText, MapPin, Calendar, AlertTriangle, 
  ChevronRight, Download, Bookmark, Flag 
} from 'lucide-react';
import { format } from 'date-fns';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface SearchResultsProps {
  cases: Case[];
  onSelectCase: (caseData: Case) => void;
  isLoading?: boolean;
}

const SearchResults = ({ cases, onSelectCase, isLoading }: SearchResultsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarkedCases, setBookmarkedCases] = useState<Set<string>>(new Set());
  const itemsPerPage = 10;

  const totalPages = Math.ceil(cases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCases = cases.slice(startIndex, endIndex);

  const toggleBookmark = (caseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedCases(prev => {
      const newSet = new Set(prev);
      if (newSet.has(caseId)) {
        newSet.delete(caseId);
      } else {
        newSet.add(caseId);
      }
      return newSet;
    });
  };

  const exportResults = () => {
    const dataStr = JSON.stringify(cases, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `case-search-results-${Date.now()}.json`;
    link.click();
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'high': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'low': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  if (isLoading) {
    return (
      <Card className="p-8">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-4" />
          <p className="text-muted-foreground">Searching cases...</p>
        </div>
      </Card>
    );
  }

  if (cases.length === 0) {
    return (
      <Card className="p-8">
        <div className="text-center text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium mb-2">No cases found</p>
          <p className="text-sm">Try adjusting your search filters or query</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Results Header */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Search Results</h3>
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(endIndex, cases.length)} of {cases.length} cases
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={exportResults}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Flag className="h-4 w-4 mr-2" />
              Bulk Actions
            </Button>
          </div>
        </div>
      </Card>

      {/* Case Cards */}
      <div className="space-y-3">
        {currentCases.map((caseData) => (
          <Card
            key={caseData.id}
            className="p-4 hover:shadow-glow-blue transition-shadow cursor-pointer group"
            onClick={() => onSelectCase(caseData)}
          >
            <div className="flex items-start gap-4">
              <div className="flex-1 space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-lg">{caseData.caseNumber}</h4>
                      <Badge className={getSeverityColor(caseData.severity)}>
                        {caseData.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-xl font-medium text-primary">{caseData.crimeType}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => toggleBookmark(caseData.id, e)}
                    >
                      <Bookmark
                        className={`h-4 w-4 ${bookmarkedCases.has(caseData.id) ? 'fill-primary text-primary' : ''}`}
                      />
                    </Button>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>

                {/* Details */}
                <div className="grid gap-2 md:grid-cols-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{caseData.location.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 flex-shrink-0" />
                    <span>{format(new Date(caseData.date), 'PPP')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                    <span>Confidence: {Math.round(caseData.confidenceScore * 100)}%</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {caseData.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{caseData.location.sector}</Badge>
                  <Badge variant="outline">{caseData.status.replace('_', ' ')}</Badge>
                  {caseData.suspects && caseData.suspects.length > 0 && (
                    <Badge variant="outline">{caseData.suspects.length} suspects</Badge>
                  )}
                  {caseData.evidence && caseData.evidence.length > 0 && (
                    <Badge variant="outline">{caseData.evidence.length} evidence items</Badge>
                  )}
                  {caseData.relatedCases && caseData.relatedCases.length > 0 && (
                    <Badge variant="outline">{caseData.relatedCases.length} related cases</Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
              />
            </PaginationItem>
            
            {[...Array(totalPages)].map((_, idx) => {
              const page = idx + 1;
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === page}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <PaginationItem key={page}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return null;
            })}
            
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default SearchResults;
