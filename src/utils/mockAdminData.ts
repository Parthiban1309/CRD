import { User, WorkflowCase, ActivityLog, UploadedFile } from '@/types/admin';

export const mockUsers: User[] = [
  {
    id: '1',
    badgeNumber: 'INV-1045',
    email: 'sarah.chen@crd.gov',
    role: 'investigator',
    isActive: true,
    createdAt: '2024-09-15T08:00:00Z',
    lastLogin: '2024-11-04T14:30:00Z',
    permissions: [
      { id: 'p1', name: 'View Cases', description: 'Access case database', category: 'data_access' },
      { id: 'p2', name: 'Search Records', description: 'Perform searches', category: 'data_access' }
    ],
    status: 'approved'
  },
  {
    id: '2',
    badgeNumber: 'INV-2087',
    email: 'mike.johnson@crd.gov',
    role: 'senior_investigator',
    isActive: true,
    createdAt: '2024-08-20T10:00:00Z',
    lastLogin: '2024-11-04T09:15:00Z',
    permissions: [
      { id: 'p1', name: 'View Cases', description: 'Access case database', category: 'data_access' },
      { id: 'p2', name: 'Search Records', description: 'Perform searches', category: 'data_access' },
      { id: 'p3', name: 'Edit Cases', description: 'Modify case data', category: 'case_management' }
    ],
    status: 'approved'
  },
  {
    id: '3',
    email: 'alex.martinez@crd.gov',
    role: 'investigator',
    isActive: false,
    createdAt: '2024-11-03T16:20:00Z',
    permissions: [],
    status: 'pending'
  },
  {
    id: '4',
    badgeNumber: 'INV-3421',
    email: 'lisa.wong@crd.gov',
    role: 'investigator',
    isActive: false,
    createdAt: '2024-10-10T11:30:00Z',
    lastLogin: '2024-10-15T13:20:00Z',
    permissions: [
      { id: 'p1', name: 'View Cases', description: 'Access case database', category: 'data_access' }
    ],
    status: 'suspended'
  }
];

export const mockWorkflowCases: WorkflowCase[] = [
  {
    id: 'w1',
    caseNumber: 'CRD-2024-0215',
    stage: 'pending_review',
    priority: 'urgent',
    crimeType: 'Armed Robbery',
    location: 'Sector 12',
    submittedAt: '2024-11-04T08:00:00Z',
    updatedAt: '2024-11-04T08:00:00Z'
  },
  {
    id: 'w2',
    caseNumber: 'CRD-2024-0214',
    stage: 'review',
    priority: 'high',
    assignedTo: 'Admin User',
    crimeType: 'Burglary',
    location: 'Sector 5',
    submittedAt: '2024-11-03T14:30:00Z',
    updatedAt: '2024-11-04T09:15:00Z',
    comments: [
      {
        id: 'c1',
        author: 'Admin User',
        text: 'Reviewing evidence attachments',
        timestamp: '2024-11-04T09:15:00Z'
      }
    ]
  },
  {
    id: 'w3',
    caseNumber: 'CRD-2024-0213',
    stage: 'edit',
    priority: 'medium',
    assignedTo: 'Senior Admin',
    crimeType: 'Fraud',
    location: 'Sector 8',
    submittedAt: '2024-11-02T10:00:00Z',
    updatedAt: '2024-11-03T16:45:00Z',
    comments: [
      {
        id: 'c2',
        author: 'Senior Admin',
        text: 'Needs location clarification',
        timestamp: '2024-11-03T16:45:00Z'
      }
    ]
  }
];

export const mockActivityLogs: ActivityLog[] = [
  {
    id: 'a1',
    user: 'Sarah Chen (INV-1045)',
    action: 'Case Search',
    resource: 'Armed Robbery cases',
    timestamp: '2024-11-04T14:30:00Z',
    details: 'Searched Sector 9, found 3 results'
  },
  {
    id: 'a2',
    user: 'Mike Johnson (INV-2087)',
    action: 'Case Updated',
    resource: 'CRD-2024-0156',
    timestamp: '2024-11-04T13:15:00Z',
    details: 'Updated suspect information'
  },
  {
    id: 'a3',
    user: 'Admin User',
    action: 'User Approved',
    resource: 'john.doe@crd.gov',
    timestamp: '2024-11-04T10:00:00Z',
    details: 'Investigator registration approved'
  },
  {
    id: 'a4',
    user: 'Sarah Chen (INV-1045)',
    action: 'Login',
    resource: 'System Access',
    timestamp: '2024-11-04T09:00:00Z'
  },
  {
    id: 'a5',
    user: 'Admin User',
    action: 'Data Upload',
    resource: 'cases_november.csv',
    timestamp: '2024-11-04T08:30:00Z',
    details: '50 records processed'
  }
];

export const mockUploadedFiles: UploadedFile[] = [
  {
    id: 'f1',
    fileName: 'cases_november.csv',
    fileType: 'csv',
    uploadedBy: 'Admin User',
    uploadedAt: '2024-11-04T08:30:00Z',
    status: 'completed',
    recordCount: 50,
    errorCount: 0
  },
  {
    id: 'f2',
    fileName: 'evidence_data.json',
    fileType: 'json',
    uploadedBy: 'Senior Admin',
    uploadedAt: '2024-11-03T15:00:00Z',
    status: 'completed',
    recordCount: 125,
    errorCount: 3,
    validationErrors: [
      { row: 23, field: 'case_id', message: 'Invalid case reference' },
      { row: 67, field: 'date', message: 'Invalid date format' },
      { row: 89, field: 'location', message: 'Missing required field' }
    ]
  },
  {
    id: 'f3',
    fileName: 'suspects_update.csv',
    fileType: 'csv',
    uploadedBy: 'Admin User',
    uploadedAt: '2024-11-04T14:00:00Z',
    status: 'processing',
    recordCount: 0
  }
];
