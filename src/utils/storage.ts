const SAVED_JOBS_KEY = 'savedJobs';

export const getSavedJobs = (): string[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem(SAVED_JOBS_KEY);
  return saved ? JSON.parse(saved) : [];
};

export const saveJob = (jobId: string): void => {
  const saved = getSavedJobs();
  if (!saved.includes(jobId)) {
    saved.push(jobId);
    localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(saved));
  }
};

export const removeJob = (jobId: string): void => {
  const saved = getSavedJobs();
  const filtered = saved.filter((id) => id !== jobId);
  localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(filtered));
};

export const isJobSaved = (jobId: string): boolean => {
  return getSavedJobs().includes(jobId);
};
