export interface Case {
  id: string;
  case_number: string;
  title: string;
  description: string | null;
  crime_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'under_investigation' | 'closed' | 'cold_case';
  location: string | null;
  date_reported: string;
  primary_suspect: string | null;
  assigned_officer: string | null;
  evidence_summary: string | null;
  last_updated: string;
  created_at: string;
  workflow_stage: 'pending_review' | 'under_review' | 'needs_editing' | 'approved' | 'published';
}

export interface TimelineEvent {
  id: string;
  case_id: string;
  date: string;
  event_type: string;
  description: string;
  officer: string | null;
  created_at: string;
}

export interface SearchHistoryItem {
  id: string;
  user_id: string;
  query: string;
  filters: any;
  results_count: number;
  is_bookmarked: boolean;
  searched_at: string;
}

export interface SearchFilters {
  keywords?: string;
  crimeType?: string;
  severity?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: 'date_reported' | 'severity' | 'case_number';
  sortOrder?: 'asc' | 'desc';
}
