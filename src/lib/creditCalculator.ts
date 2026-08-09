import { PRICING_RULES } from '@/lib/credits.config';

export interface GenerationConfig {
  platform: 'website' | 'android';
  complexity: 'simple' | 'medium' | 'advanced';
  features: string[]; // authentication, database, etc.
  style: string;
  techStack: string;
  projectPrompt?: string;
}

export function calculateGenerationCost(config: GenerationConfig) {
  let total = 0;
  
  // Base cost
  total += PRICING_RULES.base[config.platform] || 20;
  
  // Complexity
  total += PRICING_RULES.complexity[config.complexity] || 0;
  
  // Features
  config.features.forEach(feature => {
    total += (PRICING_RULES.features as any)[feature] || 0;
  });
  
  // Style
  total += (PRICING_RULES.styles as any)[config.style] || 0;
  
  // Tech Stack
  total += (PRICING_RULES.techStacks as any)[config.techStack] || 0;
  
  return total;
}

export const REFUND_RULES: Record<number, number> = {
  6: 0,
  5: 0,
  4: 0.20,
  3: 0.35,
  2: 0.50,
  1: 1.00,
  0: 1.00
};

export function calculateRefund(totalCost: number, sectionsCompleted: number): number {
  // Cap at 6 just in case
  const completed = Math.min(6, Math.max(0, sectionsCompleted));
  const refundPercentage = REFUND_RULES[completed] || 0;
  return Math.floor(totalCost * refundPercentage);
}
