import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  IconButton,
  Radio,
  FormControlLabel,
  RadioGroup,
} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import DeleteIcon from '@material-ui/icons/Delete';
import { SelectItem } from '../SelectItem';
import Button from '../Button';

import uniqid from 'uniqid';
import { SortDir, SortKey } from 'app/containers/PatientList/types';
import { LocationEnum } from 'types/Patient';
import { getEnvTruthly } from 'utils/mockRequest';

const SORT_BY = [
  {
    id: SortKey.NAME,
    name: 'Name',
  },
  {
    id: SortKey.BIRTH_DATE,
    name: 'Age',
  },
  {
    ...(getEnvTruthly('REACT_APP_STATIC')
      ? [
          {
            id: 'news2',
            name: 'News2',
          },
          {
            id: 'denwis',
            name: 'DENWIS',
          },
        ]
      : []),
  },
];

const FILTER_SEPSIS = [
  {
    id: 'grey',
    name: 'Grey',
  },
  {
    id: 'amber',
    name: 'Amber',
  },
  {
    id: 'red',
    name: 'Red',
  },
];

const FILTER_COVID = [
  {
    id: 'grey',
    name: 'Grey',
  },
  {
    id: 'green',
    name: 'Green',
  },
  {
    id: 'amber',
    name: 'Amber',
  },
  {
    id: 'red',
    name: 'Red',
  },
];
export const RadioItem: React.FC<{
  value: string;
  label: string;
  disabled?: boolean;
}> = ({ value, label, disabled }) => (
  <FormControlLabel
    value={value}
    control={<Radio size="small" color="primary" disabled={disabled} />}
    label={label}
  />
);

