import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Bangkok');

export const tzDayjs = dayjs.tz;

export function todayString() {
  return tzDayjs().toDate().toISOString();
}

export function today() {
  return tzDayjs().toDate();
}
