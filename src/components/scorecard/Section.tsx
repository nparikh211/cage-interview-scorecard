import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ChevronDown } from 'lucide-react';
import { darkColors, lightColors, questions } from '@/data/scorecard';
import { StarRating } from './StarRating';

interface SectionProps {
  title: string;
  items: string[];
  bgColor: string;
  darkMode: boolean;
  expandedSections: Record<string, boolean>;
  ratings: Record<string, number>;
  onToggleSection: (title: string) => void;
  onRatingClick: (category: string, rating: number) => void;
  getAttributeType: (attribute: string) => string;
}

export function Section({
  title,
  items,
  bgColor,
  darkMode,
  expandedSections,
  ratings,
  onToggleSection,
  onRatingClick,
  getAttributeType,
}: SectionProps) {
  const isExpanded = expandedSections[title];
  const colorKey = bgColor.includes('green')
    ? 'green'
    : bgColor.includes('blue')
    ? 'blue'
    : bgColor.includes('purple')
    ? 'purple'
    : 'orange';

  const calculateSectionRating = () => {
    let total = 0;
    items.forEach(item => {
      const rating = ratings[`${title}-${item}`] || 0;
      total += rating;
    });
    return total;
  };

  const sectionRating = calculateSectionRating();
  const maxPossibleScore = items.length * 5;

  return (
    <Card className={`p-3 sm:p-6 mb-6 scorecard-section ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onToggleSection(title)}
        >
          <h2
            className={`text-lg sm:text-xl font-semibold ${
              darkMode ? darkColors[colorKey].text : lightColors[colorKey].text
            }`}
          >
            {title}
          </h2>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>(click to expand)</span>
            <ChevronDown
              className={`w-4 h-4 transform transition-transform duration-200 group-hover:translate-y-0.5 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <StarRating
            category={title}
            rating={Math.round(sectionRating / items.length)}
            darkMode={darkMode}
            onRatingClick={() => {}}
          />
          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {sectionRating}/{maxPossibleScore}
          </span>
        </div>
      </div>

      <div
        className={`section-content transition-all duration-300 overflow-hidden ${
          isExpanded ? 'mt-4' : 'h-0'
        }`}
      >
        {items.map((item) => (
          <div key={item} className="mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <h3
                  className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}
                >
                  {item}
                </h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    getAttributeType(`${title}-${item}`) === 'Skill'
                      ? darkMode
                        ? 'bg-sky-900/30 text-sky-300'
                        : 'bg-sky-50 text-sky-600'
                      : darkMode
                      ? 'bg-emerald-900/30 text-emerald-300'
                      : 'bg-emerald-50 text-emerald-600'
                  }`}
                >
                  {getAttributeType(`${title}-${item}`)}
                </span>
              </div>
              <StarRating
                category={`${title}-${item}`}
                rating={ratings[`${title}-${item}`] || 0}
                darkMode={darkMode}
                onRatingClick={(rating) => onRatingClick(`${title}-${item}`, rating)}
              />
            </div>

            <div
              className={`rounded-lg p-4 mb-4 ${
                darkMode ? 'bg-gray-800/50' : 'bg-gray-50'
              }`}
            >
              <h4
                className={`font-medium mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Interview Questions:
              </h4>
              <ul className="list-disc list-inside space-y-2">
                {questions[title]?.[item]?.map((q, i) => (
                  <li
                    key={i}
                    className={`text-sm text-left ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    {q}
                  </li>
                ))}
              </ul>
            </div>

            <Textarea
              placeholder="Notes..."
              className={`w-full ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}