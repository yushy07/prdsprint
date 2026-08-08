import { Gift, Rocket, Crown, Gem, LucideIcon } from "lucide-react";

export interface Plan {
  id: string;
  name: string;
  description: string;
  priceNumeric: number;
  price: string;
  period: string;
  creditsNumeric: number;
  credits: string;
  popular: boolean;
  color: string;
  glowColor: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  features: string[];
  benefits: string[];
}

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "Try it out, no card needed",
    priceNumeric: 0,
    price: "₹0",
    period: "/month",
    creditsNumeric: 50,
    credits: "50 credits",
    popular: false,
    color: "blue",
    glowColor: "rgba(59, 130, 246, 0.15)",
    icon: Gift,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10",
    features: ["Web platform only", "All tech stacks", "All themes & fonts", "Markdown + PDF export", "PRD history"],
    benefits: [
      "50 AI Credits monthly",
      "Web Platform PRD Builder",
      "All Tech Stacks & Framer UI",
      "Markdown & PDF Document Exports",
      "PRD Revision History Log"
    ]
  },
  {
    id: "starter",
    name: "Starter",
    description: "For getting started seriously",
    priceNumeric: 49,
    price: "₹49",
    period: "/month",
    creditsNumeric: 200,
    credits: "200 credits",
    popular: false,
    color: "cyan",
    glowColor: "rgba(6, 182, 212, 0.15)",
    icon: Rocket,
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/10",
    features: ["Everything in Free", "Android PRDs included", "More credits", "Full ZIP package"],
    benefits: [
      "200 AI Credits monthly",
      "Faster Generation Engine",
      "Full ZIP Package Download",
      "Android PRD and Web Platform",
      "Premium Design Systems & Themes",
      "Priority Email Support"
    ]
  },
  {
    id: "pro",
    name: "Pro",
    description: "Premium features + more room",
    priceNumeric: 99,
    price: "₹99",
    period: "/month",
    creditsNumeric: 500,
    credits: "500 credits",
    popular: true,
    color: "purple",
    glowColor: "rgba(168, 85, 247, 0.25)",
    icon: Crown,
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/10",
    features: ["Everything in Starter", "Android PRDs included", "Priority generation queue", "Larger credit pool"],
    benefits: [
      "500 AI Credits monthly",
      "Android PRD & Jetpack Compose Builder",
      "Website & Web App Builder",
      "Priority Generation Queue",
      "Full ZIP Package & Source Assets",
      "Commercial Usage Rights",
      "Dedicated High-Speed AI Pipeline"
    ]
  },
  {
    id: "ultimate",
    name: "Ultimate",
    description: "Maximum credits, priority generation",
    priceNumeric: 149,
    price: "₹149",
    period: "/month",
    creditsNumeric: 900,
    credits: "900 credits",
    popular: false,
    color: "amber",
    glowColor: "rgba(245, 158, 11, 0.15)",
    icon: Gem,
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10",
    features: ["Everything in Pro", "Highest monthly credits", "Priority queue", "Android included"],
    benefits: [
      "900 AI Credits monthly",
      "Android & Web Multi-Platform Specs",
      "Top Priority Instant Queue",
      "Full ZIP Package & Code Bundles",
      "Commercial License & Team Rights",
      "Direct API Integration Access",
      "VIP Priority 24/7 Support"
    ]
  }
];