interface Props {
  id?: string;
  onFilterSort: any;
  defaultValues: {
    sort: {
      sortKey: null | SortKey;
      sortDir: null | SortDir;
    };
    location?: LocationEnum;
    filter?: { filterKey: string; filterDir: string };
  };
  sort?: boolean;
  sepsis?: boolean;
  covid?: boolean;
}
const ACTIVE_BTN = '#29375d';
const Sort: React.FC<Props> = React.forwardRef(
  ({ id, onFilterSort, defaultValues, sort, sepsis, covid }, ref) => {
    const [state, setState] = React.useState<any>({
      sort: defaultValues.sort,
      filter: defaultValues?.filter,
    });

    const [arrows, setArrows] = React.useState({ ASC: '', DESC: '' });
    const useEffectOnMount = (effect: React.EffectCallback) => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      React.useEffect(effect, []);
    };
    useEffectOnMount(() => {
      setState(defaultValues);
      if (!defaultValues?.sort?.sortDir) {
        setAsc();
      } else {
        setArrows(
          defaultValues?.sort?.sortDir === SortDir.ASC
            ? { ASC: ACTIVE_BTN, DESC: '' }
            : { ASC: '', DESC: ACTIVE_BTN },
        );
      }
    });
    const handleChangeSelect = (
      e: React.ChangeEvent<HTMLInputElement>,
    ): void => {
      const value = e.target.value;
      const name = e.target.name;
      setState({ ...state, filter: { filterKey: name, filterDir: value } });
    };

    const handleChange = event => {
      setState(oldState => ({
        ...oldState,
        sort: { ...oldState.sort, sortKey: event.target.value },
      }));
    };
    const setOrder = order =>
      setState(oldState => ({
        ...oldState,
        sort: { ...oldState.sort, sortDir: order },
      }));
    const clearOrder = () =>
      setState(oldState => ({
        sort: { sortKey: SortKey.NAME, sortDir: SortDir.DESC },
      }));
    const clearFilter = () =>
      setState(oldState => ({ ...oldState, filter: null }));

    const setAsc = () => {
      setArrows({ ASC: ACTIVE_BTN, DESC: '' });
      setOrder(SortDir.ASC);
    };
    const setDesc = e => {
      setArrows({ ASC: '', DESC: ACTIVE_BTN });
      setOrder(SortDir.DESC);
    };
    const handleFilterSort = e => {
      onFilterSort(state);
    };
    const clearAll = e => {
      clearOrder();
      clearFilter();
      onFilterSort({
        sort: { sortKey: SortKey.NAME, sortDir: SortDir.DESC },
        filter: null,
      });
    };
    const clearFilters = React.useCallback(() => {
      setState({ ...state, filter: null });
    }, [state]);
    const clearSepsis = () => clearFilters();
    const clearCovid = () => clearFilters();

    return (
      <Box p={1} m={1}>
        {sort && (
          <Box
            width={300}
            display="flex"
            flexDirection="row"
            bgcolor="background.paper"
          >
            <Box p={1} flexShrink={1}>
              <FormControl>
                <FormLabel component="legend">Sort by:</FormLabel>
                <Select
                  native
                  value={state.sort.sortKey}
                  onChange={handleChange}
                  inputProps={{
                    name: 'age',
                    id: 'age-native-simple',
                  }}
                >
                  <SelectItem value="" aria-label="None" />
                  {SORT_BY.map(({ id, name }) => (
                    <SelectItem key={uniqid()} value={id || ''}>
                      {name}
                    </SelectItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box p={1}>
              <IconButton onClick={setAsc}>
                <ArrowUpwardIcon htmlColor={arrows.ASC} />
              </IconButton>
              <IconButton onClick={setDesc}>
                <ArrowDownwardIcon htmlColor={arrows.DESC} />
              </IconButton>
            </Box>
            <Box>
              <IconButton onClick={clearOrder}>
                <DeleteIcon htmlColor={ACTIVE_BTN} />
              </IconButton>
            </Box>
          </Box>
        )}
        <Box
          width={300}
          display="flex"
          flexDirection="row"
          bgcolor="background.paper"
        >
          <Box p={1} flexShrink={1}>
            <FormControl>
              <FormLabel component="legend">Filters:</FormLabel>
            </FormControl>

            {sepsis && (
              <Box mt={2}>
                <FormControl component="fieldset">
                  <FormLabel disabled component="legend">
                    Sepsis Flag:
                  </FormLabel>
                  <RadioGroup
                    name={'sepsis'}
                    value={
                      state.filter?.filterKey === 'sepsis'
                        ? state.filter?.filterDir
                        : ''
                    }
                    onChange={handleChangeSelect}
                    row
                  >
                    {FILTER_SEPSIS.map(item => {
                      const { id, name } = item;
                      return (
                        <RadioItem key={uniqid()} value={id} label={name} />
                      );
                    })}
                    <IconButton size="small" onClick={clearSepsis}>
                      <DeleteIcon htmlColor={ACTIVE_BTN} />
                    </IconButton>
                  </RadioGroup>
                </FormControl>
              </Box>
            )}
            {covid && (
              <Box mt={2}>
                <FormControl component="fieldset">
                  <FormLabel disabled component="legend">
                    COVID status:
                  </FormLabel>
                  <RadioGroup
                    name={'covid'}
                    value={
                      state.filter?.filterKey === 'covid'
                        ? state.filter?.filterDir
                        : ''
                    }
                    onChange={handleChangeSelect}
                    row
                  >
                    {FILTER_COVID.map(item => {
                      const { id, name } = item;
                      return (
                        <RadioItem key={uniqid()} value={id} label={name} />
                      );
                    })}
                    <IconButton size="small" onClick={clearCovid}>
                      <DeleteIcon htmlColor={ACTIVE_BTN} />
                    </IconButton>
                  </RadioGroup>
                </FormControl>
              </Box>
            )}
          </Box>
        </Box>

        <Box display="flex" flexDirection="row-reverse">
          <Box p={1}>
            {' '}
            <Button.Secondary variant="contained" onClick={handleFilterSort}>
              Apply
            </Button.Secondary>
          </Box>
          <Box p={1}>
            <Button.Primary variant="contained" onClick={clearAll}>
              Clear all
            </Button.Primary>
          </Box>
        </Box>
      </Box>
    );
  },
);
export default Sort;
