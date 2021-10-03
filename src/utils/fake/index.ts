import PATIENT_LIST, { searchByNameOrNhs } from './PatientList';
import ASSESSMENTS_RESULT from './AssessmentsResults';
import COVID_MANAGEMENT from './CovidMenagment';
import TASKS from './TasksList';
import { keysToCamel } from 'utils/formatters';
import { SortDir, SortKey } from 'app/containers/PatientList/types';

export const fake = {
  COVID_MANAGEMENT,
  PATIENT_LIST: keysToCamel(PATIENT_LIST),
  ASSESSMENTS_RESULT,
  TASKS,
};

enum ExtendedSortKey {
  news2,
  denwis,
}

export { searchByNameOrNhs };
const checkByASC = (a, b, key) => {
  const aAssessment =
    key === ExtendedSortKey.news2
      ? a[`${key}`]?.score?.totalScore
      : a[`${key}`]?.value;
  const bAssessment =
    key === ExtendedSortKey.news2
      ? b[`${key}`]?.score?.totalScore
      : b[`${key}`]?.value;

  if (aAssessment && !bAssessment) {
    return true;
  }
  if (!aAssessment && bAssessment) {
    return false;
  }
  if (aAssessment && bAssessment) {
    return aAssessment > bAssessment;
  }
  return false;
};

const checkOrder = (a, b, sort) => {
  const { sortKey, sortDir } = sort;
  const ASC = 'asc';
  const sortedASC = checkByASC(a, b, sortKey);
  return sortDir === ASC ? sortedASC : !sortedASC;
};

const sortByAsssessmentValue = (unsorted, sort) =>
  unsorted.reduce((sorted, el) => {
    let index = 0;
    while (index < sorted.length && checkOrder(el, sorted[index], sort))
      index++;
    sorted.splice(index, 0, el);
    return sorted;
  }, []);

const checkOrderByAge = (a, b, order) => {
  const sortedASC = a.birthdate > b.birthdate;
  return order === SortDir.ASC ? sortedASC : !sortedASC;
};

const sortByAge = (unsorted, order) =>
  unsorted.reduce((sorted, el) => {
    let index = 0;
    while (index < sorted.length && checkOrderByAge(el, sorted[index], order))
      index++;
    sorted.splice(index, 0, el);
    return sorted;
  }, []);

const removePrefix = name => {
  const splitedName = name.split(' ');
  splitedName.shift();
  return splitedName.join(' ');
};
const sortByName = unsorted =>
  Array.from(unsorted).sort((a: any, b: any) => {
    const aName = removePrefix(a.name);
    const bName = removePrefix(b.name);
    return aName.toString().localeCompare(bName);
  });

export const sort = (
  arrayToSort,
  params: { sortKey: SortKey & ExtendedSortKey; sortDir: SortDir },
) => {
  const { sortKey, sortDir } = params;
  if (sortKey === 'news2' || sortKey === 'denwis') {
    return sortByAsssessmentValue(
      arrayToSort.filter(item => item[params.sortKey]),
      params,
    );
  }
  if (sortKey === SortKey.NAME) {
    const sorted = sortByName(arrayToSort);
    return sortDir === SortDir.ASC ? sorted : sorted.reverse();
  }
  if (sortKey === SortKey.BIRTH_DATE) {
    return sortByAge(arrayToSort, sortDir);
  }
  return arrayToSort;
};

const filterSepis = (arrayToFiltr, flag) =>
  arrayToFiltr.filter(el => el?.sepsis?.value === flag);

const filterDenwis = arrayToFiltr =>
  arrayToFiltr.filter(el => el?.denwis?.value > 4);

const filterCovid = (arrayToFiltr, flag) =>
  arrayToFiltr.filter(el => el?.covid?.suspectedCovidStatus === flag);

export const applayFilters = (arrayToFiltr, parmas) => {
  const { filterKey, filterDir } = parmas;
  const items = JSON.parse(JSON.stringify(arrayToFiltr));
  if (filterKey === 'sepsis') {
    return filterSepis(items, filterDir);
  }
  if (filterKey === 'denwis') {
    return filterDenwis(items);
  }
  if (filterKey === 'covid') {
    return filterCovid(items, filterDir);
  }
  return items;
};
