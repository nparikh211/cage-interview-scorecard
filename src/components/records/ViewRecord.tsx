import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X } from 'lucide-react';
import type { InterviewRecord } from '@/types/firestore';
import { Button } from '../ui/button';

interface ViewRecordProps {
  record: InterviewRecord;
  onClose: () => void;
}

export function ViewRecord({ record, onClose }: ViewRecordProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Interview Record</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(90vh-8rem)]">
          <div className="space-y-6 p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Candidate Name</label>
                <p className="text-lg">{record.candidateName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Role</label>
                <p className="text-lg">{record.role}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Company</label>
                <p className="text-lg">{record.companyName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Interview Date</label>
                <p className="text-lg">{new Date(record.interviewDate).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Interviewer</label>
                <p className="text-lg">{record.interviewerName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Decision</label>
                <p className="text-lg">{record.decision}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-sky-50 border border-sky-100">
                <h3 className="font-medium text-sky-900">Skill Score</h3>
                <p className="text-2xl font-bold text-sky-600">
                  {record.scores.skill.percentage}%
                </p>
                <p className="text-sm text-sky-700">
                  {record.scores.skill.score}/{record.scores.skill.total}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100">
                <h3 className="font-medium text-emerald-900">Will Score</h3>
                <p className="text-2xl font-bold text-emerald-600">
                  {record.scores.will.percentage}%
                </p>
                <p className="text-sm text-emerald-700">
                  {record.scores.will.score}/{record.scores.will.total}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-violet-50 border border-violet-100">
                <h3 className="font-medium text-violet-900">Total Score</h3>
                <p className="text-2xl font-bold text-violet-600">
                  {record.scores.total.percentage}%
                </p>
                <p className="text-sm text-violet-700">
                  {record.scores.total.score}/{record.scores.total.total}
                </p>
              </div>
            </div>

            {/* Display ratings and notes for each section */}
            {['Character', 'Acumen', 'Grit', 'Experience'].map((section) => (
              <div key={section} className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">{section}</h3>
                <div className="space-y-4">
                  {Object.entries(record.ratings)
                    .filter(([key]) => key.startsWith(section))
                    .map(([key, rating]) => (
                      <div key={key} className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            {key.split('-')[1]}
                          </label>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className={`text-lg ${
                                  star <= rating ? 'text-amber-400' : 'text-gray-300'
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Notes</label>
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">
                            {record.notes[key] || 'No notes'}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}