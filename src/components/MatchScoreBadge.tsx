import React from 'react';
import { Badge } from './Badge';
import { getMatchScoreColor } from '../utils/matchScore';

interface MatchScoreBadgeProps {
  score: number;
}

export const MatchScoreBadge: React.FC<MatchScoreBadgeProps> = ({ score }) => {
  const color = getMatchScoreColor(score);
  return (
    <Badge variant={color}>
      Match: {score}%
    </Badge>
  );
};
