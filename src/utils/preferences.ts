import { Preferences, DEFAULT_PREFERENCES } from '../types/preferences';

const PREFERENCES_KEY = 'jobTrackerPreferences';

export const getPreferences = (): Preferences => {
  if (typeof window === 'undefined') return DEFAULT_PREFERENCES;
  const saved = localStorage.getItem(PREFERENCES_KEY);
  return saved ? JSON.parse(saved) : DEFAULT_PREFERENCES;
};

export const savePreferences = (preferences: Preferences): void => {
  localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
};

export const hasPreferences = (): boolean => {
  const prefs = getPreferences();
  return (
    prefs.roleKeywords.trim() !== '' ||
    prefs.preferredLocations.length > 0 ||
    prefs.preferredMode.length > 0 ||
    prefs.experienceLevel !== '' ||
    prefs.skills.trim() !== ''
  );
};
