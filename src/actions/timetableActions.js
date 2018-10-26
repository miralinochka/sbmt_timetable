import { FETCH_TIMETABLE, FETCH_TIMETABLE_ERROR } from './types';
import axios from 'axios';


export const downloadTimetable = (groupOrLecturer) => async dispatch => {
  const groupOrLecturerFile = groupOrLecturer.filename;
  try {
    if(groupOrLecturerFile[0]>=0 && groupOrLecturerFile[0]<=9) {
      const { data } = await axios.get(`http://127.0.0.1:3000/parse?query=/shedule/group/${groupOrLecturerFile}`);
      console.log('data', data)
      const groupNumber = groupOrLecturer.number;
      if(Object.values(data.schedule.lesson)[0]) {
        dispatch({
          type: FETCH_TIMETABLE,
          groupNumber,
          timetable: data.schedule.lesson
        })
      } else {
        dispatch({
          type: FETCH_TIMETABLE_ERROR,
          error: 'Расписание не найдено:('
        })
      }
    }
  } catch(e) {
    console.log('error', e)
    dispatch({
      type: FETCH_TIMETABLE_ERROR,
      error: 'Расписание не найдено:('
    })
  }
}

