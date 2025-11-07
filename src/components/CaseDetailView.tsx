import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Case } from '@/types/case';
import { 
  FileText, MapPin, Calendar, AlertCircle, 
  Printer, Download 
} from 'lucide-react';
import { format } from 'date-fns';

interface CaseDetailViewProps {
  caseData: Case | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CaseDetailView = ({ caseData, open, onOpenChange }: CaseDetailViewProps) => {
  if (!caseData) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(caseData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${caseData.case_number}.json`;
    link.click();
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'high': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'low': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'closed': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'under_investigation': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'open': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'cold_case': return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl mb-2">
                {caseData.case_number}
              </DialogTitle>
              <div className="flex gap-2">
                <Badge className={getSeverityColor(caseData.severity)}>
                  {caseData.severity.toUpperCase()}
                </Badge>
                <Badge className={getStatusColor(caseData.status)}>
                  {caseData.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={handlePrint}>
                <Printer className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleExport}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)] pr-4">
          <div className="space-y-6">
            {/* Case Summary */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Case Summary
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Crime Type</p>
                  <p className="font-medium">{caseData.crime_type}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Date Reported</p>
                  <p className="font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(caseData.date_reported), 'PPP')}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {caseData.location || 'Not specified'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Assigned Officer</p>
                  <p className="font-medium">{caseData.assigned_officer || 'Unassigned'}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Description */}
            {caseData.description && (
              <>
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-primary" />
                    Description
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{caseData.description}</p>
                </div>
                <Separator />
              </>
            )}

            {/* Primary Suspect */}
            {caseData.primary_suspect && (
              <>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Primary Suspect</h3>
                  <p className="text-muted-foreground">{caseData.primary_suspect}</p>
                </div>
                <Separator />
              </>
            )}

            {/* Evidence Summary */}
            {caseData.evidence_summary && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Evidence Summary</h3>
                <p className="text-muted-foreground leading-relaxed">{caseData.evidence_summary}</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CaseDetailView;