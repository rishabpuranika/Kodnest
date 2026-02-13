import React, { useState, useEffect } from 'react';
import { Button, Card, Badge, Input } from '../components';
import { getProofData, saveProofData, validateUrl, getSteps, updateStatus, canShip, ProjectStatus } from '../utils/proof';
import { getAllTestsPassed, getTestsPassedCount } from '../utils/testChecklist';
import './FinalProof.css';

export const FinalProof: React.FC = () => {
  const [proof, setProof] = useState(getProofData());
  const allTestsPassed = getAllTestsPassed();
  const [status, setStatus] = useState<ProjectStatus>(updateStatus(allTestsPassed));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const currentStatus = updateStatus(allTestsPassed);
    setStatus(currentStatus);
  }, [proof, allTestsPassed]);

  const handleLinkChange = (field: 'lovableLink' | 'githubLink' | 'deployedLink', value: string) => {
    const error: string = value.trim() && !validateUrl(value) ? 'Invalid URL format' : '';
    setErrors({ ...errors, [field]: error });
    
    if (!error) {
      const updated = { ...proof, [field]: value };
      setProof(updated);
      saveProofData(updated);
      
      // Auto-update status
      const newStatus = updateStatus();
      setStatus(newStatus);
    }
  };

  const handleCopySubmission = async () => {
    const submission = `------------------------------------------
Job Notification Tracker — Final Submission

Lovable Project:
${proof.lovableLink || 'Not provided'}

GitHub Repository:
${proof.githubLink || 'Not provided'}

Live Deployment:
${proof.deployedLink || 'Not provided'}

Core Features:
- Intelligent match scoring
- Daily digest simulation
- Status tracking
- Test checklist enforced

Test Status: ${testsPassed}/10 tests passed${allTestsPassed ? ' (All passed)' : ''}
Project Status: ${status}
------------------------------------------`;

    try {
      await navigator.clipboard.writeText(submission);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const steps = getSteps();
  const testsPassed = getTestsPassedCount();
  const canShipProject = canShip(allTestsPassed);

  return (
    <div className="final-proof">
      <div className="final-proof-container">
        <div className="final-proof-header">
          <div className="final-proof-title-section">
            <h1 className="final-proof-title">Project 1 — Job Notification Tracker</h1>
            <Badge
              variant={
                status === 'Shipped'
                  ? 'success'
                  : status === 'In Progress'
                  ? 'warning'
                  : 'default'
              }
            >
              {status}
            </Badge>
          </div>
          {status === 'Shipped' && (
            <p className="final-proof-completion-message">
              Project 1 Shipped Successfully.
            </p>
          )}
        </div>

        <Card className="final-proof-section">
          <h2 className="final-proof-section-title">A) Step Completion Summary</h2>
          <div className="final-proof-steps">
            {steps.map((step) => (
              <div key={step.id} className="final-proof-step">
                <div className="final-proof-step-checkbox">
                  {step.completed ? '✓' : '□'}
                </div>
                <span className={`final-proof-step-label ${step.completed ? 'completed' : ''}`}>
                  {step.label}
                </span>
                <Badge variant={step.completed ? 'success' : 'muted'}>
                  {step.completed ? 'Completed' : 'Pending'}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="final-proof-section">
          <h2 className="final-proof-section-title">B) Artifact Collection Inputs</h2>
          <div className="final-proof-artifacts">
            <div className="final-proof-artifact-field">
              <label className="final-proof-artifact-label">
                Lovable Project Link <span className="required">*</span>
              </label>
              <Input
                type="url"
                placeholder="https://lovable.dev/project/..."
                value={proof.lovableLink}
                onChange={(e) => handleLinkChange('lovableLink', e.target.value)}
                className={errors.lovableLink ? 'input-error' : ''}
              />
              {errors.lovableLink && (
                <p className="final-proof-error">{errors.lovableLink}</p>
              )}
            </div>

            <div className="final-proof-artifact-field">
              <label className="final-proof-artifact-label">
                GitHub Repository Link <span className="required">*</span>
              </label>
              <Input
                type="url"
                placeholder="https://github.com/username/repo"
                value={proof.githubLink}
                onChange={(e) => handleLinkChange('githubLink', e.target.value)}
                className={errors.githubLink ? 'input-error' : ''}
              />
              {errors.githubLink && (
                <p className="final-proof-error">{errors.githubLink}</p>
              )}
            </div>

            <div className="final-proof-artifact-field">
              <label className="final-proof-artifact-label">
                Deployed URL (Vercel or equivalent) <span className="required">*</span>
              </label>
              <Input
                type="url"
                placeholder="https://your-app.vercel.app"
                value={proof.deployedLink}
                onChange={(e) => handleLinkChange('deployedLink', e.target.value)}
                className={errors.deployedLink ? 'input-error' : ''}
              />
              {errors.deployedLink && (
                <p className="final-proof-error">{errors.deployedLink}</p>
              )}
            </div>
          </div>
        </Card>

        <Card className="final-proof-section">
          <h2 className="final-proof-section-title">Ship Requirements</h2>
          <div className="final-proof-requirements">
            <div className="final-proof-requirement">
              <span className={`final-proof-requirement-check ${proof.lovableLink.trim() !== '' ? 'met' : ''}`}>
                {proof.lovableLink.trim() !== '' ? '✓' : '□'}
              </span>
              <span className={proof.lovableLink.trim() !== '' ? 'met' : ''}>
                Lovable Project Link provided
              </span>
            </div>
            <div className="final-proof-requirement">
              <span className={`final-proof-requirement-check ${proof.githubLink.trim() !== '' ? 'met' : ''}`}>
                {proof.githubLink.trim() !== '' ? '✓' : '□'}
              </span>
              <span className={proof.githubLink.trim() !== '' ? 'met' : ''}>
                GitHub Repository Link provided
              </span>
            </div>
            <div className="final-proof-requirement">
              <span className={`final-proof-requirement-check ${proof.deployedLink.trim() !== '' ? 'met' : ''}`}>
                {proof.deployedLink.trim() !== '' ? '✓' : '□'}
              </span>
              <span className={proof.deployedLink.trim() !== '' ? 'met' : ''}>
                Deployed URL provided
              </span>
            </div>
            <div className="final-proof-requirement">
              <span className={`final-proof-requirement-check ${allTestsPassed ? 'met' : ''}`}>
                {allTestsPassed ? '✓' : '□'}
              </span>
              <span className={allTestsPassed ? 'met' : ''}>
                All 10 test checklist items passed ({testsPassed}/10)
              </span>
            </div>
          </div>
          {canShipProject && status !== 'Shipped' && (
            <p className="final-proof-ready-message">
              All requirements met. Status will update to "Shipped" automatically.
            </p>
          )}
        </Card>

        <div className="final-proof-actions">
          <Button
            variant="primary"
            onClick={handleCopySubmission}
            disabled={copied}
          >
            {copied ? 'Copied!' : 'Copy Final Submission'}
          </Button>
        </div>
      </div>
    </div>
  );
};
