import React, { useState, useEffect } from 'react';
import { JobCard, JobModal, EmptyState } from '../components';
import { jobs, Job } from '../data/jobs';
import { getSavedJobs, saveJob, removeJob, isJobSaved } from '../utils/storage';
import './Saved.css';

export const Saved: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(getSavedJobs());

  useEffect(() => {
    setSavedJobIds(getSavedJobs());
  }, []);

  const savedJobs = jobs.filter((job) => savedJobIds.includes(job.id));

  const handleSave = (jobId: string) => {
    if (isJobSaved(jobId)) {
      removeJob(jobId);
      setSavedJobIds((prev) => prev.filter((id) => id !== jobId));
    } else {
      saveJob(jobId);
      setSavedJobIds((prev) => [...prev, jobId]);
    }
  };

  if (savedJobs.length === 0) {
    return (
      <div className="saved">
        <EmptyState
          title="No saved jobs"
          description="Jobs you save will appear here for easy access."
        />
      </div>
    );
  }

  return (
    <div className="saved">
      <div className="saved-container">
        <div className="saved-header">
          <h1 className="saved-title">Saved Jobs</h1>
          <p className="saved-subtitle">
            {savedJobs.length} {savedJobs.length === 1 ? 'job' : 'jobs'} saved
          </p>
        </div>

        <div className="saved-jobs">
          {savedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onView={setSelectedJob}
              onSave={handleSave}
              isSaved={isJobSaved(job.id)}
            />
          ))}
        </div>
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
