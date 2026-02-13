import React from 'react';
import { Job } from '../data/jobs';
import { Button } from './';
import './JobModal.css';

interface JobModalProps {
  job: Job | null;
  onClose: () => void;
  onSave: (jobId: string) => void;
  isSaved: boolean;
}

export const JobModal: React.FC<JobModalProps> = ({ job, onClose, onSave, isSaved }) => {
  if (!job) return null;

  const handleApply = () => {
    window.open(job.applyUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="job-modal-overlay" onClick={onClose}>
      <div className="job-modal" onClick={(e) => e.stopPropagation()}>
        <div className="job-modal-header">
          <div>
            <h2 className="job-modal-title">{job.title}</h2>
            <p className="job-modal-company">{job.company}</p>
          </div>
          <button className="job-modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="job-modal-body">
          <div className="job-modal-section">
            <h3 className="job-modal-section-title">Job Details</h3>
            <div className="job-modal-details">
              <div className="job-modal-detail-item">
                <span className="job-modal-detail-label">Location:</span>
                <span>{job.location}</span>
              </div>
              <div className="job-modal-detail-item">
                <span className="job-modal-detail-label">Mode:</span>
                <span>{job.mode}</span>
              </div>
              <div className="job-modal-detail-item">
                <span className="job-modal-detail-label">Experience:</span>
                <span>
                  {job.experience === 'Fresher' ? 'Fresher' : `${job.experience} years`}
                </span>
              </div>
              <div className="job-modal-detail-item">
                <span className="job-modal-detail-label">Salary Range:</span>
                <span>{job.salaryRange}</span>
              </div>
              <div className="job-modal-detail-item">
                <span className="job-modal-detail-label">Source:</span>
                <span>{job.source}</span>
              </div>
            </div>
          </div>

          <div className="job-modal-section">
            <h3 className="job-modal-section-title">Description</h3>
            <p className="job-modal-description">{job.description}</p>
          </div>

          <div className="job-modal-section">
            <h3 className="job-modal-section-title">Required Skills</h3>
            <div className="job-modal-skills">
              {job.skills.map((skill, index) => (
                <span key={index} className="job-modal-skill">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="job-modal-footer">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button
            variant={isSaved ? 'primary' : 'secondary'}
            onClick={() => onSave(job.id)}
          >
            {isSaved ? 'Saved' : 'Save Job'}
          </Button>
          <Button variant="primary" onClick={handleApply}>
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
};
