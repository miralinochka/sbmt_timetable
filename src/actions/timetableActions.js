import axios from 'axios';
import { FETCH_TIMETABLE, FETCH_TIMETABLE_ERROR, SET_CURRENT_TIMETABLE } from './types';

export const setTimetableError = error => ({
  type: FETCH_TIMETABLE_ERROR,
  error,
});

export const downloadTimetable = groupOrLecturer => async (dispatch) => {
  console.log('groupOrLecturer', groupOrLecturer);
  const groupOrLecturerFile = groupOrLecturer.filename;
  let groupOrLecturerName;
  let subgroups = [];
  let timetable = [];
  try {
    if (groupOrLecturerFile[0] >= 0 && groupOrLecturerFile[0] <= 9) {
      const { data } = await axios.get(`http://127.0.0.1:3000/parse?query=/shedule/group/${groupOrLecturerFile}`);
      groupOrLecturerName = groupOrLecturer.number || groupOrLecturer.name;
      timetable = data.schedule.lesson;
      subgroups = timetable.map(item => item.subgroup).filter((subgr, index, array) => array.indexOf(subgr) === index);
    } else {
      const { data } = await axios.get(`http://127.0.0.1:3000/parse?query=/shedule/lecturer/${groupOrLecturerFile}`);
      const lecturerNameArray = groupOrLecturer.name.trim().split(' ');
      groupOrLecturerName = lecturerNameArray[2] ? `${lecturerNameArray[0]} ${lecturerNameArray[1][0]}. ${lecturerNameArray[2][0]}.` : `${lecturerNameArray[0]} ${lecturerNameArray[1][0]}.`;
      timetable = data.lecturer.lesson;
    }
    console.log('data', timetable);
    if (Object.values(timetable)[0]) {
      dispatch({
        type: FETCH_TIMETABLE,
        groupOrLecturer: groupOrLecturerName,
        timetable: timetable.length ? timetable : [timetable],
        filename: groupOrLecturerFile,
        subgroups,
      });
    } else {
      dispatch(setTimetableError('Расписание не найдено:('));
    }
  } catch (e) {
    console.log('error', e);
    dispatch(setTimetableError('Расписание не найдено:('));
  }
};
export const setCurrentTimetable = (groupOrLecturer, timetable, subgroups, filename) => ({
  type: SET_CURRENT_TIMETABLE,
  groupOrLecturer,
  timetable,
  subgroups,
  filename,
});
