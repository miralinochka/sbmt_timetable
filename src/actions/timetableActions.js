import axios from 'axios';
import { FETCH_TIMETABLE, FETCH_TIMETABLE_ERROR, SET_CURRENT_TIMETABLE } from './types';

export const setTimetableError = error => ({
  type: FETCH_TIMETABLE_ERROR,
  error,
});

export const downloadTimetable = groupOrLecturer => async (dispatch) => {
  const groupOrLecturerFile = groupOrLecturer.filename;
  try {
    if (groupOrLecturerFile[0] >= 0 && groupOrLecturerFile[0] <= 9) {
      const { data } = await axios.get(`http://127.0.0.1:3000/parse?query=/shedule/group/${groupOrLecturerFile}`);
      console.log('data', data);
      const groupNumber = groupOrLecturer.number;
      const subgroups = data.schedule.lesson.map(item => item.subgroup).filter((subgr, index, array) => array.indexOf(subgr) === index);
      if (Object.values(data.schedule.lesson)[0]) {
        dispatch({
          type: FETCH_TIMETABLE,
          groupNumber,
          timetable: data.schedule.lesson,
          subgroups,
        });
      } else {
        dispatch(setTimetableError('Расписание не найдено:('));
      }
    }
  } catch (e) {
    console.log('error', e);
    dispatch(setTimetableError('Расписание не найдено:('));
  }
};
export const setCurrentTimetable = (groupNumber, timetable, subgroups) => ({
  type: SET_CURRENT_TIMETABLE,
  groupNumber,
  timetable,
  subgroups,
});
