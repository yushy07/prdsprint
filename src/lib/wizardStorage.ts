import { WizardData } from "@/types/wizard";

const STORAGE_KEY = "prd_wizard_data";
const STORAGE_VERSION = 1;
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

export interface SavedWizardState {
  version: number;
  savedAt: number;
  wizardData: WizardData;
  selectedPlatform: string | null;
  step: number;
  pendingGeneration: boolean;
}

export function saveWizardState(state: Omit<SavedWizardState, "version" | "savedAt">): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, version: STORAGE_VERSION, savedAt: Date.now() } satisfies SavedWizardState));
}

export function loadWizardState(): SavedWizardState | null {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") as Partial<SavedWizardState> | null;
    if (!parsed || parsed.version !== STORAGE_VERSION || typeof parsed.savedAt !== "number" || Date.now() - parsed.savedAt > MAX_AGE_MS || !parsed.wizardData || typeof parsed.step !== "number") {
      clearWizardState();
      return null;
    }
    return parsed as SavedWizardState;
  } catch {
    clearWizardState();
    return null;
  }
}

export function clearWizardState(): void {
  localStorage.removeItem(STORAGE_KEY);
}
