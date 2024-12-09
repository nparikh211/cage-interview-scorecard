import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import type { Scores } from '@/types/scorecard';
import { darkColors, lightColors } from '@/data/scorecard';

interface ScoreHeaderProps {
  scores: Scores;
  darkMode: boolean;
  onDarkModeToggle: () => void;
  onExportPDF: () => void;
}

export function ScoreHeader({ scores, darkMode, onDarkModeToggle, onExportPDF }: ScoreHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <h1 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Interview Scorecard
      </h1>
      <div className="flex items-center gap-2 sm:gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onDarkModeToggle}
          className={`rounded-full p-2 hover:bg-transparent ${darkMode ? 'bg-transparent' : 'bg-white'}`}
        >
          {darkMode ? '☀️' : '🌙'}
        </Button>
        <Button 
          onClick={onExportPDF} 
          className={`flex gap-2 items-center text-sm sm:text-base ${
            darkMode 
              ? 'bg-primary hover:bg-primary/90' 
              : 'bg-black text-white hover:bg-black/90'
          }`}
        >
          <Download className="h-4 w-4" />
          Export PDF
        </Button>
      </div>
    </div>
  );
}