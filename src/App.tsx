import React, { useState } from 'react';
import {
  TopBar,
  ContextHeader,
  PrimaryWorkspace,
  SecondaryPanel,
  ProofFooter,
  Card,
} from './components';
import './styles/design-system.css';
import './styles/components.css';
import './styles/layout.css';

function App() {
  const [proofItems, setProofItems] = useState([
    { id: 'ui-built', label: 'UI Built', checked: false },
    { id: 'logic-working', label: 'Logic Working', checked: false },
    { id: 'test-passed', label: 'Test Passed', checked: false },
    { id: 'deployed', label: 'Deployed', checked: false },
  ]);

  const handleProofChange = (
    id: string,
    checked: boolean,
    proofInput?: string
  ) => {
    setProofItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, checked, proofInput } : item
      )
    );
  };

  return (
    <div className="app">
      <TopBar
        projectName="KodNest Premium Build System"
        currentStep={1}
        totalSteps={5}
        status="In Progress"
      />

      <ContextHeader
        headline="Design System Foundation"
        subtext="A calm, intentional, and coherent design system for premium SaaS products"
      />

      <div className="main-content">
        <PrimaryWorkspace>
          <Card>
            <p>
              This is the primary workspace where the main product interaction
              happens. Components here follow the design system principles:
              clean cards, predictable components, no crowding.
            </p>
          </Card>
          <Card header={<h3>Design Principles</h3>}>
            <p style={{ marginBottom: 'var(--spacing-sm)' }}>
              The design system emphasizes:
            </p>
            <ul style={{ paddingLeft: 'var(--spacing-md)' }}>
              <li>Calm and intentional interactions</li>
              <li>Coherent visual language</li>
              <li>Confident typography and spacing</li>
              <li>No visual noise or unnecessary animations</li>
            </ul>
          </Card>
        </PrimaryWorkspace>

        <SecondaryPanel
          stepExplanation="This panel provides context, copyable prompts, and action buttons for the current step."
          promptText="Create a premium SaaS design system with calm, intentional design principles"
          onCopy={() => console.log('Copied')}
          onBuildInLovable={() => console.log('Build in Lovable')}
          onItWorked={() => console.log('It Worked')}
          onError={() => console.log('Error')}
          onAddScreenshot={() => console.log('Add Screenshot')}
        />
      </div>

      <ProofFooter items={proofItems} onProofChange={handleProofChange} />
    </div>
  );
}

export default App;
