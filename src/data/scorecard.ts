export const lightColors = {
  blue: {
    bg: "bg-sky-50",
    text: "text-sky-600",
    border: "border-sky-100",
  },
  green: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-100",
  },
  purple: {
    bg: "bg-violet-50",
    text: "text-violet-600",
    border: "border-violet-100",
  },
  orange: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    border: "border-orange-100",
  },
};

export const darkColors = {
  blue: {
    bg: "bg-sky-900/30",
    text: "text-sky-300",
    border: "border-sky-800",
  },
  green: {
    bg: "bg-emerald-900/30",
    text: "text-emerald-300",
    border: "border-emerald-800",
  },
  purple: {
    bg: "bg-violet-900/30",
    text: "text-violet-300",
    border: "border-violet-800",
  },
  orange: {
    bg: "bg-orange-900/30",
    text: "text-orange-300",
    border: "border-orange-800",
  },
};

export const attributeTypes = {
  "Character-Personality": "Will",
  "Character-Leadership": "Will",
  "Character-Ownership": "Will",
  "Character-Culture": "Will",
  "Character-Coachability": "Will",
  "Character-Adaptability": "Will",
  "Acumen-Sales Acumen": "Skill",
  "Acumen-Intelligence": "Skill",
  "Acumen-Industry Knowledge": "Skill",
  "Acumen-Exec Gravitas": "Skill",
  "Grit-Drive": "Will",
  "Grit-Persistence": "Will",
  "Grit-Process Driven": "Skill",
  "Grit-Give/Get Relationship": "Will",
  "Experience-Complex Selling": "Skill",
  "Experience-Closing": "Skill",
  "Experience-Pipe Building": "Skill",
  "Experience-Champion Building": "Skill",
  "Experience-Driving Urgency": "Skill",
  "Experience-Multi-threading": "Skill",
} as const;

export const questions = {
  Character: {
    Personality: [
      "How do you handle conflict with colleagues?",
      "Tell me about a time you had to work with a difficult teammate",
      "What motivates you at work?",
    ],
    Leadership: [
      "Describe a time you led a challenging project",
      "How do you motivate team members?",
      "Tell me about a time you had to make an unpopular decision",
    ],
    Ownership: [
      "Tell me about a time you went above and beyond",
      "How do you handle mistakes?",
      "Describe a project you took initiative on",
    ],
    Culture: [
      "What type of work environment do you thrive in?",
      "How do you contribute to team culture?",
      "What values are important to you at work?",
    ],
    Coachability: [
      "Tell me about a time you received difficult feedback",
      "How do you approach learning new skills?",
      "Describe how you've grown professionally in the past year",
    ],
    Adaptability: [
      "How do you handle change?",
      "Tell me about a time you had to be flexible",
      "Describe adjusting to a major change at work",
    ],
  },
  Acumen: {
    "Sales Acumen": [
      "How do you qualify opportunities?",
      "Walk me through your sales process",
      "How do you handle objections?",
    ],
    Intelligence: [
      "How do you analyze complex problems?",
      "Tell me about a creative solution you developed",
      "How do you make decisions with limited information?",
    ],
    "Industry Knowledge": [
      "What industry trends are you following?",
      "How do you stay current in your field?",
      "What's your perspective on [industry topic]?",
    ],
    "Exec Gravitas": [
      "How do you build credibility with executives?",
      "Tell me about presenting to senior leadership",
      "How do you handle pushback from executives?",
    ],
  },
  Grit: {
    Drive: [
      "What motivates you to succeed?",
      "Tell me about achieving a challenging goal",
      "How do you push through setbacks?",
    ],
    Persistence: [
      "Describe overcoming a major obstacle",
      "How do you handle rejection?",
      "Tell me about your biggest professional challenge",
    ],
    "Process Driven": [
      "How do you organize your work?",
      "What systems have you implemented?",
      "How do you ensure consistent execution?",
    ],
    "Give/Get Relationship": [
      "How do you build long-term relationships?",
      "Tell me about maintaining customer trust",
      "How do you ensure mutual value?",
    ],
  },
  Experience: {
    "Complex Selling": [
      "Describe your most complex deal",
      "How do you manage multiple stakeholders?",
      "Tell me about navigating a complex sales cycle",
    ],
    Closing: [
      "What's your approach to closing?",
      "Tell me about a creative closing strategy",
      "How do you maintain urgency?",
    ],
    "Pipe Building": [
      "How do you build pipeline?",
      "What's your prospecting strategy?",
      "How do you ensure consistent pipeline?",
    ],
    "Champion Building": [
      "How do you identify and develop champions?",
      "Tell me about losing a champion",
      "How do you maintain champion relationships?",
    ],
    "Driving Urgency": [
      "How do you create urgency?",
      "Tell me about accelerating a deal",
      "How do you prevent deals from stalling?",
    ],
    "Multi-threading": [
      "How do you build multiple relationships?",
      "Tell me about recovering from losing a contact",
      "How do you map complex organizations?",
    ],
  },
};