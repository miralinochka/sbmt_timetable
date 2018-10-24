import { FETCH_TIMETABLE } from './types';
import axios from 'axios';
import { parseString } from 'react-native-xml2js'

export const downloadTimetable = (groupOrLecturer) => async dispatch => {
  const query = groupOrLecturer.filename;
  console.log('query',query)
  console.log(`http://timetable.sbmt.by/shedule/group/${query}`)
  try {
    if(query[0]>=0 && query[0]<=9) {
      const {data} = await axios.get(`http://timetable.sbmt.by/shedule/group/${query}`);
      console.log('data',data)
    }
    // dispatch({
    //   type: FETCH_TIMETABLE,
    //   timetable
    // })
  } catch(e) {
    console.log('error', e)
  }
}
