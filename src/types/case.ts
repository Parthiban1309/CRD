export interface Case {
  id: string;
  caseNumber: string;
  crimeType: string;
  location: {
    address: string;
    sector: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  date: string;
  description: string;
  status: 'pending' | 'under_investigation' | 'closed' | 'archived';
  severity: 'low' | 'medium' | 'high' | 'critical';
  suspects?: string[];
  evidence?: string[];
  confidenceScore: number;
  relatedCases?: string[];
  timeline?: TimelineEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  description: string;
  type: 'incident' | 'investigation' | 'evidence' | 'suspect';
}

export interface SearchHistoryItem {
  id: string;
  query: string;
  queryType: 'voice' | 'text';
  timestamp: string;
  resultsCount: number;
  relevanceScore: number;
  isBookmarked: boolean;
}

export interface SearchFilters {
  crimeTypes?: string[];
  locations?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  severity?: string[];
  status?: string[];
  keywords?: string;
  sortBy?: 'date' | 'relevance' | 'severity';
  sortOrder?: 'asc' | 'desc';
}
