import React from 'react';
import './TopBar.css';

interface TopBarProps {
  projectName: string;
  currentStep: number;
  totalSteps: number;
  status: 'Not Started' | 'In Progress' | 'Shipped';
}

export const TopBar: React.FC<TopBarProps> = ({
  projectName,
  currentStep,
  totalSteps,
  status,
}) => {
  const getStatusClass = () => {
    switch (status) {
      case 'Shipped':
        return 'badge-success';
      case 'In Progress':
        return 'badge-accent';
      default:
        return '';
    }
  };

  return (
    <div className="top-bar">
      <div className="top-bar-left">{projectName}</div>
      <div className="top-bar-center">
        Step {currentStep} / {totalSteps}
      </div>
      <div className="top-bar-right">
        <span className={`badge ${getStatusClass()}`}>{status}</span>
      </div>
    </div>
  );
};
