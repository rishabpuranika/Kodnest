import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components';
import './Landing.css';

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <div className="landing-content">
        <h1 className="landing-headline">Stop Missing The Right Jobs.</h1>
        <p className="landing-subtext">
          Precision-matched job discovery delivered daily at 9AM.
        </p>
        <div className="landing-cta">
          <Button variant="primary" size="default" onClick={() => navigate('/settings')}>
            Start Tracking
          </Button>
        </div>
      </div>
    </div>
  );
};
