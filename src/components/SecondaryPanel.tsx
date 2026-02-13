import React from 'react';
import './SecondaryPanel.css';

interface SecondaryPanelProps {
  stepExplanation: string;
  promptText: string;
  onCopy?: () => void;
  onBuildInLovable?: () => void;
  onItWorked?: () => void;
  onError?: () => void;
  onAddScreenshot?: () => void;
}

export const SecondaryPanel: React.FC<SecondaryPanelProps> = ({
  stepExplanation,
  promptText,
  onCopy,
  onBuildInLovable,
  onItWorked,
  onError,
  onAddScreenshot,
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
    onCopy?.();
  };

  return (
    <div className="secondary-panel">
      <div className="secondary-panel-section">
        <h4 className="secondary-panel-title">Step Explanation</h4>
        <p className="secondary-panel-text">{stepExplanation}</p>
      </div>

      <div className="secondary-panel-section">
        <h4 className="secondary-panel-title">Copyable Prompt</h4>
        <div className="copyable-box">{promptText}</div>
      </div>

      <div className="secondary-panel-actions">
        <button className="btn btn-secondary btn-sm" onClick={handleCopy}>
          Copy
        </button>
        <button className="btn btn-secondary btn-sm" onClick={onBuildInLovable}>
          Build in Lovable
        </button>
        <button className="btn btn-primary btn-sm" onClick={onItWorked}>
          It Worked
        </button>
        <button className="btn btn-secondary btn-sm" onClick={onError}>
          Error
        </button>
        <button className="btn btn-secondary btn-sm" onClick={onAddScreenshot}>
          Add Screenshot
        </button>
      </div>
    </div>
  );
};
