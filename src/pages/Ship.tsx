import React from 'react';
import { Button, Card } from '../components';
import { getAllTestsPassed, getTestsPassedCount } from '../utils/testChecklist';
import { Link } from 'react-router-dom';
import './Ship.css';

export const Ship: React.FC = () => {
  const allTestsPassed = getAllTestsPassed();
  const testsPassed = getTestsPassedCount();
  const totalTests = 10;

  if (!allTestsPassed) {
    return (
      <div className="ship">
        <div className="ship-container">
          <div className="ship-locked">
            <Card className="ship-locked-card">
              <div className="ship-locked-content">
                <h1 className="ship-locked-title">Ship Locked</h1>
                <p className="ship-locked-description">
                  Complete all tests in the checklist before shipping.
                </p>
                <div className="ship-locked-stats">
                  <span className="ship-locked-count">
                    {testsPassed} / {totalTests} tests passed
                  </span>
                </div>
                <div className="ship-locked-actions">
                  <Link to="/jt/07-test">
                    <Button variant="primary">
                      Go to Test Checklist
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ship">
      <div className="ship-container">
        <div className="ship-header">
          <h1 className="ship-title">Ready to Ship</h1>
          <p className="ship-subtitle">
            All tests passed. Your application is ready for deployment.
          </p>
        </div>

        <Card className="ship-success-card">
          <div className="ship-success-content">
            <div className="ship-success-icon">✓</div>
            <h2 className="ship-success-title">All Tests Passed</h2>
            <p className="ship-success-description">
              {testsPassed} / {totalTests} tests completed successfully.
            </p>
          </div>
        </Card>

        <div className="ship-checklist">
          <h3 className="ship-checklist-title">Pre-Ship Checklist</h3>
          <ul className="ship-checklist-items">
            <li>✓ All functionality tests passed</li>
            <li>✓ No console errors</li>
            <li>✓ Preferences persist correctly</li>
            <li>✓ Status tracking works</li>
            <li>✓ Digest generation functional</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
