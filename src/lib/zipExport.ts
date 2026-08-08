import { WizardData } from "@/pages/Builder";

export interface GeneratedSections {
  overview?: string;
  features?: string;
  tech?: string;
  ui?: string;
  theme?: string;
  architecture?: string;
  styleGuide?: string;
  design?: string;
  roadmap?: string;
  [key: string]: string | undefined;
}

export function generateThemeConfiguration(wizardData?: WizardData): string {
  if (!wizardData) return "# Theme Configuration\n";
  let md = `# Theme Configuration\n\n`;
  md += `## Theme Mode\n\n`;
  if (wizardData.theme === 'light') md += `Light\n\n`;
  else if (wizardData.theme === 'dark') md += `Dark\n\n`;
  else if (wizardData.theme === 'system') md += `System\n\n`;
  else md += `${wizardData.theme || 'Not selected'}\n\n`;

  md += `## Font\n\n`;
  md += `${wizardData.font || 'Not selected'}\n\n`;

  md += `## Color Configuration\n\n`;
  const palette = wizardData.colorPalette as any;
  if (!palette) {
    md += `Type:\nNone\n\n`;
    return md;
  }
  if (palette.type === 'palette') {
    md += `Type:\nPalette\n\n`;
    const names = ['Primary', 'Secondary', 'Accent', 'Success', 'Warning', 'Error'];
    const colors = palette.colors || [];
    names.forEach((name, i) => {
      if (colors[i]) {
        md += `${name}\n\n${colors[i]}\n\n`;
      }
    });
  } else if (palette.type === 'gradient') {
    md += `Type:\nGradient\n\n`;
    if (palette.from && palette.to) {
      md += `Start\n\n${palette.from}\n\n`;
      md += `End\n\n${palette.to}\n\n`;
    } else if (palette.colors) {
       palette.colors.forEach((c: string, i: number) => {
         md += `Stop ${i+1}\n\n${c}\n\n`;
       });
    }
  } else if (palette.type === 'custom') {
    md += `Type:\nCustom\n\n`;
    if (palette.customRoles) {
      Object.entries(palette.customRoles).forEach(([role, color]) => {
        const capitalized = role.charAt(0).toUpperCase() + role.slice(1);
        md += `${capitalized}\n\n${color}\n\n`;
      });
    }
  } else {
    md += `Type:\nUnknown\n\n`;
  }
  return md.trim() + "\n";
}

export const createPrdZip = async (sections: GeneratedSections | string | null, wizardData?: WizardData) => {
  if (sections && typeof sections === 'object') {
    console.log("ZIP RECEIVED", Object.keys(sections));
    console.log(Object.keys(sections));
    console.log("UI exists:", !!sections.ui);
    console.log("UI length:", sections.ui?.length);
    console.log({
      overview: !!sections.overview,
      features: !!sections.features,
      tech: !!sections.tech,
      ui: !!sections.ui,
      roadmap: !!sections.roadmap,
      theme: !!sections.theme
    });
  }

  const JSZip = (await import('jszip')).default;
  const zip = new JSZip();

  const themeConfig = generateThemeConfiguration(wizardData);

  if (sections && typeof sections === 'object') {
    let overview = sections['overview'] ?? '';
    let features = sections['features'] ?? '';
    let techArch = sections['tech'] ?? sections['architecture'] ?? '';
    let uiGuide = sections['ui'] ?? sections['design'] ?? '';
    let roadmap = sections['roadmap'] ?? '';
    let themeDoc = sections['theme'] ?? sections['styleGuide'] ?? sections['style-guide'] ?? themeConfig;

    if (overview) zip.file("overview.md", overview);
    if (features) zip.file("features-functionality.md", features);
    if (techArch) zip.file("tech-architecture.md", techArch);
    if (themeDoc) zip.file("theme-configuration.md", themeDoc);
    if (uiGuide) zip.file("ui-ux-guidelines.md", uiGuide);
    if (roadmap) zip.file("development-roadmap.md", roadmap);
  } else if (typeof sections === 'string') {
    zip.file("overview.md", sections);
  }

  return await zip.generateAsync({ type: "blob" });
};
