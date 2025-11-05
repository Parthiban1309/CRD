import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  UserPlus, UserCheck, UserX, Shield, Mail, 
  Search, MoreVertical, Ban, CheckCircle 
} from 'lucide-react';
import { User } from '@/types/admin';
import { mockUsers } from '@/utils/mockAdminData';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterRole, setFilterRole] = useState<string>('all');
  const { toast } = useToast();

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.badgeNumber?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleApproveUser = (userId: string) => {
    setUsers(prev => prev.map(u =>
      u.id === userId ? { ...u, status: 'approved' as const, isActive: true } : u
    ));
    
    toast({
      title: "User approved",
      description: "Registration has been approved. User can now access the system.",
    });
  };

  const handleSuspendUser = (userId: string) => {
    setUsers(prev => prev.map(u =>
      u.id === userId ? { ...u, status: 'suspended' as const, isActive: false } : u
    ));
    
    toast({
      title: "User suspended",
      description: "User access has been suspended.",
      variant: "destructive"
    });
  };

  const handleReactivateUser = (userId: string) => {
    setUsers(prev => prev.map(u =>
      u.id === userId ? { ...u, status: 'approved' as const, isActive: true } : u
    ));
    
    toast({
      title: "User reactivated",
      description: "User access has been restored.",
    });
  };

  const handleRoleChange = (userId: string, newRole: User['role']) => {
    setUsers(prev => prev.map(u =>
      u.id === userId ? { ...u, role: newRole } : u
    ));
    
    toast({
      title: "Role updated",
      description: `User role changed to ${newRole.replace('_', ' ')}`,
    });
  };

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'suspended':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
    }
  };

  const getRoleIcon = (role: User['role']) => {
    return <Shield className="h-4 w-4" />;
  };

  const pendingCount = users.filter(u => u.status === 'pending').length;
  const activeCount = users.filter(u => u.isActive).length;
  const suspendedCount = users.filter(u => u.status === 'suspended').length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-blue-500/10">
              <UserPlus className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{users.length}</p>
              <p className="text-xs text-muted-foreground">Total Users</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-green-500/10">
              <UserCheck className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{activeCount}</p>
              <p className="text-xs text-muted-foreground">Active</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-yellow-500/10">
              <UserPlus className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{pendingCount}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-red-500/10">
              <UserX className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{suspendedCount}</p>
              <p className="text-xs text-muted-foreground">Suspended</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by email or badge number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="investigator">Investigator</SelectItem>
              <SelectItem value="senior_investigator">Senior Investigator</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* User Table */}
      <Card>
        <ScrollArea className="h-[500px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Badge</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.email}</p>
                      <p className="text-xs text-muted-foreground">
                        Joined {format(new Date(user.createdAt), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.badgeNumber || <span className="text-muted-foreground">-</span>}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={user.role}
                      onValueChange={(value) => handleRoleChange(user.id, value as User['role'])}
                      disabled={user.status === 'pending'}
                    >
                      <SelectTrigger className="w-[160px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="investigator">Investigator</SelectItem>
                        <SelectItem value="senior_investigator">Senior Investigator</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.lastLogin ? (
                      <span className="text-sm">
                        {format(new Date(user.lastLogin), 'MMM d, HH:mm')}
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground">Never</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {user.permissions.length} permissions
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {user.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => handleApproveUser(user.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      )}
                      {user.status === 'approved' && user.isActive && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleSuspendUser(user.id)}
                        >
                          <Ban className="h-4 w-4 mr-1" />
                          Suspend
                        </Button>
                      )}
                      {user.status === 'suspended' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReactivateUser(user.id)}
                        >
                          <UserCheck className="h-4 w-4 mr-1" />
                          Reactivate
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default UserManagement;
