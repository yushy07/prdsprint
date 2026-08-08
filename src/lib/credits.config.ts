export type PlanType = 'free' | 'starter' | 'pro' | 'ultimate';

export const PLAN_LIMITS: Record<PlanType, { name: string; credits: number; androidUnlocked: boolean }> = {
  free: { name: 'Free', credits: 50, androidUnlocked: false },
  starter: { name: 'Starter', credits: 200, androidUnlocked: true },
  pro: { name: 'Pro', credits: 500, androidUnlocked: true },
  ultimate: { name: 'Ultimate', credits: 900, androidUnlocked: true },
};

export const PRICING_RULES = {
  base: {
    website: 20,
    android: 30,
  },
  complexity: {
    simple: 0,
    medium: 5,
    advanced: 15,
  },
  features: {
    authentication: 5,
    database: 5,
    realtime: 5,
    api: 5,
    analytics: 5,
    ai: 10,
    payments: 8,
    storage: 5,
    notifications: 4,
    offline: 8,
  },
  styles: {
    essence: 0,
    aurora: 10,
    crystal: 8,
    velvet: 5,
    executive: 2,
    spark: 12,
    nova: 10,
    vintage: 4,
    forge: 6,
    flow: 8,
    mosaic: 6,
    prestige: 15,
    pure: 0,
    pulse: 4,
    prism: 8,
    command: 3,
    minimalist: 0,
    playful: 2,
    corporate: 2,
    glassmorphism: 5,
    brutalism: 3,
    neuomorphic: 4,
    'neon-cyberpunk': 6,
    'dark-elegance': 4,
    'retro-vintage': 3,
    'material-design': 2,
    quantum: 8,
  },
  techStacks: {
    'react-tailwind': 0,
    'nextjs-tailwind': 4,
    'vue-tailwind': 2,
    'angular-material': 3,
    'svelte-tailwind': 2,
    'jetpack-compose': 5,
    'xml-views': 2,
    flutter: 4,
    'react-native': 4,
  }
};

export const PREMIUM_WEBSITE_STYLES = [
  'spark',
  'nova',
  'mosaic',
  'vintage',
  'forge',
  'flow'
];

export function canUseWebsiteStyle(plan: PlanType, styleId: string): boolean {
  if (plan === 'free') {
    return !PREMIUM_WEBSITE_STYLES.includes(styleId);
  }
  return true; // Starter, Pro, Ultimate can access all
}
