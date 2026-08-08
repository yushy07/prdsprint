// @ts-nocheck
import {
  SiReact, SiNextdotjs, SiVuedotjs, SiSvelte, SiKotlin, SiJetpackcompose,
  SiFlutter, SiFirebase, SiSupabase, SiNodedotjs, SiPhp, SiMysql,
  SiPostgresql, SiCursor, SiWindsurf, SiClaudecode, SiClaude, SiAnthropic,
  SiGooglegemini, SiGithub
} from "react-icons/si";

export function BrandIcon({ name, className = "" }: { name: string, className?: string, key?: string | number }) {
  switch (name) {
    case "React": return <SiReact className={className} />;
    case "Next.js": return <SiNextdotjs className={className} />;
    case "Vue": return <SiVuedotjs className={className} />;
    case "Svelte": return <SiSvelte className={className} />;
    case "Kotlin": return <SiKotlin className={className} />;
    case "Compose": return <SiJetpackcompose className={className} />;
    case "Flutter": return <SiFlutter className={className} />;
    case "Firebase": return <SiFirebase className={className} />;
    case "Supabase": return <SiSupabase className={className} />;
    case "Node.js": return <SiNodedotjs className={className} />;
    case "PHP": return <SiPhp className={className} />;
    case "MySQL": return <SiMysql className={className} />;
    case "PostgreSQL": return <SiPostgresql className={className} />;
    case "Cursor": return <SiCursor className={className} />;
    case "Windsurf": return <SiWindsurf className={className} />;
    case "Claude Code": return <SiClaudecode className={className} />;
    case "Claude": return <SiClaude className={className} />;
    case "Gemini CLI": return <SiGooglegemini className={className} />;
    case "GitHub Copilot": return <SiGithub className={className} />;
    default: return null;
  }
}

export function BrandLogoChip({ name, label, colorClass = "text-white" }: { name: string, label?: string, colorClass?: string, key?: string | number }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#121216]/60 hover:bg-[#1A1A1F]/80 backdrop-blur-md border border-white/10 hover:border-white/20 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-all duration-300 group cursor-default">
      <BrandIcon name={name} className={`w-4 h-4 transition-transform group-hover:scale-110 ${colorClass}`} />
      <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">{label || name}</span>
    </div>
  );
}
