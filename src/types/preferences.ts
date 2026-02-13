export interface Preferences {
  roleKeywords: string;
  preferredLocations: string[];
  preferredMode: ('Remote' | 'Hybrid' | 'Onsite')[];
  experienceLevel: string;
  skills: string;
  minMatchScore: number;
}

export const DEFAULT_PREFERENCES: Preferences = {
  roleKeywords: '',
  preferredLocations: [],
  preferredMode: [],
  experienceLevel: '',
  skills: '',
  minMatchScore: 40,
};
