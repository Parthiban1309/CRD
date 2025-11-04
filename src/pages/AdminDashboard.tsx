import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Database, BarChart3, FileText, Upload, CheckCircle } from "lucide-react";

const AdminDashboard = () => {
  return (
    <Layout role="admin">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Administrator Dashboard
          </h1>
          <p className="text-muted-foreground">
            System management, data oversight, and user administration
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-accent/10 p-3">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">--</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Cases</p>
                <p className="text-2xl font-bold">--</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-accent/10 p-3">
                <CheckCircle className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Approval</p>
                <p className="text-2xl font-bold">--</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">System Health</p>
                <p className="text-2xl font-bold text-accent">Good</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabbed Interface */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="data">Data Management</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  Data Upload
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload and validate case data files (CSV, JSON, XML)
                </p>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Phase 4: Drag and drop files or click to browse
                  </p>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  Pending Approvals
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Review and approve cases awaiting publication
                </p>
                <div className="text-center py-8 text-muted-foreground">
                  <p>No pending approvals</p>
                  <p className="text-sm mt-2">Cases requiring approval will appear here</p>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent System Activity</h3>
              <div className="text-center py-8 text-muted-foreground">
                <p>No recent activity</p>
                <p className="text-sm mt-2">System events and logs will appear here</p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Data Management</h3>
              <p className="text-muted-foreground">
                Phase 4: Data upload, validation, and case workflow management will be implemented here
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">User Management</h3>
              <p className="text-muted-foreground">
                Phase 4: User registration, role assignment, and access control will be implemented here
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">System Analytics</h3>
              <p className="text-muted-foreground">
                Phase 4: Activity metrics, performance monitoring, and usage analytics will be implemented here
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
