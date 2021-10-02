import React, { useMemo } from 'react';
import {
  Grid,
  useTheme,
  useMediaQuery,
  Box,
  Typography,
} from '@material-ui/core';
import uniqid from 'uniqid';
import { Button, Carousel, VitalSignsTable } from 'components';

import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectNews2 } from 'app/containers/Patient/selectors';

export const CarouselCard = ({ title, onClick, children }) => {
  return (
    <Card>
      <Box width="100%" p={1}>
        <Typography
          gutterBottom
          align="center"
          variant="subtitle1"
          color="textSecondary"
        >
          {title}
        </Typography>
        {children ? (
          <Wrapper> {children}</Wrapper>
        ) : (
          <Typography gutterBottom align="center">
            No data available
          </Typography>
        )}
      </Box>
      <Box width="100%" display="flex" justifyContent="center">
        <Button.Secondary onClick={onClick} disabled={false}>
          Show more
        </Button.Secondary>
      </Box>
    </Card>
  );
};
export const Monitoring = () => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints?.up('lg'));
  const maximize = () => console.log('a');

  const news2 = useSelector(selectNews2);

  const humanVitalSigns = useMemo(
    () =>
      news2 ? (
        <VitalSignsTable news2={news2} flowRate={null} />
      ) : (
        <Typography align="center">No results</Typography>
      ),
    [news2],
  );
  const machineVitalSigns = useMemo(
    () =>
      news2 ? (
        <VitalSignsTable news2={news2} flowRate={null} />
      ) : (
        <Typography align="center">No results</Typography>
      ),
    [news2],
  );

  return (
    <Box flexDirection="column" p={1} display="flex">
      <Typography
        gutterBottom
        align="center"
        variant="h6"
        color="textSecondary"
      >
        Monitoring
      </Typography>
      <Carousel>
        {md
          ? [
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                key={uniqid()}
                spacing={1}
              >
                <Grid item lg={6} xs={12}>
                  <CarouselCard
                    onClick={maximize}
                    title="Latest face to face monitoring vital signs"
                  >
                    <Box m={2}>{humanVitalSigns}</Box>
                  </CarouselCard>
                </Grid>

                <Grid item lg={6} xs={12}>
                  <CarouselCard
                    onClick={maximize}
                    title="Latest machine monitoring vital signs"
                  >
                    <Box m={2}>{machineVitalSigns}</Box>
                  </CarouselCard>
                </Grid>
              </Grid>,
            ]
          : [
              <CarouselCard
                onClick={maximize}
                title="Latest face to face monitoring vital signs"
              >
                {humanVitalSigns}
              </CarouselCard>,

              <CarouselCard
                onClick={maximize}
                title="Latest machine monitoring vital signs"
              >
                {machineVitalSigns}
              </CarouselCard>,
            ]}
      </Carousel>
    </Box>
  );
};
const Wrapper = styled.div`
  height: 120px;
  overflow: hidden;
`;

const Card = styled.div``;
