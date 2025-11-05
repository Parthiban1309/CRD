export interface User {
  id: string;
  badgeNumber?: string;
  email: string;
  role: 'investigator' | 'senior_investigator' | 'admin';
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
  permissions: Permission[];
  status: 'pending' | 'approved' | 'suspended';
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'data_access' | 'case_management' | 'user_management' | 'system';
}

export interface UploadedFile {
  id: string;
  fileName: string;
  fileType: 'csv' | 'json' | 'xml';
  uploadedBy: string;
  uploadedAt: string;
  status: 'processing' | 'completed' | 'failed';
  recordCount: number;
  errorCount?: number;
  validationErrors?: ValidationError[];
}

export interface ValidationError {
  row: number;
  field: string;
  message: string;
}

export interface WorkflowCase {
  id: string;
  caseNumber: string;
  stage: 'pending_review' | 'review' | 'edit' | 'approve' | 'publish';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
  crimeType: string;
  location: string;
  submittedAt: string;
  updatedAt: string;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface SystemMetric {
  label: string;
  value: number | string;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
}

export interface ActivityLog {
  id: string;
  user: string;
  action: string;
  resource: string;
  timestamp: string;
  details?: string;
}
