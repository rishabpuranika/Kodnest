import React from 'react';
import { Job } from '../data/jobs';
import { Badge, Button, MatchScoreBadge } from './';
import './JobCard.css';

interface JobCardProps {
  job: Job;
  onView: (job: Job) => void;
  onSave: (jobId: string) => void;
  isSaved: boolean;
  matchScore?: number;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onView, onSave, isSaved, matchScore }) => {
  const handleApply = () => {
    window.open(job.applyUrl, '_blank', 'noopener,noreferrer');
  };

  const getPostedText = (days: number) => {
    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="job-card-title-section">
          <h3 className="job-card-title">{job.title}</h3>
          <p className="job-card-company">{job.company}</p>
        </div>
        <div className="job-card-badges">
          {matchScore !== undefined && <MatchScoreBadge score={matchScore} />}
          <Badge variant={job.source === 'LinkedIn' ? 'accent' : job.source === 'Naukri' ? 'success' : 'warning'}>
            {job.source}
          </Badge>
        </div>
      </div>

      <div className="job-card-details">
        <div className="job-card-detail-item">
          <span className="job-card-label">Location:</span>
          <span className="job-card-value">{job.location}</span>
        </div>
        <div className="job-card-detail-item">
          <span className="job-card-label">Mode:</span>
          <span className="job-card-value">{job.mode}</span>
        </div>
        <div className="job-card-detail-item">
          <span className="job-card-label">Experience:</span>
          <span className="job-card-value">
            {job.experience === 'Fresher' ? 'Fresher' : `${job.experience} years`}
          </span>
        </div>
        <div className="job-card-detail-item">
          <span className="job-card-label">Salary:</span>
          <span className="job-card-value">{job.salaryRange}</span>
        </div>
      </div>

      <div className="job-card-footer">
        <div className="job-card-posted">
          {getPostedText(job.postedDaysAgo)}
        </div>
        <div className="job-card-actions">
          <Button variant="secondary" size="sm" onClick={() => onView(job)}>
            View
          </Button>
          <Button
            variant={isSaved ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => onSave(job.id)}
          >
            {isSaved ? 'Saved' : 'Save'}
          </Button>
          <Button variant="primary" size="sm" onClick={handleApply}>
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};
