import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useInjectSaga, useInjectReducer } from 'utils/redux-injectors';

import { Helmet } from 'react-helmet-async';
import uniqid from 'uniqid';

import { IconButton } from '@material-ui/core';
import {
  DenwisIcon,
  CovidIcon,
  SepsisIcon,
  NewCareEventDialog,
  News2Icon,
} from 'components';
import { patientListFromSaga } from '../PatientList/saga';
import { useHistory } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { sliceKey, actions, reducer } from '../PatientList/slice';
import {
  selectPatients,
  selectError,
  selectLoading,
  selectFilters,
} from '../PatientList/selectors';

import { Box, Toolbar, Grid, Typography, Divider } from '@material-ui/core';
import { Spinner, Table, TdLast, TdFirst } from 'components';
import { useStyles } from '../PatientList/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Search from '../SearchPatientRecord';
import { SortDir } from '../PatientList/types';
import { applayFilters } from 'utils/fake';

const AcuityList = () => {
  //redux configuration
  useInjectReducer({ key: sliceKey, reducer });
  useInjectSaga({ key: sliceKey, saga: patientListFromSaga });
  const classes = useStyles();
  const ref = React.useRef(null);
  const theme = useTheme();

  const xs = useMediaQuery(theme.breakpoints.down(560));
  const history = useHistory();

  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoading);
  const patients = useSelector(selectPatients);
  const filters = useSelector(selectFilters);

  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  React.useEffect(() => {
    handleRequestSort({
      sort: {
        sortKey: 'name',
        sortDir: SortDir.ASC,
      },
    });
  }, []);

  const handleRequestSort = React.useCallback(
    newFilters => {
      dispatch(actions.addFilters(newFilters));
      dispatch(actions.loadRecords(newFilters));
    },
    [dispatch],
  );

  // Temporary solution, until backend start accept a
  //  covid & sepsis filters

  const patientsToDisplay = filters?.filter
    ? applayFilters(patients, filters.filter)
    : patients;

  return (
    <>
      <Helmet>
        <title>{'Patient List'}</title>
        <meta name="description" content={'A Patient List'} />
      </Helmet>
      <>
        <div className={classes.fixed} ref={ref}>
          <Toolbar>
            <Grid
              direction="row"
              alignItems="center"
              justify={'flex-end'}
              container
            >
              <Grid item xs={12} sm={12} md={12}>
                <Search />
              </Grid>
            </Grid>
          </Toolbar>
        </div>

        {error && <p>{error}</p>}
        {isLoading && <Spinner />}
        <>
          <Box mb={8} style={{ marginTop: '50px' }}>
            {xs ? (
              <Typography>
                Please switch the orientation of your device to horizontal
              </Typography>
            ) : (
              <Table.Acuity
                onRequestSort={handleRequestSort}
                order={filters?.sort?.sortDir}
                orderBy={filters?.sort?.sortKey}
                filters={filters}
              >
                {patientsToDisplay?.length > 0 ? (
                  patientsToDisplay.map(
                    ({
                      name,
                      identifier: { nhsNumber, id },
                      location,
                      denwis,
                      covid,
                      news2,
                      sepsis,
                    }) => {
                      const redirectToPatientOverview = () =>
                        history.push(`/patient-overview/${id}`);
                      return (
                        <React.Fragment key={uniqid()}>
                          <tr style={{ backgroundColor: '#fff' }}>
                            <TdFirst onClick={redirectToPatientOverview}>
                              {location}
                            </TdFirst>
                            <Td
                              style={{
                                paddingTop: '15px',
                                paddingBottom: '15px',
                              }}
                              onClick={redirectToPatientOverview}
                            >
                              <Typography variant="subtitle2" display="block">
                                {name}
                              </Typography>
                              <Typography variant="body1" color="textSecondary">
                                {nhsNumber}
                              </Typography>
                            </Td>
                            <Td>
                              {denwis && <DenwisIcon label denwis={denwis} />}
                            </Td>
                            <Td>
                              {covid && <CovidIcon label value={covid} />}
                            </Td>
                            <Td>
                              {sepsis && <SepsisIcon label value={sepsis} />}
                            </Td>
                            <Td>
                              {news2 && <News2Icon label news2={news2} />}
                            </Td>
                            <Td>Action</Td>
                            <TdLast>
                              <Divider orientation="vertical" flexItem />
                              <IconButton edge={'end'} onClick={handleOpen}>
                                <MoreVertIcon />
                              </IconButton>
                            </TdLast>
                          </tr>
                          {open && (
                            <NewCareEventDialog
                              open={open}
                              handleClose={handleClose}
                              title={name}
                              identifier={nhsNumber || ''}
                              id={id || ''}
                            />
                          )}
                        </React.Fragment>
                      );
                    },
                  )
                ) : (
                  <tr>
                    <Td>
                      <Typography>There are no such records</Typography>
                    </Td>
                  </tr>
                )}
              </Table.Acuity>
            )}
          </Box>
        </>
      </>
    </>
  );
};
export default AcuityList;

const Td = styled.td`
  text-align: center;
  cursor: pointer;
`;
