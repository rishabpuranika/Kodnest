export type ProjectStatus = 'Not Started' | 'In Progress' | 'Shipped';

export interface ProofData {
  lovableLink: string;
  githubLink: string;
  deployedLink: string;
  status: ProjectStatus;
}

const PROOF_KEY = 'jobTrackerProof';

const STEPS = [
  { id: 'design-system', label: 'Design System Foundation', completed: true },
  { id: 'routing', label: 'Route Skeleton', completed: true },
  { id: 'landing', label: 'Landing Page', completed: true },
  { id: 'job-data', label: 'Job Data & Rendering', completed: true },
  { id: 'preferences', label: 'Preferences & Match Scoring', completed: true },
  { id: 'digest', label: 'Daily Digest Engine', completed: true },
  { id: 'status-tracking', label: 'Status Tracking', completed: true },
  { id: 'test-checklist', label: 'Test Checklist', completed: true },
];

export const getSteps = () => STEPS;

export const getProofData = (): ProofData => {
  if (typeof window === 'undefined') {
    return {
      lovableLink: '',
      githubLink: '',
      deployedLink: '',
      status: 'Not Started',
    };
  }
  const saved = localStorage.getItem(PROOF_KEY);
  return saved
    ? JSON.parse(saved)
    : {
        lovableLink: '',
        githubLink: '',
        deployedLink: '',
        status: 'Not Started',
      };
};

export const saveProofData = (data: Partial<ProofData>): void => {
  if (typeof window === 'undefined') return;
  const current = getProofData();
  const updated = { ...current, ...data };
  localStorage.setItem(PROOF_KEY, JSON.stringify(updated));
};

export const validateUrl = (url: string): boolean => {
  if (!url.trim()) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const canShip = (allTestsPassed: boolean): boolean => {
  const proof = getProofData();
  
  const allLinksProvided =
    proof.lovableLink.trim() !== '' &&
    proof.githubLink.trim() !== '' &&
    proof.deployedLink.trim() !== '';
  
  return allLinksProvided && allTestsPassed;
};

export const updateStatus = (allTestsPassed: boolean): ProjectStatus => {
  const proof = getProofData();
  const allLinksProvided =
    proof.lovableLink.trim() !== '' &&
    proof.githubLink.trim() !== '' &&
    proof.deployedLink.trim() !== '';
  
  if (allLinksProvided && allTestsPassed) {
    if (proof.status !== 'Shipped') {
      saveProofData({ status: 'Shipped' });
    }
    return 'Shipped';
  } else if (proof.lovableLink.trim() !== '' || proof.githubLink.trim() !== '' || proof.deployedLink.trim() !== '') {
    if (proof.status === 'Not Started') {
      saveProofData({ status: 'In Progress' });
    }
    return 'In Progress';
  }
  
  return 'Not Started';
};
