import React, { useState, useEffect } from 'react';
import { Card, Input, Button } from '../components';
import { Preferences, DEFAULT_PREFERENCES } from '../types/preferences';
import { getPreferences, savePreferences } from '../utils/preferences';
import { jobs } from '../data/jobs';
import './Settings.css';

export const Settings: React.FC = () => {
  const [preferences, setPreferences] = useState<Preferences>(DEFAULT_PREFERENCES);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedPrefs = getPreferences();
    setPreferences(savedPrefs);
  }, []);

  const locations = Array.from(new Set(jobs.map((job) => job.location))).sort();

  const handleRoleKeywordsChange = (value: string) => {
    setPreferences({ ...preferences, roleKeywords: value });
    setSaved(false);
  };

  const handleLocationChange = (location: string) => {
    const current = preferences.preferredLocations;
    const updated = current.includes(location)
      ? current.filter((l) => l !== location)
      : [...current, location];
    setPreferences({ ...preferences, preferredLocations: updated });
    setSaved(false);
  };

  const handleModeChange = (mode: 'Remote' | 'Hybrid' | 'Onsite') => {
    const current = preferences.preferredMode;
    const updated = current.includes(mode)
      ? current.filter((m) => m !== mode)
      : [...current, mode];
    setPreferences({ ...preferences, preferredMode: updated });
    setSaved(false);
  };

  const handleExperienceChange = (value: string) => {
    setPreferences({ ...preferences, experienceLevel: value });
    setSaved(false);
  };

  const handleSkillsChange = (value: string) => {
    setPreferences({ ...preferences, skills: value });
    setSaved(false);
  };

  const handleMinMatchScoreChange = (value: number) => {
    setPreferences({ ...preferences, minMatchScore: value });
    setSaved(false);
  };

  const handleSave = () => {
    savePreferences(preferences);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

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
                placeholder="e.g., Software Engineer, Product Manager, Developer"
                value={preferences.roleKeywords}
                onChange={(e) => handleRoleKeywordsChange(e.target.value)}
              />
              <p className="settings-hint">
                Enter keywords for roles you're interested in (comma-separated)
              </p>
            </div>
          </Card>

          <Card>
            <div className="settings-field">
              <label className="settings-label">Preferred Locations</label>
              <div className="settings-multiselect">
                {locations.map((location) => (
                  <label key={location} className="settings-checkbox-label">
                    <input
                      type="checkbox"
                      checked={preferences.preferredLocations.includes(location)}
                      onChange={() => handleLocationChange(location)}
                    />
                    <span>{location}</span>
                  </label>
                ))}
              </div>
              <p className="settings-hint">
                Select locations where you'd like to work
              </p>
            </div>
          </Card>

          <Card>
            <div className="settings-field">
              <label className="settings-label">Preferred Mode</label>
              <div className="settings-checkbox-group">
                <label className="settings-checkbox-label">
                  <input
                    type="checkbox"
                    checked={preferences.preferredMode.includes('Remote')}
                    onChange={() => handleModeChange('Remote')}
                  />
                  <span>Remote</span>
                </label>
                <label className="settings-checkbox-label">
                  <input
                    type="checkbox"
                    checked={preferences.preferredMode.includes('Hybrid')}
                    onChange={() => handleModeChange('Hybrid')}
                  />
                  <span>Hybrid</span>
                </label>
                <label className="settings-checkbox-label">
                  <input
                    type="checkbox"
                    checked={preferences.preferredMode.includes('Onsite')}
                    onChange={() => handleModeChange('Onsite')}
                  />
                  <span>Onsite</span>
                </label>
              </div>
              <p className="settings-hint">
                Select your preferred work modes
              </p>
            </div>
          </Card>

          <Card>
            <div className="settings-field">
              <label className="settings-label">Experience Level</label>
              <div className="settings-select-wrapper">
                <select
                  className="input"
                  value={preferences.experienceLevel}
                  onChange={(e) => handleExperienceChange(e.target.value)}
                >
                  <option value="">Select experience level</option>
                  <option value="Fresher">Fresher</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                </select>
              </div>
              <p className="settings-hint">
                Choose your experience level
              </p>
            </div>
          </Card>

          <Card>
            <div className="settings-field">
              <label className="settings-label">Skills</label>
              <Input
                type="text"
                placeholder="e.g., React, Python, Java, Node.js"
                value={preferences.skills}
                onChange={(e) => handleSkillsChange(e.target.value)}
              />
              <p className="settings-hint">
                Enter your skills (comma-separated)
              </p>
            </div>
          </Card>

          <Card>
            <div className="settings-field">
              <label className="settings-label">
                Minimum Match Score: {preferences.minMatchScore}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={preferences.minMatchScore}
                onChange={(e) => handleMinMatchScoreChange(Number(e.target.value))}
                className="settings-slider"
              />
              <p className="settings-hint">
                Set the minimum match score threshold (0-100)
              </p>
            </div>
          </Card>

          <div className="settings-actions">
            <Button variant="primary" onClick={handleSave}>
              {saved ? 'Saved!' : 'Save Preferences'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
