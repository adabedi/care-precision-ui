import React from 'react';
import { Grid, Box } from '@material-ui/core';
import { useStylesLastResponse } from './style';
import DenwisIcon from '../DenwisIcon';
import News2Icon from '../News2Icon';
import CovidIcon from '../CovidIcon';
import SepsisIcon from '../SepsisIcon';

const LatestResponse = ({ assessments, sm, id }) => {
  const classes = useStylesLastResponse();

  return (
    <Box mr={1}>
      <Grid
        container
        direction="row"
        alignItems="center"
        {...(sm ? { className: classes.container } : {})}
      >
        {assessments?.denwis && (
          <Grid item>
            <DenwisIcon label denwis={assessments.denwis} />
          </Grid>
        )}
        {assessments?.sepsis && (
          <>
            <Grid item>
              <SepsisIcon label value={assessments.sepsis} />
            </Grid>
          </>
        )}
        {assessments?.news2 && (
          <>
            <Grid item>
              <News2Icon label news2={assessments.news2} />
            </Grid>
          </>
        )}
        {assessments?.covid?.value && (
          <>
            <Grid item>
              <CovidIcon label value={assessments?.covid?.value} />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default LatestResponse;
