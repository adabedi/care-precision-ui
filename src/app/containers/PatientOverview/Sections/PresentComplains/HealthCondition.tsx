import React from 'react';
import { Box, Typography } from '@material-ui/core';
import VeryFit from 'assests/very-fit.jpeg';
import Well from 'assests/well.jpeg';
import ManagingWell from 'assests/managing-well.jpeg';
import Vulnerable from 'assests/vulnerable.jpeg';
import MildlyFrail from 'assests/mildly-frail.jpeg';
import ModeratelyFrail from 'assests/moderately-frail.jpeg';
import SeverelyFrail from 'assests/severely-frail.jpeg';
import VerySeverelyFrail from 'assests/very-severely-frail.jpeg';
import TerminallyIll from 'assests/terminally-ill.jpeg';
import { useSelector } from 'react-redux';
import { selectFrailty } from 'app/containers/Patient/selectors';
import { fralityValueCode } from 'types/Patient/Measurements';

export const HealthCondition = () => {
  const FRALITY = {
    at0005: VeryFit,
    at0006: Well,
    at0007: ManagingWell,
    at0008: Vulnerable,
    at0009: MildlyFrail,
    at0010: ModeratelyFrail,
    at0011: SeverelyFrail,
    at0012: VerySeverelyFrail,
    at0013: TerminallyIll,
  };

  const frality = useSelector(selectFrailty);
  return (
    <Box display="flex" flexDirection="column">
      <Box
        display="flex"
        flexDirection="row"
        alignContent="center"
        alignItems="center"
      >
        <Typography display="inline" variant="subtitle1" component="div">
          {'Frailty Score: '}
        </Typography>
        <Box mr={1} />
        <Typography variant="subtitle2" component="div">
          {frality?.value}
        </Typography>
      </Box>
      {frality && (
        <Box display="flex" flexDirection="row">
          <Box flexShrink={6}>
            <Typography>
              People who are robust, active, energetic and motivated. These
              people commonly exercise regularly. They are among the fittest for
              their age.
            </Typography>
          </Box>
          <Box>
            <img
              src={FRALITY[fralityValueCode[frality.value]]}
              alt={frality.value}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};
