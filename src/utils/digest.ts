import { Job } from '../data/jobs';
import { Preferences } from '../types/preferences';
import { calculateMatchScore } from './matchScore';

export interface DigestJob {
  job: Job;
  matchScore: number;
}

export interface Digest {
  date: string;
  jobs: DigestJob[];
  generatedAt: string;
}

const getTodayDateString = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getDigestKey = (date?: string): string => {
  const dateStr = date || getTodayDateString();
  return `jobTrackerDigest_${dateStr}`;
};

export const generateDigest = (
  jobs: Job[],
  preferences: Preferences
): Digest => {
  // Calculate match scores for all jobs
  const jobsWithScores = jobs.map((job) => ({
    job,
    matchScore: calculateMatchScore(job, preferences),
  }));

  // Filter jobs that meet minimum match score
  const matchingJobs = jobsWithScores.filter(
    ({ matchScore }) => matchScore >= preferences.minMatchScore
  );

  // Sort: 1) matchScore descending, 2) postedDaysAgo ascending
  const sortedJobs = matchingJobs.sort((a, b) => {
    if (b.matchScore !== a.matchScore) {
      return b.matchScore - a.matchScore;
    }
    return a.job.postedDaysAgo - b.job.postedDaysAgo;
  });

  // Take top 10
  const topJobs = sortedJobs.slice(0, 10);

  return {
    date: getTodayDateString(),
    jobs: topJobs,
    generatedAt: new Date().toISOString(),
  };
};

export const saveDigest = (digest: Digest): void => {
  const key = getDigestKey(digest.date);
  localStorage.setItem(key, JSON.stringify(digest));
};

export const getTodayDigest = (): Digest | null => {
  const key = getDigestKey();
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : null;
};

export const formatDigestForText = (digest: Digest): string => {
  // Parse YYYY-MM-DD format
  const [year, month, day] = digest.date.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let text = `Top 10 Jobs For You — 9AM Digest\n`;
  text += `${formattedDate}\n\n`;

  digest.jobs.forEach(({ job, matchScore }, index) => {
    text += `${index + 1}. ${job.title}\n`;
    text += `   Company: ${job.company}\n`;
    text += `   Location: ${job.location}\n`;
    text += `   Experience: ${job.experience === 'Fresher' ? 'Fresher' : `${job.experience} years`}\n`;
    text += `   Match Score: ${matchScore}%\n`;
    text += `   Apply: ${job.applyUrl}\n\n`;
  });

  text += `This digest was generated based on your preferences.\n`;
  text += `Demo Mode: Daily 9AM trigger simulated manually.`;

  return text;
};
