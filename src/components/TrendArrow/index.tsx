import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { NEWS2SummarTrend } from 'types/AssessmentSummary';

type tTrendArrow = {
  [key: string]: JSX.Element;
};
const TrendArrow: React.FC<{ trend: NEWS2SummarTrend }> = ({ trend }) => {
  const stateArrow: tTrendArrow = {
    decreasing: <ArrowDownwardIcon width={'0.8em'} />,
    increasing: <ArrowUpwardIcon width={'0.8em'} />,
    same: <ArrowBackIcon />,
    first: <ArrowBackIcon />,
  };
  return stateArrow[trend];
};

export default TrendArrow;
