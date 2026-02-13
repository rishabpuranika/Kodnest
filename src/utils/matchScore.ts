import { Job } from '../data/jobs';
import { Preferences } from '../types/preferences';

export const calculateMatchScore = (job: Job, preferences: Preferences): number => {
  let score = 0;

  // Extract role keywords (split by comma and trim)
  const roleKeywords = preferences.roleKeywords
    .split(',')
    .map((kw) => kw.trim().toLowerCase())
    .filter((kw) => kw.length > 0);

  // Extract user skills (split by comma and trim)
  const userSkills = preferences.skills
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s.length > 0);

  // +25 if any roleKeyword appears in job.title (case-insensitive)
  if (roleKeywords.length > 0) {
    const titleLower = job.title.toLowerCase();
    const hasKeywordInTitle = roleKeywords.some((keyword) =>
      titleLower.includes(keyword)
    );
    if (hasKeywordInTitle) {
      score += 25;
    }
  }

  // +15 if any roleKeyword appears in job.description
  if (roleKeywords.length > 0) {
    const descLower = job.description.toLowerCase();
    const hasKeywordInDesc = roleKeywords.some((keyword) =>
      descLower.includes(keyword)
    );
    if (hasKeywordInDesc) {
      score += 15;
    }
  }

  // +15 if job.location matches preferredLocations
  if (
    preferences.preferredLocations.length > 0 &&
    preferences.preferredLocations.includes(job.location)
  ) {
    score += 15;
  }

  // +10 if job.mode matches preferredMode
  if (
    preferences.preferredMode.length > 0 &&
    preferences.preferredMode.includes(job.mode)
  ) {
    score += 10;
  }

  // +10 if job.experience matches experienceLevel
  if (
    preferences.experienceLevel !== '' &&
    preferences.experienceLevel === job.experience
  ) {
    score += 10;
  }

  // +15 if overlap between job.skills and user.skills (any match)
  if (userSkills.length > 0 && job.skills.length > 0) {
    const jobSkillsLower = job.skills.map((s) => s.toLowerCase());
    const hasSkillMatch = userSkills.some((userSkill) =>
      jobSkillsLower.some((jobSkill) => 
        jobSkill.includes(userSkill) || userSkill.includes(jobSkill)
      )
    );
    if (hasSkillMatch) {
      score += 15;
    }
  }

  // +5 if postedDaysAgo <= 2
  if (job.postedDaysAgo <= 2) {
    score += 5;
  }

  // +5 if source is LinkedIn
  if (job.source === 'LinkedIn') {
    score += 5;
  }

  // Cap score at 100
  return Math.min(score, 100);
};

export const getMatchScoreColor = (score: number): 'success' | 'warning' | 'default' | 'muted' => {
  if (score >= 80) return 'success';
  if (score >= 60) return 'warning';
  if (score >= 40) return 'default';
  return 'muted';
};
