import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  CardHeader,
  CardActions,
  Box,
  IconButton,
  CardActionArea,
  Divider,
  Typography,
} from '@material-ui/core';
import MuiCardContent from '@material-ui/core/CardContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useTheme } from '@material-ui/core/styles';

import { useStyles } from './style';
import clsx from 'clsx';

import NewCareEventDialog from '../NewCareEventDialog';
import LatestResponse from './LatestResponse';
import {
  COVIDSummary,
  DENWISSummary,
  NEWS2Summary,
  SepsisSummary,
} from 'types/AssessmentSummary';
import styled from 'styled-components';

const Record = withStyles({
  root: {
    paddingTop: 0,
    paddingRight: '16px',
    paddingBottom: '16px',
  },
})(MuiCardContent);

interface Props {
  name?: string;
  identifier?: string;
  id?: string;
  children?: JSX.Element;
  assesments?: {
    denwis?: DENWISSummary;
    covid?: COVIDSummary;
    news2?: NEWS2Summary;
    sepsis?: SepsisSummary;
  };
}

const Card: React.FC<Props> = ({
  name,
  identifier,
  assesments,
  children,
  id,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const history = useHistory();
  const theme = useTheme();

  const sm = useMediaQuery(theme.breakpoints.up('md'));
  const latestResponseBar = (
    <LatestResponse sm={!sm} assessments={assesments} id={id} />
  );

  const redirectToPatientOverview = () =>
    history.push(`/patient-overview/${id}`);
  return (
    <>
      <Box className={clsx(classes.card, classes.roundedCorners)}>
        <CardHeader
          title={
            <CardActionArea onClick={redirectToPatientOverview}>
              <CardTitleTypography variant="h5" display="block">
                {name}
              </CardTitleTypography>
            </CardActionArea>
          }
          subheader={
            <CardActionArea onClick={redirectToPatientOverview}>
              <CardSubheaderTypography variant="body1" color="textSecondary">
                {identifier}
              </CardSubheaderTypography>
            </CardActionArea>
          }
          action={
            <CardActions disableSpacing>
              {sm && latestResponseBar}
              <Divider orientation="vertical" flexItem />
              <IconButton edge={'end'} onClick={handleOpen}>
                <MoreVertIcon />
              </IconButton>
            </CardActions>
          }
        />
        {children && (
          <CardActionArea onClick={redirectToPatientOverview}>
            <Record className={classes.rootContent}>{children}</Record>
          </CardActionArea>
        )}
        {!sm && (
          <>
            <Divider variant="middle" />

            <CardActions>{latestResponseBar}</CardActions>
          </>
        )}
      </Box>
      {open && (
        <NewCareEventDialog
          open={open}
          handleClose={handleClose}
          title={name}
          identifier={identifier || ''}
          id={id || ''}
        />
      )}
    </>
  );
};

export default Card;
export * from './Record';

const CardTitleTypography = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.334;
`;
const CardSubheaderTypography = styled(Typography)`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.234;
`;
