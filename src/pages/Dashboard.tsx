import React from 'react';
import { EmptyState } from '../components';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <EmptyState
        title="No jobs yet"
        description="In the next step, you will load a realistic dataset."
      />
    </div>
  );
};
