import { Case, SearchHistoryItem } from '@/types/case';

export const mockCases: Case[] = [
  {
    id: '1',
    caseNumber: 'CRD-2024-0156',
    crimeType: 'Armed Robbery',
    location: {
      address: '4521 Market Street',
      sector: 'Sector 9',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    date: '2024-11-01T14:30:00Z',
    description: 'Armed robbery at convenience store. Two suspects, one armed with handgun. Cash register emptied, estimated $2,500 stolen.',
    status: 'under_investigation',
    severity: 'high',
    suspects: ['John Doe (ID: S-445)', 'Unknown accomplice'],
    evidence: ['Security camera footage', 'Fingerprints on counter', 'Witness statements (3)'],
    confidenceScore: 0.87,
    relatedCases: ['CRD-2024-0142', 'CRD-2024-0098'],
    timeline: [
      {
        id: 't1',
        timestamp: '2024-11-01T14:30:00Z',
        description: 'Incident occurred',
        type: 'incident'
      },
      {
        id: 't2',
        timestamp: '2024-11-01T15:15:00Z',
        description: 'Police arrived on scene',
        type: 'investigation'
      }
    ],
    createdAt: '2024-11-01T15:30:00Z',
    updatedAt: '2024-11-04T10:22:00Z'
  },
  {
    id: '2',
    caseNumber: 'CRD-2024-0142',
    crimeType: 'Burglary',
    location: {
      address: '789 Oak Avenue',
      sector: 'Sector 12',
      coordinates: { lat: 40.7580, lng: -73.9855 }
    },
    date: '2024-10-28T22:15:00Z',
    description: 'Residential burglary. Entry through back window. Electronics and jewelry stolen, estimated $8,000 value.',
    status: 'under_investigation',
    severity: 'medium',
    suspects: ['Unknown'],
    evidence: ['Boot prints', 'Tool marks on window', 'Neighbor camera footage'],
    confidenceScore: 0.65,
    relatedCases: ['CRD-2024-0156'],
    createdAt: '2024-10-29T08:00:00Z',
    updatedAt: '2024-11-02T14:30:00Z'
  },
  {
    id: '3',
    caseNumber: 'CRD-2024-0098',
    crimeType: 'Assault',
    location: {
      address: '1234 Pine Street',
      sector: 'Sector 5',
      coordinates: { lat: 40.7489, lng: -73.9680 }
    },
    date: '2024-10-15T19:45:00Z',
    description: 'Physical assault outside bar. Victim hospitalized with minor injuries. Suspect fled scene.',
    status: 'closed',
    severity: 'medium',
    suspects: ['Michael Smith (ID: S-892) - Arrested'],
    evidence: ['Witness statements (5)', 'Bar security footage', 'Medical report'],
    confidenceScore: 0.92,
    createdAt: '2024-10-15T20:30:00Z',
    updatedAt: '2024-10-25T16:00:00Z'
  },
  {
    id: '4',
    caseNumber: 'CRD-2024-0189',
    crimeType: 'Vehicle Theft',
    location: {
      address: '567 Elm Boulevard',
      sector: 'Sector 9',
      coordinates: { lat: 40.7282, lng: -74.0776 }
    },
    date: '2024-11-03T03:20:00Z',
    description: '2022 Honda Accord stolen from parking lot. License plate: ABC-1234. Vehicle tracking system disabled.',
    status: 'under_investigation',
    severity: 'medium',
    suspects: [],
    evidence: ['Parking lot camera footage', 'Vehicle registration', 'Witness statement (1)'],
    confidenceScore: 0.58,
    createdAt: '2024-11-03T09:15:00Z',
    updatedAt: '2024-11-04T11:00:00Z'
  },
  {
    id: '5',
    caseNumber: 'CRD-2024-0201',
    crimeType: 'Drug Trafficking',
    location: {
      address: '890 Harbor Street',
      sector: 'Sector 3',
      coordinates: { lat: 40.7061, lng: -74.0087 }
    },
    date: '2024-11-04T16:00:00Z',
    description: 'Large-scale drug trafficking operation discovered. 15kg of controlled substances seized. Multiple suspects in custody.',
    status: 'pending',
    severity: 'critical',
    suspects: ['Carlos Rivera (ID: S-1024)', 'Maria Santos (ID: S-1025)', '3 additional suspects'],
    evidence: ['Drug samples', 'Financial records', 'Surveillance footage', 'Phone records'],
    confidenceScore: 0.95,
    relatedCases: ['CRD-2024-0177', 'CRD-2024-0185'],
    createdAt: '2024-11-04T17:30:00Z',
    updatedAt: '2024-11-04T18:00:00Z'
  }
];

export const mockSearchHistory: SearchHistoryItem[] = [
  {
    id: 'h1',
    query: 'Show me all armed robberies in Sector 9 this month',
    queryType: 'voice',
    timestamp: '2024-11-04T10:30:00Z',
    resultsCount: 3,
    relevanceScore: 0.89,
    isBookmarked: true
  },
  {
    id: 'h2',
    query: 'Find burglary cases near Oak Avenue',
    queryType: 'voice',
    timestamp: '2024-11-03T15:45:00Z',
    resultsCount: 5,
    relevanceScore: 0.76,
    isBookmarked: false
  },
  {
    id: 'h3',
    query: 'Drug trafficking',
    queryType: 'text',
    timestamp: '2024-11-02T09:20:00Z',
    resultsCount: 8,
    relevanceScore: 0.82,
    isBookmarked: true
  },
  {
    id: 'h4',
    query: 'Assault cases last week',
    queryType: 'voice',
    timestamp: '2024-11-01T14:10:00Z',
    resultsCount: 12,
    relevanceScore: 0.71,
    isBookmarked: false
  }
];
