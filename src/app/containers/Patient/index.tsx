import React from 'react';
import { Card, Record } from 'components';
import { useSelector } from 'react-redux';
import { selectPatient } from './selectors';
import { makeStyles } from '@material-ui/styles';

const Patient = () => {
  const patient = useSelector(selectPatient);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card
        name={patient?.name}
        identifier={patient?.identifier.nhsNumber}
        assesments={{
          denwis: patient?.denwis,
          sepsis: patient?.sepsis,
          news2: patient?.news2,
          covid: patient?.covid,
        }}
        id={patient?.identifier.id}
      >
        <Record
          birthDate={patient?.birthDate}
          gender={patient?.gender}
          location={patient?.location}
        />
      </Card>
    </div>
  );
};

export default Patient;

export const useStyles = makeStyles(() => ({
  root: {
    marginTop: '3.6rem',
  },
}));
