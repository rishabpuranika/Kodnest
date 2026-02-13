import React from 'react';
import { EmptyState } from '../components';
import './Digest.css';

export const Digest: React.FC = () => {
  return (
    <div className="digest">
      <EmptyState
        title="No digest available"
        description="Your daily job digest will appear here once you've configured your preferences."
      />
    </div>
  );
};
