import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import uniqid from 'uniqid';

import { patientListFromSaga } from './saga';
import { sliceKey, actions, reducer } from './slice';

import {
  selectPatients,
  selectError,
  selectLoading,
  selectFilters,
} from './selectors';

import { Box, List, Toolbar, Grid, Typography } from '@material-ui/core';
import { Card, Record, SortPoper, Sort, Spinner } from 'components';
import { useStyles } from './styles';
import Search from '../SearchPatientRecord';
import { SortDir, SortKey } from './types';

const Records = () => {
  useInjectReducer({ key: sliceKey, reducer });
  useInjectSaga({ key: sliceKey, saga: patientListFromSaga });
  const classes = useStyles();
  const ref = React.useRef(null);

  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoading);
  const patients = useSelector(selectPatients);
  const filters = useSelector(selectFilters);

  React.useEffect(() => {
    dispatch(
      actions.loadRecords({
        sort: { sortKey: SortKey.BIRTH_DATE, sortDir: SortDir.DESC },
      }),
    );
  }, [dispatch]);

  const handleSortFilter = React.useCallback(
    filters => {
      dispatch(actions.addFilters(filters));
      dispatch(actions.loadRecords(filters));
    },
    [dispatch],
  );

  return (
    <>
      <div className={classes.fixed} ref={ref}>
        <Toolbar>
          <Grid direction="row" alignItems="center" container>
            <Grid item xs={10} sm={11} md={11}>
              <Search />
            </Grid>
            <Grid item>
              <SortPoper>
                <Sort
                  sort
                  sepsis
                  covid
                  onFilterSort={handleSortFilter}
                  defaultValues={filters}
                />
              </SortPoper>
            </Grid>
          </Grid>
        </Toolbar>
      </div>
      <Box mt={6} />
      <Box m={1} mb={8}>
        {error && <p>{error}</p>}
        {isLoading && <Spinner />}
        {patients?.length > 0 ? (
          <>
            <List>
              {patients.map(
                ({
                  name,
                  identifier: { nhsNumber, id },
                  birthDate,
                  gender,
                  location,
                  denwis,
                  covid,
                  news2,
                  sepsis,
                }) => (
                  <Box key={uniqid()}>
                    <Card
                      name={name}
                      identifier={nhsNumber}
                      assesments={{ denwis, covid, news2, sepsis }}
                      id={id}
                    >
                      <Record
                        birthDate={birthDate}
                        gender={gender}
                        location={location}
                      />
                    </Card>
                  </Box>
                ),
              )}
            </List>
          </>
        ) : (
          <Typography>There are no such records.</Typography>
        )}
      </Box>
    </>
  );
};
export default Records;
