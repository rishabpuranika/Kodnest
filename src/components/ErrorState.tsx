import React from 'react';

interface ErrorStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  description,
  action,
}) => {
  return (
    <div className="error-state">
      <div className="error-state-title">{title}</div>
      <div className="error-state-description">{description}</div>
      {action && <div style={{ marginTop: 'var(--spacing-sm)' }}>{action}</div>}
    </div>
  );
};
