import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { jsPDF } from 'jspdf';
import { useScroll } from '@/hooks/use-scroll';
import html2canvas from 'html2canvas';
import { Section } from './Section';
import { ScoreHeader } from './ScoreHeader';
import { FloatingScores } from './FloatingScores';
import { darkColors, lightColors, attributeTypes } from '@/data/scorecard';
import type { Scores } from '@/types/scorecard';

const decisionOptions = [
  { value: 'No Decision', emoji: '❓' },
  { value: 'Strong Yes', emoji: '🎉' },
  { value: 'Yes', emoji: '👍' },
  { value: 'No', emoji: '👎' },
  { value: 'Strong No', emoji: '‼️' },
];

export default function InterviewScorecard() {
  const { theme, setTheme } = useTheme();
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);
  const [decision, setDecision] = useState('No Decision');
  const sectionsList = ['Character', 'Acumen', 'Grit', 'Experience'];
  const scrollY = useScroll();
  const [formData, setFormData] = useState({
    candidateName: '',
    role: '',
    companyName: '',
    interviewerName: '',
    interviewDate: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const darkMode = theme === 'dark';

  const calculateScores = (): Scores => {
    const totalPossibleSkill =
      Object.entries(attributeTypes).filter(([_, type]) => type === 'Skill')
        .length * 5;
    const totalPossibleWill =
      Object.entries(attributeTypes).filter(([_, type]) => type === 'Will')
        .length * 5;

    let skillTotal = 0;
    let willTotal = 0;

    Object.entries(ratings).forEach(([category, rating]) => {
      const type = getAttributeType(category);
      if (type === 'Skill') {
        skillTotal += rating;
      } else {
        willTotal += rating;
      }
    });

    return {
      skill: {
        score: skillTotal,
        total: totalPossibleSkill,
        percentage: Math.round((skillTotal / totalPossibleSkill) * 100) || 0,
      },
      will: {
        score: willTotal,
        total: totalPossibleWill,
        percentage: Math.round((willTotal / totalPossibleWill) * 100) || 0,
      },
      total: {
        score: skillTotal + willTotal,
        total: totalPossibleSkill + totalPossibleWill,
        percentage:
          Math.round(
            ((skillTotal + willTotal) / (totalPossibleSkill + totalPossibleWill)) *
              100
          ) || 0,
      },
    };
  };

  const handleRatingClick = (category: string, rating: number) => {
    setRatings((prev) => ({
      ...prev,
      [category]: rating,
    }));
  };

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const getAttributeType = (attribute: string) => {
    return attributeTypes[attribute as keyof typeof attributeTypes] || 'Skill';
  };

  const exportToPDF = async () => {
    const element = document.querySelector('.scorecard-container');
    if (element) {
      const currentExpandedState = { ...expandedSections };
      const expandedState = sectionsList.reduce((acc, section) => ({
        ...acc,
        [section]: true
      }), {});
      setExpandedSections(expandedState);

      await new Promise(resolve => setTimeout(resolve, 500));

      const pdf = new jsPDF({
        unit: 'pt',
        format: 'a4',
        orientation: 'portrait',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 40;
      const contentHeight = pageHeight - 2 * margin;
      const contentWidth = pageWidth - 2 * margin;

      const header = document.querySelector('.sticky') as HTMLElement;
      const select = document.querySelector('select') as HTMLElement;
      const originalFontFamily = document.body.style.fontFamily;
      const originalStyles = new Map();
      const textareas = element.querySelectorAll('textarea');
      const sections = element.querySelectorAll('.scorecard-section');
      let currentY = margin;
      let currentPage = 1;
      
      if (header) {
        originalStyles.set(header, header.style.position);
        header.style.position = 'static';
      }

      if (select) {
        originalStyles.set(select, {
          width: select.style.width,
          minWidth: select.style.minWidth,
          padding: select.style.padding
        });
        select.style.width = 'auto';
        select.style.minWidth = '200px';
        select.style.padding = '8px 12px';
      }

      // Save textarea content and styles
      const textareaContents = new Map();
      textareas.forEach((textarea: HTMLTextAreaElement) => {
        textareaContents.set(textarea, textarea.value);
        textarea.style.height = 'auto';
        textarea.style.minHeight = '100px';
      });
      
      document.body.style.fontFamily = 'Inter, sans-serif';

      const starButtons = element.querySelectorAll('button');
      starButtons.forEach(button => {
        originalStyles.set(button, button.style.backgroundColor);
        button.style.backgroundColor = 'transparent';
      });

      // Process sections to determine page breaks
      sections.forEach((section: Element) => {
        const sectionHeight = (section as HTMLElement).offsetHeight;
        if (currentY + sectionHeight > pageHeight - margin) {
          currentY = margin;
          currentPage++;
        }
        currentY += sectionHeight + 20; // Add some spacing between sections
      });

      const canvas = await html2canvas(element as HTMLElement, {
        scale: 1.5, // Reduced scale for smaller file size
        useCORS: true,
        backgroundColor: darkMode ? '#111827' : '#ffffff',
        logging: false,
        imageTimeout: 0,
        removeContainer: true,
        onclone: (clonedDoc) => {
          const sections = clonedDoc.querySelectorAll('.section-content');
          sections.forEach((section: Element) => {
            (section as HTMLElement).style.height = 'auto';
            (section as HTMLElement).style.overflow = 'visible';
            (section as HTMLElement).style.pageBreakInside = 'avoid';
          });
          
          const clonedTextareas = clonedDoc.querySelectorAll('textarea');
          clonedTextareas.forEach((textarea: HTMLTextAreaElement, index) => {
            const originalTextarea = textareas[index];
            textarea.value = textareaContents.get(originalTextarea) || '';
          });

          const select = clonedDoc.querySelector('select');
          if (select) {
            select.style.color = darkMode ? '#ffffff' : '#000000';
            select.style.backgroundColor = 'transparent';
          }

          const stars = clonedDoc.querySelectorAll('.star-rating button');
          stars.forEach((star: HTMLElement) => {
            star.style.backgroundColor = 'transparent';
          });
        }
      });

      const scale = contentWidth / canvas.width;
      const scaledHeight = canvas.height * scale;

      let heightLeft = scaledHeight;
      let position = 0;

      while (heightLeft > 0) {
        const currentHeight = Math.min(heightLeft, contentHeight);
        
        if (position > 0) {
          pdf.addPage();
        }

        pdf.addImage(
          canvas,
          'PNG',
          margin,
          margin - position,
          contentWidth,
          scaledHeight,
          undefined,
          'FAST' // Use faster compression
        );

        heightLeft -= contentHeight;
        position += contentHeight;
      }


      starButtons.forEach(button => {
        button.style.backgroundColor = originalStyles.get(button);
      });

      // Restore textarea styles
      textareas.forEach((textarea: HTMLTextAreaElement) => {
        textarea.style.height = '';
        textarea.style.minHeight = '';
      });

      document.body.style.fontFamily = originalFontFamily;

      const date = formData.interviewDate || new Date().toISOString().split('T')[0];
      const candidateName = formData.candidateName || 'Candidate';
      const filename = `${candidateName.replace(/\s+/g, '-')}-Interview-${date}.pdf`;

      pdf.save(filename);
    }
  };

  const scores = calculateScores();

  return (
    <div
      className={`max-w-4xl mx-auto p-2 sm:p-6 scorecard-container ${
        darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
      }`}
    >
      <FloatingScores
        scores={scores}
        darkMode={darkMode}
        visible={scrollY > 100}
      />
      <div className="bg-inherit">
        <Card className={`p-3 sm:p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <ScoreHeader
            scores={scores}
            darkMode={darkMode}
            onDarkModeToggle={() => setTheme(darkMode ? 'light' : 'dark')}
            onExportPDF={exportToPDF}
          />

          <div className="hidden sm:grid sm:grid-cols-3 gap-4 mb-6 text-center">
            <div
              className={`p-4 rounded-lg border ${
                darkMode
                  ? `${darkColors.blue.bg} ${darkColors.blue.border}`
                  : `${lightColors.blue.bg} ${lightColors.blue.border}`
              }`}
            >
              <div
                className={`text-2xl font-bold ${
                  darkMode ? darkColors.blue.text : lightColors.blue.text
                }`}
              >
                {scores.skill.score}/{scores.skill.total}
              </div>
              <div
                className={darkMode ? darkColors.blue.text : lightColors.blue.text}
              >
                {scores.skill.percentage}%
              </div>
              <div
                className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
              >
                Skill Score
              </div>
            </div>
            <div
              className={`p-4 rounded-lg border ${
                darkMode
                  ? `${darkColors.green.bg} ${darkColors.green.border}`
                  : `${lightColors.green.bg} ${lightColors.green.border}`
              }`}
            >
              <div
                className={`text-2xl font-bold ${
                  darkMode ? darkColors.green.text : lightColors.green.text
                }`}
              >
                {scores.will.score}/{scores.will.total}
              </div>
              <div
                className={darkMode ? darkColors.green.text : lightColors.green.text}
              >
                {scores.will.percentage}%
              </div>
              <div
                className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
              >
                Will Score
              </div>
            </div>
            <div
              className={`p-4 rounded-lg border ${
                darkMode
                  ? `${darkColors.purple.bg} ${darkColors.purple.border}`
                  : `${lightColors.purple.bg} ${lightColors.purple.border}`
              }`}
            >
              <div
                className={`text-2xl font-bold ${
                  darkMode ? darkColors.purple.text : lightColors.purple.text
                }`}
              >
                {scores.total.score}/{scores.total.total}
              </div>
              <div
                className={darkMode ? darkColors.purple.text : lightColors.purple.text}
              >
                {scores.total.percentage}%
              </div>
              <div
                className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
              >
                Total Score
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:hidden gap-2 mb-6 text-center">
            <div
              className={`p-2 rounded-lg border ${
                darkMode
                  ? `${darkColors.blue.bg} ${darkColors.blue.border}`
                  : `${lightColors.blue.bg} ${lightColors.blue.border}`
              }`}
            >
              <div
                className={`text-lg font-bold ${
                  darkMode ? darkColors.blue.text : lightColors.blue.text
                }`}
              >
                {scores.skill.score}/{scores.skill.total}
              </div>
              <div
                className={`text-xs ${darkMode ? darkColors.blue.text : lightColors.blue.text}`}
              >
                {scores.skill.percentage}%
              </div>
              <div
                className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
              >
                Skill
              </div>
            </div>
            <div
              className={`p-2 rounded-lg border ${
                darkMode
                  ? `${darkColors.green.bg} ${darkColors.green.border}`
                  : `${lightColors.green.bg} ${lightColors.green.border}`
              }`}
            >
              <div
                className={`text-lg font-bold ${
                  darkMode ? darkColors.green.text : lightColors.green.text
                }`}
              >
                {scores.will.score}/{scores.will.total}
              </div>
              <div
                className={`text-xs ${darkMode ? darkColors.green.text : lightColors.green.text}`}
              >
                {scores.will.percentage}%
              </div>
              <div
                className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
              >
                Will
              </div>
            </div>
            <div
              className={`p-2 rounded-lg border ${
                darkMode
                  ? `${darkColors.purple.bg} ${darkColors.purple.border}`
                  : `${lightColors.purple.bg} ${lightColors.purple.border}`
              }`}
            >
              <div
                className={`text-lg font-bold ${
                  darkMode ? darkColors.purple.text : lightColors.purple.text
                }`}
              >
                {scores.total.score}/{scores.total.total}
              </div>
              <div
                className={`text-xs ${darkMode ? darkColors.purple.text : lightColors.purple.text}`}
              >
                {scores.total.percentage}%
              </div>
              <div
                className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
              >
                Total
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <Input
              placeholder="Candidate Name"
              value={formData.candidateName}
              onChange={(e) => setFormData(prev => ({ ...prev, candidateName: e.target.value }))}
              className={`rounded-lg border w-full ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
              }`}
            />
            <Input
              placeholder="Role"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              className={`rounded-lg border ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
              }`}
            />
            <Input
              placeholder="Company Name"
              value={formData.companyName}
              onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
              className={`rounded-lg border ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
              }`}
            />
            <Input
              placeholder="Interviewer Name"
              value={formData.interviewerName}
              onChange={(e) => setFormData(prev => ({ ...prev, interviewerName: e.target.value }))}
              className={`rounded-lg border ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
              }`}
            />
            <Input
              type="date"
              placeholder="Interview Date"
              value={formData.interviewDate}
              onChange={(e) => setFormData(prev => ({ ...prev, interviewDate: e.target.value }))}
              className={`rounded-lg border ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
              }`}
            />
            <select
              value={decision}
              onChange={(e) => setDecision(e.target.value)}
              className={`rounded-lg border p-2 w-full min-w-[200px] ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-200 text-gray-900'
              }`}
            >
              {decisionOptions.map(({ value, emoji }) => (
                <option key={value} value={value}>
                  {emoji} {value}
                </option>
              ))}
            </select>
          </div>
        </Card>
      </div>

      <Section
        title="Character"
        bgColor="text-green-600"
        items={[
          'Personality',
          'Leadership',
          'Ownership',
          'Culture',
          'Coachability',
          'Adaptability',
        ]}
        darkMode={darkMode}
        expandedSections={expandedSections}
        ratings={ratings}
        onToggleSection={toggleSection}
        onRatingClick={handleRatingClick}
        getAttributeType={getAttributeType}
      />

      <Section
        title="Acumen"
        bgColor="text-blue-600"
        items={['Sales Acumen', 'Intelligence', 'Industry Knowledge', 'Exec Gravitas']}
        darkMode={darkMode}
        expandedSections={expandedSections}
        ratings={ratings}
        onToggleSection={toggleSection}
        onRatingClick={handleRatingClick}
        getAttributeType={getAttributeType}
      />

      <Section
        title="Grit"
        bgColor="text-purple-600"
        items={['Drive', 'Persistence', 'Process Driven', 'Give/Get Relationship']}
        darkMode={darkMode}
        expandedSections={expandedSections}
        ratings={ratings}
        onToggleSection={toggleSection}
        onRatingClick={handleRatingClick}
        getAttributeType={getAttributeType}
      />

      <Section
        title="Experience"
        bgColor="text-orange-600"
        items={[
          'Complex Selling',
          'Closing',
          'Pipe Building',
          'Champion Building',
          'Driving Urgency',
          'Multi-threading',
        ]}
        darkMode={darkMode}
        expandedSections={expandedSections}
        ratings={ratings}
        onToggleSection={toggleSection}
        onRatingClick={handleRatingClick}
        getAttributeType={getAttributeType}
      />
    </div>
  );
}