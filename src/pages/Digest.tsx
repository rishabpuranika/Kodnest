import React, { useState, useEffect } from 'react';
import { Button, EmptyState, MatchScoreBadge } from '../components';
import { jobs } from '../data/jobs';
import { getPreferences, hasPreferences } from '../utils/preferences';
import { generateDigest, getTodayDigest, saveDigest, formatDigestForText, Digest as DigestData } from '../utils/digest';
import { getRecentStatusUpdates } from '../utils/status';
import './Digest.css';

export const Digest: React.FC = () => {
  const [digest, setDigest] = useState<DigestData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [statusUpdates, setStatusUpdates] = useState(getRecentStatusUpdates(10));

  const preferences = getPreferences();
  const userHasPreferences = hasPreferences();

  useEffect(() => {
    // Refresh status updates periodically
    const interval = setInterval(() => {
      setStatusUpdates(getRecentStatusUpdates(10));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Load existing digest for today
    const todayDigest = getTodayDigest();
    if (todayDigest) {
      setDigest(todayDigest);
    }
  }, []);

  const handleGenerateDigest = () => {
    if (!userHasPreferences) return;

    setIsGenerating(true);
    
    // Simulate slight delay for better UX
    setTimeout(() => {
      const newDigest: DigestData = generateDigest(jobs, preferences);
      saveDigest(newDigest);
      setDigest(newDigest);
      setIsGenerating(false);
    }, 500);
  };

  const handleCopyToClipboard = async () => {
    if (!digest) return;

    const text = formatDigestForText(digest);
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleCreateEmailDraft = () => {
    if (!digest) return;

    const text = formatDigestForText(digest);
    const subject = encodeURIComponent('My 9AM Job Digest');
    const body = encodeURIComponent(text);
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoLink;
  };

  const formatDate = (dateString: string): string => {
    // Parse YYYY-MM-DD format
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!userHasPreferences) {
    return (
      <div className="digest">
        <div className="digest-container">
          <EmptyState
            title="Set preferences to generate a personalized digest"
            description="Configure your job preferences in Settings to enable digest generation."
            action={
              <Button variant="primary" onClick={() => window.location.href = '/settings'}>
                Go to Settings
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  if (!digest) {
    return (
      <div className="digest">
        <div className="digest-container">
          <div className="digest-header">
            <h1 className="digest-title">Daily Digest</h1>
            <p className="digest-subtitle">
              Get your personalized top 10 job matches delivered daily
            </p>
          </div>

          <div className="digest-generate-section">
            <Button
              variant="primary"
              onClick={handleGenerateDigest}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : "Generate Today's 9AM Digest (Simulated)"}
            </Button>
            <p className="digest-simulation-note">
              Demo Mode: Daily 9AM trigger simulated manually.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (digest.jobs.length === 0) {
    return (
      <div className="digest">
        <div className="digest-container">
          <EmptyState
            title="No matching roles today"
            description="Check again tomorrow for new opportunities."
            action={
              <Button variant="primary" onClick={handleGenerateDigest}>
                Regenerate Digest
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="digest">
      <div className="digest-container">
        <div className="digest-email-card">
          <div className="digest-email-header">
            <h2 className="digest-email-title">Top 10 Jobs For You — 9AM Digest</h2>
            <p className="digest-email-date">{formatDate(digest.date)}</p>
          </div>

          <div className="digest-email-body">
            {digest.jobs.map(({ job, matchScore }, index) => (
              <div key={job.id} className="digest-job-item">
                <div className="digest-job-number">{index + 1}</div>
                <div className="digest-job-content">
                  <h3 className="digest-job-title">{job.title}</h3>
                  <p className="digest-job-company">{job.company}</p>
                  <div className="digest-job-details">
                    <span className="digest-job-detail">
                      <strong>Location:</strong> {job.location}
                    </span>
                    <span className="digest-job-detail">
                      <strong>Experience:</strong>{' '}
                      {job.experience === 'Fresher' ? 'Fresher' : `${job.experience} years`}
                    </span>
                    <span className="digest-job-detail">
                      <MatchScoreBadge score={matchScore} />
                    </span>
                  </div>
                  <div className="digest-job-actions">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => window.open(job.applyUrl, '_blank', 'noopener,noreferrer')}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="digest-email-footer">
            <p className="digest-footer-text">
              This digest was generated based on your preferences.
            </p>
            <p className="digest-simulation-note-small">
              Demo Mode: Daily 9AM trigger simulated manually.
            </p>
          </div>
        </div>

        <div className="digest-actions">
          <Button
            variant="secondary"
            onClick={handleCopyToClipboard}
            disabled={copied}
          >
            {copied ? 'Copied!' : 'Copy Digest to Clipboard'}
          </Button>
          <Button variant="secondary" onClick={handleCreateEmailDraft}>
            Create Email Draft
          </Button>
          <Button variant="primary" onClick={handleGenerateDigest}>
            Regenerate Digest
          </Button>
        </div>

        {statusUpdates.length > 0 && (
          <div className="digest-status-updates">
            <h3 className="digest-status-updates-title">Recent Status Updates</h3>
            <div className="digest-status-updates-list">
              {statusUpdates.map((update, index) => {
                const job = jobs.find((j) => j.id === update.jobId);
                if (!job) return null;

                const updateDate = new Date(update.updatedAt);
                const formattedDate = updateDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <div key={`${update.jobId}-${update.updatedAt}-${index}`} className="digest-status-update-item">
                    <div className="digest-status-update-content">
                      <div className="digest-status-update-job">
                        <strong>{job.title}</strong> at {job.company}
                      </div>
                      <div className="digest-status-update-status">
                        Status: <span className={`status-${update.status.toLowerCase().replace(' ', '-')}`}>{update.status}</span>
                      </div>
                    </div>
                    <div className="digest-status-update-date">{formattedDate}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
