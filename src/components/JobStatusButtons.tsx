import React from 'react';
import { JobStatus } from '../utils/status';
import './JobStatusButtons.css';

interface JobStatusButtonsProps {
  status: JobStatus;
  onChange: (status: JobStatus) => void;
}

export const JobStatusButtons: React.FC<JobStatusButtonsProps> = ({ status, onChange }) => {
  const statuses: JobStatus[] = ['Not Applied', 'Applied', 'Rejected', 'Selected'];

  return (
    <div className="job-status-buttons">
      {statuses.map((s) => (
        <button
          key={s}
          className={`job-status-button ${status === s ? 'active' : ''} ${s.toLowerCase().replace(' ', '-')}`}
          onClick={() => onChange(s)}
        >
          {s}
        </button>
      ))}
    </div>
  );
};
