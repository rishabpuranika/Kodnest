import React from 'react';
import { EmptyState } from '../components';
import './Saved.css';

export const Saved: React.FC = () => {
  return (
    <div className="saved">
      <EmptyState
        title="No saved jobs"
        description="Jobs you save will appear here for easy access."
      />
    </div>
  );
};
