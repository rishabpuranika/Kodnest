import React, { useState, useEffect } from 'react';
import { Button, Card } from '../components';
import { TEST_ITEMS, getTestChecklist, setTestItemChecked, getTestsPassedCount, getAllTestsPassed, resetTestChecklist } from '../utils/testChecklist';
import './Test.css';

export const Test: React.FC = () => {
  const [checklist, setChecklist] = useState<Record<string, boolean>>(getTestChecklist());
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  useEffect(() => {
    setChecklist(getTestChecklist());
  }, []);

  const handleToggle = (id: string) => {
    const newChecked = !checklist[id];
    setTestItemChecked(id, newChecked);
    setChecklist({ ...checklist, [id]: newChecked });
  };

  const handleReset = () => {
    if (window.confirm('Reset all test checkboxes?')) {
      resetTestChecklist();
      setChecklist({});
    }
  };

  const testsPassed = getTestsPassedCount();
  const allPassed = getAllTestsPassed();
  const totalTests = TEST_ITEMS.length;

  return (
    <div className="test">
      <div className="test-container">
        <div className="test-header">
          <h1 className="test-title">Built-In Test Checklist</h1>
          <p className="test-subtitle">
            Verify all functionality before shipping
          </p>
        </div>

        <Card className="test-summary-card">
          <div className="test-summary">
            <div className="test-summary-stats">
              <span className="test-summary-label">Tests Passed:</span>
              <span className="test-summary-count">
                {testsPassed} / {totalTests}
              </span>
            </div>
            {!allPassed && (
              <div className="test-summary-warning">
                Resolve all issues before shipping.
              </div>
            )}
            {allPassed && (
              <div className="test-summary-success">
                All tests passed! Ready to ship.
              </div>
            )}
          </div>
        </Card>

        <div className="test-checklist">
          {TEST_ITEMS.map((item) => {
            const isChecked = checklist[item.id] || false;
            return (
              <Card key={item.id} className="test-item-card">
                <div className="test-item">
                  <label className="test-item-label">
                    <input
                      type="checkbox"
                      className="test-item-checkbox"
                      checked={isChecked}
                      onChange={() => handleToggle(item.id)}
                    />
                    <span className={`test-item-text ${isChecked ? 'checked' : ''}`}>
                      {item.label}
                    </span>
                  </label>
                  {item.tooltip && (
                    <div className="test-item-tooltip-container">
                      <button
                        className="test-item-tooltip-trigger"
                        onClick={() => setShowTooltip(showTooltip === item.id ? null : item.id)}
                        aria-label="Show test instructions"
                      >
                        ?
                      </button>
                      {showTooltip === item.id && (
                        <div className="test-item-tooltip">
                          {item.tooltip}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        <div className="test-actions">
          <Button variant="secondary" onClick={handleReset}>
            Reset Test Status
          </Button>
        </div>
      </div>
    </div>
  );
};
