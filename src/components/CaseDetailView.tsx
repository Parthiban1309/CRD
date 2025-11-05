import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Case } from '@/types/case';
import { 
  FileText, MapPin, Calendar, AlertCircle, Users, 
  Archive, Printer, Download, TrendingUp, Clock 
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
    link.download = `${caseData.caseNumber}.json`;
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
      case 'pending': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'archived': return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
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
                {caseData.caseNumber}
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
                  <p className="font-medium">{caseData.crimeType}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(caseData.date), 'PPP p')}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {caseData.location.address}
                  </p>
                  <p className="text-sm text-muted-foreground">{caseData.location.sector}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Confidence Score</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all"
                        style={{ width: `${caseData.confidenceScore * 100}%` }}
                      />
                    </div>
                    <span className="font-medium">{Math.round(caseData.confidenceScore * 100)}%</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                Description
              </h3>
              <p className="text-muted-foreground leading-relaxed">{caseData.description}</p>
            </div>

            <Separator />

            {/* Suspects */}
            {caseData.suspects && caseData.suspects.length > 0 && (
              <>
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Suspects ({caseData.suspects.length})
                  </h3>
                  <ul className="space-y-2">
                    {caseData.suspects.map((suspect, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        {suspect}
                      </li>
                    ))}
                  </ul>
                </div>
                <Separator />
              </>
            )}

            {/* Evidence */}
            {caseData.evidence && caseData.evidence.length > 0 && (
              <>
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Archive className="h-5 w-5 text-primary" />
                    Evidence Index ({caseData.evidence.length})
                  </h3>
                  <ul className="space-y-2">
                    {caseData.evidence.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                        <div className="h-2 w-2 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <Separator />
              </>
            )}

            {/* Timeline */}
            {caseData.timeline && caseData.timeline.length > 0 && (
              <>
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Timeline
                  </h3>
                  <div className="space-y-3 relative pl-6 before:absolute before:left-2 before:top-0 before:bottom-0 before:w-px before:bg-border">
                    {caseData.timeline.map((event) => (
                      <div key={event.id} className="relative">
                        <div className="absolute -left-6 top-1 h-4 w-4 rounded-full border-2 border-primary bg-background" />
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(event.timestamp), 'PPp')}
                        </p>
                        <p className="font-medium">{event.description}</p>
                        <Badge variant="outline" className="mt-1">
                          {event.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Related Cases */}
            {caseData.relatedCases && caseData.relatedCases.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Related Cases ({caseData.relatedCases.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {caseData.relatedCases.map((caseId) => (
                    <Badge key={caseId} variant="outline" className="cursor-pointer hover:bg-accent">
                      {caseId}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CaseDetailView;
