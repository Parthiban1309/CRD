import { useState } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Search, History, FileText, TrendingUp } from "lucide-react";
import VoiceCommandCenter from "@/components/VoiceCommandCenter";
import SearchHistory from "@/components/SearchHistory";
import CaseSearch from "@/components/CaseSearch";
import SearchResults from "@/components/SearchResults";
import CaseDetailView from "@/components/CaseDetailView";
import { ParsedCommand } from "@/utils/nlpProcessor";
import { Case, SearchFilters } from "@/types/case";
import { mockCases } from "@/utils/mockData";

const InvestigatorDashboard = () => {
  const [lastCommand, setLastCommand] = useState<ParsedCommand | null>(null);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [searchResults, setSearchResults] = useState<Case[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleCommandParsed = (command: ParsedCommand) => {
    setLastCommand(command);
    console.log('Command received in dashboard:', command);
    
    if (!command.needsClarification) {
      performSearch(command);
    }
  };

  const performSearch = (command?: ParsedCommand) => {
    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let filtered = [...mockCases];

      // Filter based on command if provided
      if (command) {
        if (command.entities.crimeType && command.entities.crimeType.length > 0) {
          filtered = filtered.filter(c => 
            command.entities.crimeType?.some(type => 
              c.crimeType.toLowerCase().includes(type.toLowerCase())
            )
          );
        }
        
        if (command.entities.location) {
          filtered = filtered.filter(c =>
            c.location.address.toLowerCase().includes(command.entities.location!.toLowerCase()) ||
            c.location.sector.toLowerCase().includes(command.entities.location!.toLowerCase())
          );
        }

        if (command.entities.keywords && command.entities.keywords.length > 0) {
          filtered = filtered.filter(c =>
            command.entities.keywords?.some(keyword =>
              c.description.toLowerCase().includes(keyword.toLowerCase()) ||
              c.crimeType.toLowerCase().includes(keyword.toLowerCase())
            )
          );
        }
      }

      setSearchResults(filtered);
      setIsSearching(false);
      setShowSearch(false);
    }, 800);
  };

  const handleAdvancedSearch = (filters: SearchFilters) => {
    setIsSearching(true);
    
    setTimeout(() => {
      let filtered = [...mockCases];

      if (filters.crimeTypes && filters.crimeTypes.length > 0) {
        filtered = filtered.filter(c => filters.crimeTypes?.includes(c.crimeType));
      }

      if (filters.severity && filters.severity.length > 0) {
        filtered = filtered.filter(c => filters.severity?.includes(c.severity));
      }

      if (filters.status && filters.status.length > 0) {
        filtered = filtered.filter(c => filters.status?.includes(c.status));
      }

      if (filters.keywords) {
        filtered = filtered.filter(c =>
          c.description.toLowerCase().includes(filters.keywords!.toLowerCase()) ||
          c.crimeType.toLowerCase().includes(filters.keywords!.toLowerCase())
        );
      }

      if (filters.dateRange?.start) {
        filtered = filtered.filter(c => new Date(c.date) >= new Date(filters.dateRange!.start));
      }

      if (filters.dateRange?.end) {
        filtered = filtered.filter(c => new Date(c.date) <= new Date(filters.dateRange!.end));
      }

      // Sort results
      if (filters.sortBy === 'date') {
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      } else if (filters.sortBy === 'severity') {
        const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        filtered.sort((a, b) => severityOrder[b.severity] - severityOrder[a.severity]);
      } else if (filters.sortBy === 'relevance') {
        filtered.sort((a, b) => b.confidenceScore - a.confidenceScore);
      }

      setSearchResults(filtered);
      setIsSearching(false);
    }, 800);
  };

  const handleSelectQuery = (query: string) => {
    // Re-run search from history
    performSearch({ 
      intent: 'search_cases',
      entities: { keywords: [query] },
      confidence: 0.8,
      rawText: query,
      needsClarification: false,
      clarificationQuestion: ''
    });
  };

  return (
    <Layout role="investigator">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Investigator Dashboard
          </h1>
          <p className="text-muted-foreground">
            Voice-driven investigation tools and case management
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Searches</p>
                <p className="text-2xl font-bold">--</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-accent/10 p-3">
                <FileText className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cases Accessed</p>
                <p className="text-2xl font-bold">--</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <History className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Recent Queries</p>
                <p className="text-2xl font-bold">--</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-accent/10 p-3">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold">--</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Voice Command Center */}
          <div className="lg:col-span-2">
            <VoiceCommandCenter onCommandParsed={handleCommandParsed} />
          </div>

          {/* Search History */}
          <div className="lg:col-span-2 h-[600px]">
            <SearchHistory onSelectQuery={handleSelectQuery} />
          </div>
        </div>

        {/* Advanced Search */}
        {showSearch && (
          <CaseSearch 
            onSearch={handleAdvancedSearch}
            initialFilters={{}}
          />
        )}

        {/* Quick Actions with toggleable search */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid gap-3 md:grid-cols-3">
            <button 
              className="p-3 text-left rounded-lg border border-border hover:bg-accent transition-colors"
              onClick={() => setShowSearch(!showSearch)}
            >
              <div className="flex items-center gap-3">
                <Search className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Advanced Search</p>
                  <p className="text-xs text-muted-foreground">Filter & refine</p>
                </div>
              </div>
            </button>
            <button 
              className="p-3 text-left rounded-lg border border-border hover:bg-accent transition-colors"
              onClick={() => performSearch()}
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">All Cases</p>
                  <p className="text-xs text-muted-foreground">View database</p>
                </div>
              </div>
            </button>
            <button className="p-3 text-left rounded-lg border border-border hover:bg-accent transition-colors">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Analytics</p>
                  <p className="text-xs text-muted-foreground">View trends</p>
                </div>
              </div>
            </button>
          </div>
        </Card>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <SearchResults 
            cases={searchResults}
            onSelectCase={setSelectedCase}
            isLoading={isSearching}
          />
        )}

        {/* Case Detail Modal */}
        <CaseDetailView
          caseData={selectedCase}
          open={!!selectedCase}
          onOpenChange={(open) => !open && setSelectedCase(null)}
        />
      </div>
    </Layout>
  );
};

export default InvestigatorDashboard;
