export interface ColorPalette {
  id: string;
  name: string;
  type: "palette" | "gradient" | "custom";
  colors: string[];
  icon?: unknown;
  from?: string;
  to?: string;
  previewColors?: string[];
  customRoles?: Record<string, string>;
}

export interface WizardData {
  platform: string | null;
  frontend: string;
  backend: string;
  database: string;
  colorPalette: ColorPalette | null | string;
  font: string;
  theme: string;
  designStyle: string;
  description: string;
}
