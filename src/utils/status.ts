export type JobStatus = 'Not Applied' | 'Applied' | 'Rejected' | 'Selected';

export interface StatusUpdate {
  jobId: string;
  status: JobStatus;
  updatedAt: string;
}

const STATUS_KEY = 'jobTrackerStatus';
const STATUS_UPDATES_KEY = 'jobTrackerStatusUpdates';

export const getJobStatus = (jobId: string): JobStatus => {
  if (typeof window === 'undefined') return 'Not Applied';
  const statuses = getAllStatuses();
  return statuses[jobId] || 'Not Applied';
};

export const setJobStatus = (jobId: string, status: JobStatus): void => {
  if (typeof window === 'undefined') return;
  const statuses = getAllStatuses();
  statuses[jobId] = status;
  localStorage.setItem(STATUS_KEY, JSON.stringify(statuses));

  // Record status update
  const updates = getStatusUpdates();
  updates.push({
    jobId,
    status,
    updatedAt: new Date().toISOString(),
  });
  // Keep only last 50 updates
  const recentUpdates = updates.slice(-50);
  localStorage.setItem(STATUS_UPDATES_KEY, JSON.stringify(recentUpdates));
};

export const getAllStatuses = (): Record<string, JobStatus> => {
  if (typeof window === 'undefined') return {};
  const saved = localStorage.getItem(STATUS_KEY);
  return saved ? JSON.parse(saved) : {};
};

export const getStatusUpdates = (): StatusUpdate[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem(STATUS_UPDATES_KEY);
  return saved ? JSON.parse(saved) : [];
};

export const getRecentStatusUpdates = (limit: number = 10): StatusUpdate[] => {
  const updates = getStatusUpdates();
  return updates.slice(-limit).reverse();
};
