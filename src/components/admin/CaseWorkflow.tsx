import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  CheckCircle, XCircle, Edit, ArrowRight, 
  Clock, AlertTriangle, MessageSquare 
} from 'lucide-react';
import { WorkflowCase } from '@/types/admin';
import { mockWorkflowCases } from '@/utils/mockAdminData';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const CaseWorkflow = () => {
  const [cases, setCases] = useState<WorkflowCase[]>(mockWorkflowCases);
  const [selectedCase, setSelectedCase] = useState<WorkflowCase | null>(null);
  const [comment, setComment] = useState('');
  const [filter, setFilter] = useState<string>('all');
  const { toast } = useToast();

  const filteredCases = cases.filter(c => {
    if (filter === 'all') return true;
    if (filter === 'pending_review') return c.stage === 'pending_review';
    if (filter === 'urgent') return c.priority === 'urgent';
    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'high':
        return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'low':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'pending_review':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'review':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'edit':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'approve':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'publish':
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  const handleStageChange = (caseId: string, newStage: WorkflowCase['stage']) => {
    setCases(prev => prev.map(c => 
      c.id === caseId 
        ? { ...c, stage: newStage, updatedAt: new Date().toISOString() }
        : c
    ));
    
    toast({
      title: "Stage updated",
      description: `Case moved to ${newStage.replace('_', ' ')}`,
    });
  };

  const handleApprove = (caseId: string) => {
    if (!comment.trim()) {
      toast({
        title: "Comment required",
        description: "Please add a comment before approving",
        variant: "destructive"
      });
      return;
    }

    setCases(prev => prev.filter(c => c.id !== caseId));
    setSelectedCase(null);
    setComment('');
    
    toast({
      title: "Case approved",
      description: "Case has been published to the database",
    });
  };

  const handleReject = (caseId: string) => {
    if (!comment.trim()) {
      toast({
        title: "Comment required",
        description: "Please add a reason for rejection",
        variant: "destructive"
      });
      return;
    }

    setCases(prev => prev.filter(c => c.id !== caseId));
    setSelectedCase(null);
    setComment('');
    
    toast({
      title: "Case rejected",
      description: "Case has been sent back for revision",
      variant: "destructive"
    });
  };

  const handleBatchApprove = () => {
    const pendingCases = cases.filter(c => c.stage === 'approve');
    setCases(prev => prev.filter(c => c.stage !== 'approve'));
    
    toast({
      title: "Batch approval complete",
      description: `${pendingCases.length} cases approved and published`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Case Workflow Queue</h3>
          <div className="flex gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter cases" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cases</SelectItem>
                <SelectItem value="pending_review">Pending Review</SelectItem>
                <SelectItem value="urgent">Urgent Only</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleBatchApprove} disabled={!cases.some(c => c.stage === 'approve')}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Batch Approve
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-500">
              {cases.filter(c => c.stage === 'pending_review').length}
            </p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-500">
              {cases.filter(c => c.stage === 'review').length}
            </p>
            <p className="text-xs text-muted-foreground">In Review</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-500">
              {cases.filter(c => c.stage === 'edit').length}
            </p>
            <p className="text-xs text-muted-foreground">Editing</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-500">
              {cases.filter(c => c.stage === 'approve').length}
            </p>
            <p className="text-xs text-muted-foreground">Ready</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-500">
              {cases.filter(c => c.priority === 'urgent').length}
            </p>
            <p className="text-xs text-muted-foreground">Urgent</p>
          </div>
        </div>
      </Card>

      {/* Case List */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-3">
              {filteredCases.map((caseItem) => (
                <Card
                  key={caseItem.id}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedCase?.id === caseItem.id 
                      ? 'ring-2 ring-primary' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedCase(caseItem)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{caseItem.caseNumber}</h4>
                      <p className="text-sm text-primary">{caseItem.crimeType}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getPriorityColor(caseItem.priority)}>
                        {caseItem.priority}
                      </Badge>
                      <Badge className={getStageColor(caseItem.stage)}>
                        {caseItem.stage.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {format(new Date(caseItem.submittedAt), 'MMM d, HH:mm')}
                    </span>
                    <span>{caseItem.location}</span>
                  </div>

                  {caseItem.assignedTo && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Assigned to: </span>
                      <span className="font-medium">{caseItem.assignedTo}</span>
                    </div>
                  )}

                  {caseItem.comments && caseItem.comments.length > 0 && (
                    <div className="mt-2 flex items-center gap-1 text-sm text-accent">
                      <MessageSquare className="h-4 w-4" />
                      {caseItem.comments.length} comment(s)
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Case Detail Panel */}
        <Card className="p-6">
          {selectedCase ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">{selectedCase.caseNumber}</h3>
                <p className="text-primary">{selectedCase.crimeType}</p>
                <p className="text-sm text-muted-foreground">{selectedCase.location}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Workflow Stage</label>
                <Select
                  value={selectedCase.stage}
                  onValueChange={(value) => handleStageChange(selectedCase.id, value as WorkflowCase['stage'])}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending_review">Pending Review</SelectItem>
                    <SelectItem value="review">In Review</SelectItem>
                    <SelectItem value="edit">Needs Editing</SelectItem>
                    <SelectItem value="approve">Ready to Approve</SelectItem>
                    <SelectItem value="publish">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Add Comment</label>
                <Textarea
                  placeholder="Enter your review comments..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                />
              </div>

              {selectedCase.comments && selectedCase.comments.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Previous Comments</label>
                  <div className="space-y-2">
                    {selectedCase.comments.map((c) => (
                      <div key={c.id} className="p-3 bg-muted rounded text-sm">
                        <p className="font-medium">{c.author}</p>
                        <p className="text-muted-foreground text-xs mb-1">
                          {format(new Date(c.timestamp), 'PPp')}
                        </p>
                        <p>{c.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button
                  className="flex-1"
                  onClick={() => handleApprove(selectedCase.id)}
                  disabled={!comment.trim()}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => handleReject(selectedCase.id)}
                  disabled={!comment.trim()}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Edit className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Select a case to review</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CaseWorkflow;
