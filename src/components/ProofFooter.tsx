import React, { useState } from 'react';
import './ProofFooter.css';

interface ProofItem {
  id: string;
  label: string;
  checked: boolean;
  proofInput?: string;
}

interface ProofFooterProps {
  items: ProofItem[];
  onProofChange?: (id: string, checked: boolean, proofInput?: string) => void;
}

export const ProofFooter: React.FC<ProofFooterProps> = ({
  items,
  onProofChange,
}) => {
  const [proofInputs, setProofInputs] = useState<Record<string, string>>({});

  const handleCheckboxChange = (id: string, checked: boolean) => {
    onProofChange?.(id, checked, proofInputs[id]);
  };

  const handleProofInputChange = (id: string, value: string) => {
    setProofInputs((prev) => ({ ...prev, [id]: value }));
    const item = items.find((item) => item.id === id);
    if (item?.checked) {
      onProofChange?.(id, true, value);
    }
  };

  return (
    <div className="proof-footer">
      <h4 className="proof-footer-title">Proof Checklist</h4>
      <div className="proof-checklist">
        {items.map((item) => (
          <div key={item.id} className="proof-item">
            <input
              type="checkbox"
              className="checkbox-input"
              id={item.id}
              checked={item.checked}
              onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
            />
            <label htmlFor={item.id} className="proof-item-label">
              {item.label}
            </label>
            {item.checked && (
              <input
                type="text"
                className="input"
                placeholder="Add proof..."
                value={proofInputs[item.id] || ''}
                onChange={(e) => handleProofInputChange(item.id, e.target.value)}
                style={{ width: '200px', marginLeft: 'var(--spacing-sm)' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
