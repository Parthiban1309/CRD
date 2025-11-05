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
  const [selectedCrimeTypes, setSelectedCrimeTypes] = useState<string[]>([]);
  const [selectedSeverities, setSelectedSeverities] = useState<string[]>([]);

  const crimeTypeOptions = [
    'Armed Robbery', 'Burglary', 'Assault', 'Vehicle Theft', 
    'Drug Trafficking', 'Fraud', 'Vandalism', 'Homicide'
  ];

  const severityOptions = ['low', 'medium', 'high', 'critical'];
  const statusOptions = ['pending', 'under_investigation', 'closed', 'archived'];

  const toggleCrimeType = (type: string) => {
    const newTypes = selectedCrimeTypes.includes(type)
      ? selectedCrimeTypes.filter(t => t !== type)
      : [...selectedCrimeTypes, type];
    setSelectedCrimeTypes(newTypes);
    setFilters({ ...filters, crimeTypes: newTypes });
  };

  const toggleSeverity = (severity: string) => {
    const newSeverities = selectedSeverities.includes(severity)
      ? selectedSeverities.filter(s => s !== severity)
      : [...selectedSeverities, severity];
    setSelectedSeverities(newSeverities);
    setFilters({ ...filters, severity: newSeverities });
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const clearFilters = () => {
    setFilters({});
    setSelectedCrimeTypes([]);
    setSelectedSeverities([]);
    onSearch({});
  };

  const hasActiveFilters = 
    selectedCrimeTypes.length > 0 || 
    selectedSeverities.length > 0 || 
    filters.keywords || 
    filters.status;

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

        {/* Crime Types */}
        <div className="space-y-2">
          <Label>Crime Types</Label>
          <div className="flex flex-wrap gap-2">
            {crimeTypeOptions.map((type) => (
              <Badge
                key={type}
                variant={selectedCrimeTypes.includes(type) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => toggleCrimeType(type)}
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>

        {/* Severity */}
        <div className="space-y-2">
          <Label>Severity Level</Label>
          <div className="flex gap-2">
            {severityOptions.map((severity) => (
              <Badge
                key={severity}
                variant={selectedSeverities.includes(severity) ? 'default' : 'outline'}
                className="cursor-pointer capitalize"
                onClick={() => toggleSeverity(severity)}
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
              value={filters.status?.[0] || ''}
              onValueChange={(value) => setFilters({ ...filters, status: value ? [value] : undefined })}
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
              value={filters.sortBy || 'date'}
              onValueChange={(value) => setFilters({ ...filters, sortBy: value as any })}
            >
              <SelectTrigger id="sortBy">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="severity">Severity</SelectItem>
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
                value={filters.dateRange?.start || ''}
                onChange={(e) => setFilters({
                  ...filters,
                  dateRange: { ...filters.dateRange, start: e.target.value, end: filters.dateRange?.end || '' }
                })}
              />
            </div>
            <div>
              <Input
                type="date"
                value={filters.dateRange?.end || ''}
                onChange={(e) => setFilters({
                  ...filters,
                  dateRange: { ...filters.dateRange, start: filters.dateRange?.start || '', end: e.target.value }
                })}
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
