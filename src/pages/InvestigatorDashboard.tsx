import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Mic, Search, History, FileText, TrendingUp } from "lucide-react";

const InvestigatorDashboard = () => {
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
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Voice Command Center - Placeholder */}
          <Card className="lg:col-span-2 p-8">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-primary/10 p-8">
                  <Mic className="h-16 w-16 text-primary" />
                </div>
              </div>
              <h2 className="text-2xl font-bold">Voice Command Center</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Phase 2: Voice recognition and NLP processing will be implemented here
              </p>
              <div className="pt-4">
                <div className="inline-block px-4 py-2 bg-muted rounded-full">
                  <p className="text-sm font-mono text-muted-foreground">
                    Coming in Phase 2
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 text-left rounded-lg border border-border hover:bg-accent transition-colors">
                <div className="flex items-center gap-3">
                  <Search className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">New Search</p>
                    <p className="text-xs text-muted-foreground">Start investigation</p>
                  </div>
                </div>
              </button>
              <button className="w-full p-3 text-left rounded-lg border border-border hover:bg-accent transition-colors">
                <div className="flex items-center gap-3">
                  <History className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">View History</p>
                    <p className="text-xs text-muted-foreground">Past searches</p>
                  </div>
                </div>
              </button>
              <button className="w-full p-3 text-left rounded-lg border border-border hover:bg-accent transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Recent Cases</p>
                    <p className="text-xs text-muted-foreground">View details</p>
                  </div>
                </div>
              </button>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="text-center py-8 text-muted-foreground">
            <p>No recent activity</p>
            <p className="text-sm mt-2">Your searches and case views will appear here</p>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default InvestigatorDashboard;
