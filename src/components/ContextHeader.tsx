import React from 'react';
import './ContextHeader.css';

interface ContextHeaderProps {
  headline: string;
  subtext: string;
}

export const ContextHeader: React.FC<ContextHeaderProps> = ({
  headline,
  subtext,
}) => {
  return (
    <div className="context-header">
      <h1>{headline}</h1>
      <p>{subtext}</p>
    </div>
  );
};
