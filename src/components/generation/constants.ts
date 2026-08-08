import {
  FileSearch,
  LayoutGrid,
  FileEdit,
  ShieldCheck,
  Target,
  Users,
  Smartphone,
  Compass,
  Sparkles,
  Lightbulb,
  FileText,
  WifiOff,
  Zap,
  Flame,
  Cpu,
  Bell,
  BarChart3,
  Layers,
  CheckCircle2
} from "lucide-react";

export const STAGES = [
  {
    id: "understanding",
    title: "Understanding",
    subtitle: "your inputs",
    icon: FileSearch,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10 border-blue-500/20"
  },
  {
    id: "organizing",
    title: "Organizing",
    subtitle: "key sections",
    icon: LayoutGrid,
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10 border-indigo-500/20"
  },
  {
    id: "structuring",
    title: "Structuring",
    subtitle: "content flow",
    icon: FileEdit,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10 border-purple-500/20"
  },
  {
    id: "finalizing",
    title: "Finalizing",
    subtitle: "your PRD",
    icon: ShieldCheck,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10 border-emerald-500/20"
  }
];

export const STATUS_MESSAGES = [
  "Analyzing requirements...",
  "Understanding project inputs...",
  "Organizing key sections...",
  "Building feature architecture...",
  "Structuring user flows...",
  "Preparing technical specification...",
  "Optimizing document structure...",
  "Finalizing your PRD..."
];

export const AI_INSIGHTS = [
  {
    category: "PRD Clarity",
    icon: Target,
    text: "Great PRDs start with a clearly defined problem statement—not just a list of features."
  },
  {
    category: "Target Audience",
    icon: Users,
    text: "A well-defined target audience leads to better product decisions and feature prioritization."
  },
  {
    category: "Android UX",
    icon: Smartphone,
    text: "Native Android apps feel more intuitive when they follow Material Design principles."
  },
  {
    category: "User Flows",
    icon: Compass,
    text: "Clear user flows reduce development ambiguity and speed up team implementation."
  },
  {
    category: "Team Alignment",
    icon: ShieldCheck,
    text: "Acceptance criteria help developers, designers, and QA stay perfectly aligned."
  },
  {
    category: "Agile Planning",
    icon: LayoutGrid,
    text: "Breaking complex features into smaller user stories improves planning predictability."
  },
  {
    category: "Product Design",
    icon: Sparkles,
    text: "Simplicity is often a far stronger product advantage than feature quantity."
  },
  {
    category: "Security First",
    icon: ShieldCheck,
    text: "Privacy and security should be considered from the very beginning of product planning."
  },
  {
    category: "Problem Solving",
    icon: Lightbulb,
    text: "Every feature in your PRD should solve a validated, real-world user problem."
  },
  {
    category: "Product Vision",
    icon: FileText,
    text: "A great PRD explains both what should be built and why it matters to the end user."
  },
  {
    category: "Mobile Architecture",
    icon: WifiOff,
    text: "Offline capability considerations ensure a seamless mobile experience anywhere."
  },
  {
    category: "Accessibility",
    icon: Zap,
    text: "Designing with accessibility in mind broadens your app's reach and overall usability."
  },
  {
    category: "Iterative Dev",
    icon: Flame,
    text: "Focusing on core user flows first accelerates early user feedback and product iteration."
  },
  {
    category: "Technical Specs",
    icon: Cpu,
    text: "Clear data flow specifications prevent unexpected backend integration bottlenecks."
  },
  {
    category: "Engagement",
    icon: Bell,
    text: "Well-structured notification triggers keep users engaged without feeling intrusive."
  },
  {
    category: "Impact & Metrics",
    icon: BarChart3,
    text: "Defining measurable success metrics keeps product development focused on true impact."
  },
  {
    category: "Design System",
    icon: Layers,
    text: "Consistent UI components accelerate development and maintain design harmony."
  },
  {
    category: "MVP Strategy",
    icon: CheckCircle2,
    text: "Setting clear MVP boundaries prevents scope creep and ensures on-time product launches."
  }
];
