import React, { useState, useMemo } from 'react';
import { JobCard, JobModal, EmptyState } from '../components';
import { jobs, Job } from '../data/jobs';
import { getSavedJobs, saveJob, removeJob, isJobSaved } from '../utils/storage';
import { getPreferences, hasPreferences } from '../utils/preferences';
import { calculateMatchScore } from '../utils/matchScore';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(getSavedJobs());
  const [showOnlyMatches, setShowOnlyMatches] = useState(false);
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    mode: '',
    experience: '',
    source: '',
    sort: 'latest',
  });

  const preferences = getPreferences();
  const userHasPreferences = hasPreferences();

  const locations = useMemo(() => {
    const unique = Array.from(new Set(jobs.map((job) => job.location)));
    return unique.sort();
  }, []);

  const handleSave = (jobId: string) => {
    if (isJobSaved(jobId)) {
      removeJob(jobId);
      setSavedJobIds((prev) => prev.filter((id) => id !== jobId));
    } else {
      saveJob(jobId);
      setSavedJobIds((prev) => [...prev, jobId]);
    }
  };

  // Calculate match scores for all jobs
  const jobsWithScores = useMemo(() => {
    return jobs.map((job) => ({
      job,
      matchScore: calculateMatchScore(job, preferences),
    }));
  }, [preferences]);

  const filteredJobs = useMemo(() => {
    let filtered = [...jobsWithScores];

    // Keyword search
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      filtered = filtered.filter(
        ({ job }) =>
          job.title.toLowerCase().includes(keyword) ||
          job.company.toLowerCase().includes(keyword)
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(({ job }) => job.location === filters.location);
    }

    // Mode filter
    if (filters.mode) {
      filtered = filtered.filter(({ job }) => job.mode === filters.mode);
    }

    // Experience filter
    if (filters.experience) {
      filtered = filtered.filter(
        ({ job }) => job.experience === filters.experience
      );
    }

    // Source filter
    if (filters.source) {
      filtered = filtered.filter(({ job }) => job.source === filters.source);
    }

    // Show only matches toggle
    if (showOnlyMatches && userHasPreferences) {
      filtered = filtered.filter(
        ({ matchScore }) => matchScore >= preferences.minMatchScore
      );
    }

    // Sort
    if (filters.sort === 'latest') {
      filtered.sort((a, b) => a.job.postedDaysAgo - b.job.postedDaysAgo);
    } else if (filters.sort === 'oldest') {
      filtered.sort((a, b) => b.job.postedDaysAgo - a.job.postedDaysAgo);
    } else if (filters.sort === 'matchScore') {
      filtered.sort((a, b) => b.matchScore - a.matchScore);
    } else if (filters.sort === 'salary') {
      filtered.sort((a, b) => {
        const extractSalary = (salaryRange: string): number => {
          // Extract first number from salary range (e.g., "3–5 LPA" -> 3, "₹15k–₹40k/month" -> 15)
          const match = salaryRange.match(/(\d+)/);
          return match ? parseInt(match[1], 10) : 0;
        };
        return extractSalary(b.job.salaryRange) - extractSalary(a.job.salaryRange);
      });
    }

    return filtered;
  }, [filters, showOnlyMatches, preferences, jobsWithScores, userHasPreferences]);

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Job Dashboard</h1>
          <p className="dashboard-subtitle">
            Browse and discover job opportunities
          </p>
        </div>

        {!userHasPreferences && (
          <div className="dashboard-banner">
            <p>
              Set your preferences to activate intelligent matching.{' '}
              <a href="/settings">Go to Settings</a>
            </p>
          </div>
        )}

        {userHasPreferences && (
          <div className="dashboard-toggle">
            <label className="dashboard-toggle-label">
              <input
                type="checkbox"
                checked={showOnlyMatches}
                onChange={(e) => setShowOnlyMatches(e.target.checked)}
              />
              <span>Show only jobs above my threshold ({preferences.minMatchScore}%)</span>
            </label>
          </div>
        )}

        <div className="dashboard-filters">
          <div className="filter-group">
            <input
              type="text"
              className="input filter-input"
              placeholder="Search by title or company..."
              value={filters.keyword}
              onChange={(e) =>
                setFilters({ ...filters, keyword: e.target.value })
              }
            />
          </div>

          <div className="filter-group">
            <select
              className="input filter-select"
              value={filters.location}
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <select
              className="input filter-select"
              value={filters.mode}
              onChange={(e) => setFilters({ ...filters, mode: e.target.value })}
            >
              <option value="">All Modes</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Onsite">Onsite</option>
            </select>
          </div>

          <div className="filter-group">
            <select
              className="input filter-select"
              value={filters.experience}
              onChange={(e) =>
                setFilters({ ...filters, experience: e.target.value })
              }
            >
              <option value="">All Experience</option>
              <option value="Fresher">Fresher</option>
              <option value="0-1">0-1 years</option>
              <option value="1-3">1-3 years</option>
              <option value="3-5">3-5 years</option>
            </select>
          </div>

          <div className="filter-group">
            <select
              className="input filter-select"
              value={filters.source}
              onChange={(e) =>
                setFilters({ ...filters, source: e.target.value })
              }
            >
              <option value="">All Sources</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Naukri">Naukri</option>
              <option value="Indeed">Indeed</option>
            </select>
          </div>

          <div className="filter-group">
            <select
              className="input filter-select"
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="matchScore">Match Score</option>
              <option value="salary">Salary</option>
            </select>
          </div>
        </div>

        {filteredJobs.length === 0 ? (
          <EmptyState
            title="No roles match your criteria"
            description="Adjust filters or lower threshold."
          />
        ) : (
          <div className="dashboard-jobs">
            {filteredJobs.map(({ job, matchScore }) => (
              <JobCard
                key={job.id}
                job={job}
                onView={setSelectedJob}
                onSave={handleSave}
                isSaved={isJobSaved(job.id)}
                matchScore={userHasPreferences ? matchScore : undefined}
              />
            ))}
          </div>
        )}
      </div>

      {selectedJob && (
        <JobModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onSave={handleSave}
          isSaved={isJobSaved(selectedJob.id)}
        />
      )}
    </div>
  );
};
