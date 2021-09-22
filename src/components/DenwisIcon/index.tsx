import React from 'react';
import { DENWISSummary } from 'types/AssessmentSummary';
import { Label, IconButton } from '../IconButton';
import Denwis from './Denwis';

interface Props {
  denwis: DENWISSummary;
  label?: boolean;
}
const DenwisIcon: React.FC<Props> = ({ denwis, label = false }) => {
  const color =
    denwis?.value === 0 ? 'grey' : denwis?.value > 4 ? 'red' : 'green';
  return (
    <IconButton onClick={() => console.log('a')}>
      <Denwis stroke={color} value={denwis.value} trend={denwis.trend} />
      {label && <Label>DENWIS</Label>}
    </IconButton>
  );
};

export default DenwisIcon;
