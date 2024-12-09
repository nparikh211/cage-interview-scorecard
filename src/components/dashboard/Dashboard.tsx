import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileSpreadsheet, PlusCircle } from 'lucide-react';
import logo from '/logo.png';

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ea6565] to-[#b84141] p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="p-6 bg-white/95 backdrop-blur-sm">
          <div className="text-center mb-8">
            <img 
              src={logo}
              alt="Exordiom Talent" 
              className="h-12 mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-gray-900">Interview Management</h1>
            <p className="text-gray-500 mt-2">Create new scorecards or view existing records</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              onClick={() => navigate('/scorecard')}
              className="h-32 text-lg bg-[#ea6565] hover:bg-[#d45151]"
            >
              <PlusCircle className="mr-2 h-6 w-6" />
              New Interview Scorecard
            </Button>

            <Button
              onClick={() => navigate('/records')}
              variant="outline"
              className="h-32 text-lg border-2"
            >
              <FileSpreadsheet className="mr-2 h-6 w-6" />
              View Existing Records
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}