import React from 'react';
import { SvgIcon, makeStyles } from '@material-ui/core';
import EmojiFlagsTwoToneIcon from '@material-ui/icons/EmojiFlagsTwoTone';
import clsx from 'clsx';
import { Label, IconButton } from '../IconButton';
import { SepsisSummary } from 'types/AssessmentSummary';

const useStyles = makeStyles(() => ({
  root: {
    width: '32px',
    height: '32px',
  },
  small: {
    width: '18px',
    height: '18px',
  },
  amber: { color: '#ffbf00' },
  red: { color: 'red' },
  grey: { color: 'grey' },
  green: { color: 'green' },
  white: { color: 'white' },
}));

interface Props {
  label?: boolean;
  small?: boolean;
  value: SepsisSummary;
}
const SepsisIcon: React.FC<Props> = ({
  value,
  label = false,
  small = false,
}) => {
  const classes = useStyles();
  if (value === null) return null;
  return (
    <IconButton
      onClick={() => console.log('a')}
      style={{ padding: small ? '0px' : '12px' }}
    >
      <SvgIcon
        component={EmojiFlagsTwoToneIcon}
        className={clsx(classes[value.value], classes.root)}
      />
      {label && <Label>SEPSIS</Label>}
    </IconButton>
  );
};

export const SepsisIconBadget: React.FC<SepsisSummary> = ({ value }) => {
  const classes = useStyles();
  if (value === null) return null;
  return (
    <SvgIcon
      component={EmojiFlagsTwoToneIcon}
      className={clsx(classes[value], classes.small)}
    />
  );
};
export default SepsisIcon;
