import { isDate, isNumber, isString } from 'lodash';

export const validateGramSabhaRecord = (record) => {
  const { year, date, membersPresent, membersAbsent, remarks } = record;

  if (!isNumber(year) || year < 2000 || year > new Date().getFullYear()) {
    return { valid: false, message: 'Year must be a valid number between 2000 and the current year.' };
  }

  if (!isDate(new Date(date))) {
    return { valid: false, message: 'Date must be a valid date string.' };
  }

  if (!isNumber(membersPresent) || membersPresent < 0) {
    return { valid: false, message: 'Members present must be a non-negative number.' };
  }

  if (!isNumber(membersAbsent) || membersAbsent < 0) {
    return { valid: false, message: 'Members absent must be a non-negative number.' };
  }

  if (!isString(remarks) || remarks.trim().length === 0) {
    return { valid: false, message: 'Remarks must be a non-empty string.' };
  }

  return { valid: true, message: 'Record is valid.' };
};