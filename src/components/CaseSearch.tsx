import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { SearchFilters } from '@/types/case';
import { Search, X, Filter, Calendar } from 'lucide-react';

interface CaseSearchProps {
  onSearch: (filters: SearchFilters) => void;
  initialFilters?: SearchFilters;
}

const CaseSearch = ({ onSearch, initialFilters }: CaseSearchProps) => {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters || {});
  const [selectedCrimeType, setSelectedCrimeType] = useState<string>('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('');

  const crimeTypeOptions = [
    'Armed Robbery', 'Burglary', 'Assault', 'Vehicle Theft', 
    'Drug Trafficking', 'Fraud', 'Vandalism', 'Homicide'
  ];

  const severityOptions = ['low', 'medium', 'high', 'critical'];
  const statusOptions = ['open', 'under_investigation', 'closed', 'cold_case'];

  const handleSearch = () => {
    onSearch(filters);
  };

  const clearFilters = () => {
    setFilters({});
    setSelectedCrimeType('');
    setSelectedSeverity('');
    onSearch({});
  };

  const hasActiveFilters = 
    filters.keywords || 
    filters.crimeType || 
    filters.severity || 
    filters.status ||
    filters.dateFrom ||
    filters.dateTo;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Advanced Search</h3>
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Keywords */}
        <div className="space-y-2">
          <Label htmlFor="keywords">Keywords</Label>
          <Input
            id="keywords"
            placeholder="Search by suspect, evidence, or case details..."
            value={filters.keywords || ''}
            onChange={(e) => setFilters({ ...filters, keywords: e.target.value })}
          />
        </div>

        {/* Crime Type */}
        <div className="space-y-2">
          <Label htmlFor="crimeType">Crime Type</Label>
          <Select
            value={selectedCrimeType}
            onValueChange={(value) => {
              setSelectedCrimeType(value);
              setFilters({ ...filters, crimeType: value === 'all' ? undefined : value });
            }}
          >
            <SelectTrigger id="crimeType">
              <SelectValue placeholder="All crime types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All crime types</SelectItem>
              {crimeTypeOptions.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Severity */}
        <div className="space-y-2">
          <Label>Severity Level</Label>
          <div className="flex gap-2">
            {severityOptions.map((severity) => (
              <Badge
                key={severity}
                variant={selectedSeverity === severity ? 'default' : 'outline'}
                className="cursor-pointer capitalize"
                onClick={() => {
                  const newSeverity = selectedSeverity === severity ? '' : severity;
                  setSelectedSeverity(newSeverity);
                  setFilters({ ...filters, severity: newSeverity || undefined });
                }}
              >
                {severity}
              </Badge>
            ))}
          </div>
        </div>

        {/* Status & Sort */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="status">Case Status</Label>
            <Select
              value={filters.status || 'all'}
              onValueChange={(value) => setFilters({ ...filters, status: value === 'all' ? undefined : value })}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.replace('_', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sortBy">Sort By</Label>
            <Select
              value={filters.sortBy || 'date_reported'}
              onValueChange={(value) => setFilters({ ...filters, sortBy: value as any })}
            >
              <SelectTrigger id="sortBy">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date_reported">Date Reported</SelectItem>
                <SelectItem value="severity">Severity</SelectItem>
                <SelectItem value="case_number">Case Number</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Date Range */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Date Range
          </Label>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Input
                type="date"
                value={filters.dateFrom || ''}
                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
              />
            </div>
            <div>
              <Input
                type="date"
                value={filters.dateTo || ''}
                onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Search Button */}
        <Button onClick={handleSearch} className="w-full" size="lg">
          <Search className="h-4 w-4 mr-2" />
          Search Cases
        </Button>
      </div>
    </Card>
  );
};

export default CaseSearch;