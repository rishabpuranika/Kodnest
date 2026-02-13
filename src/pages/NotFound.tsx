import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components';
import './PagePlaceholder.css';

export const NotFound: React.FC = () => {
  return (
    <div className="page-placeholder">
      <h1>Page Not Found</h1>
      <p className="page-placeholder-subtext">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div style={{ marginTop: 'var(--spacing-lg)' }}>
        <Link to="/dashboard">
          <Button variant="primary">Go to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};
