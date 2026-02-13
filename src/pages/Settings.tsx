import React from 'react';
import { Card, Input } from '../components';
import './Settings.css';

export const Settings: React.FC = () => {
  return (
    <div className="settings">
      <div className="settings-container">
        <h1 className="settings-title">Settings</h1>
        <p className="settings-subtitle">
          Configure your job tracking preferences
        </p>

        <div className="settings-form">
          <Card>
            <div className="settings-field">
              <label className="settings-label">Role Keywords</label>
              <Input
                type="text"
                placeholder="e.g., Software Engineer, Product Manager"
                disabled
              />
              <p className="settings-hint">
                Enter keywords for roles you're interested in
              </p>
            </div>
          </Card>

          <Card>
            <div className="settings-field">
              <label className="settings-label">Preferred Locations</label>
              <Input
                type="text"
                placeholder="e.g., San Francisco, Remote, New York"
                disabled
              />
              <p className="settings-hint">
                Specify locations where you'd like to work
              </p>
            </div>
          </Card>

          <Card>
            <div className="settings-field">
              <label className="settings-label">Mode</label>
              <div className="settings-radio-group">
                <label className="settings-radio">
                  <input type="radio" name="mode" value="remote" disabled />
                  <span>Remote</span>
                </label>
                <label className="settings-radio">
                  <input type="radio" name="mode" value="hybrid" disabled />
                  <span>Hybrid</span>
                </label>
                <label className="settings-radio">
                  <input type="radio" name="mode" value="onsite" disabled />
                  <span>Onsite</span>
                </label>
              </div>
              <p className="settings-hint">
                Select your preferred work mode
              </p>
            </div>
          </Card>

          <Card>
            <div className="settings-field">
              <label className="settings-label">Experience Level</label>
              <div className="settings-select-wrapper">
                <select className="input" disabled>
                  <option value="">Select experience level</option>
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior</option>
                  <option value="lead">Lead / Principal</option>
                </select>
              </div>
              <p className="settings-hint">
                Choose your experience level
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
