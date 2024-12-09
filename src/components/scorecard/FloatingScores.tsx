import type { Scores } from '@/types/scorecard';
import { darkColors, lightColors } from '@/data/scorecard';

interface FloatingScoresProps {
  scores: Scores;
  darkMode: boolean;
  visible: boolean;
}

export function FloatingScores({ scores, darkMode, visible }: FloatingScoresProps) {
  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-in-out ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div
        className={`w-full ${
          darkMode ? 'bg-gray-800/95 shadow-md' : 'bg-white/95 shadow-md'
        } backdrop-blur-sm border-b ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}
      >
        <div className="max-w-4xl mx-auto px-3 py-2 flex justify-between items-center gap-2 text-sm">
          <div className="flex items-center gap-2 sm:gap-6 flex-wrap">
            <div className={`whitespace-nowrap ${darkMode ? darkColors.blue.text : lightColors.blue.text}`}>
              <span className="font-semibold">{scores.skill.score}/{scores.skill.total}</span>
              <span className="text-xs sm:text-sm ml-1">Skill</span>
            </div>
            <div className={`whitespace-nowrap ${darkMode ? darkColors.green.text : lightColors.green.text}`}>
              <span className="font-semibold">{scores.will.score}/{scores.will.total}</span>
              <span className="text-xs sm:text-sm ml-1">Will</span>
            </div>
            <div className={`whitespace-nowrap ${darkMode ? darkColors.purple.text : lightColors.purple.text}`}>
              <span className="font-semibold">{scores.total.score}/{scores.total.total}</span>
              <span className="text-xs sm:text-sm ml-1">Total</span>
            </div>
          </div>
          <div className={`text-xs sm:text-sm whitespace-nowrap ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {scores.total.percentage}% Overall
          </div>
        </div>
      </div>
    </div>
  );
}