export interface TestItem {
  id: string;
  label: string;
  tooltip?: string;
  checked: boolean;
}

export const TEST_ITEMS: Omit<TestItem, 'checked'>[] = [
  {
    id: 'preferences-persist',
    label: 'Preferences persist after refresh',
    tooltip: 'Set preferences in Settings, refresh page, verify they remain.',
  },
  {
    id: 'match-score-calculates',
    label: 'Match score calculates correctly',
    tooltip: 'Check job cards show match scores based on your preferences.',
  },
  {
    id: 'show-matches-toggle',
    label: '"Show only matches" toggle works',
    tooltip: 'Toggle on Dashboard, verify only jobs above threshold show.',
  },
  {
    id: 'save-job-persists',
    label: 'Save job persists after refresh',
    tooltip: 'Save a job, refresh page, check it remains in Saved page.',
  },
  {
    id: 'apply-opens-new-tab',
    label: 'Apply opens in new tab',
    tooltip: 'Click Apply button, verify new tab opens with job URL.',
  },
  {
    id: 'status-update-persists',
    label: 'Status update persists after refresh',
    tooltip: 'Change job status, refresh page, verify status remains.',
  },
  {
    id: 'status-filter-works',
    label: 'Status filter works correctly',
    tooltip: 'Filter by status on Dashboard, verify correct jobs show.',
  },
  {
    id: 'digest-generates-top-10',
    label: 'Digest generates top 10 by score',
    tooltip: 'Generate digest, verify top 10 jobs sorted by match score.',
  },
  {
    id: 'digest-persists-day',
    label: 'Digest persists for the day',
    tooltip: 'Generate digest, refresh page, verify same digest loads.',
  },
  {
    id: 'no-console-errors',
    label: 'No console errors on main pages',
    tooltip: 'Navigate through Dashboard, Saved, Digest, Settings - check browser console.',
  },
];

const TEST_CHECKLIST_KEY = 'jobTrackerTestChecklist';

export const getTestChecklist = (): Record<string, boolean> => {
  if (typeof window === 'undefined') return {};
  const saved = localStorage.getItem(TEST_CHECKLIST_KEY);
  return saved ? JSON.parse(saved) : {};
};

export const setTestItemChecked = (id: string, checked: boolean): void => {
  if (typeof window === 'undefined') return;
  const checklist = getTestChecklist();
  checklist[id] = checked;
  localStorage.setItem(TEST_CHECKLIST_KEY, JSON.stringify(checklist));
};

export const isTestItemChecked = (id: string): boolean => {
  const checklist = getTestChecklist();
  return checklist[id] === true;
};

export const getAllTestsPassed = (): boolean => {
  const checklist = getTestChecklist();
  return TEST_ITEMS.every((item) => checklist[item.id] === true);
};

export const getTestsPassedCount = (): number => {
  const checklist = getTestChecklist();
  return TEST_ITEMS.filter((item) => checklist[item.id] === true).length;
};

export const resetTestChecklist = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TEST_CHECKLIST_KEY);
};
