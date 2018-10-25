import { FETCH_TIMETABLE } from './types';
import axios from 'axios';
const parseString = require('react-native-xml2js').parseString;


export const downloadTimetable = (groupOrLecturer) =>  dispatch => {
  const query = groupOrLecturer.filename;
  console.log('query',query)
  console.log(`http://timetable.sbmt.by/shedule/group/${query}`)
  // try {
  //   if(query[0]>=0 && query[0]<=9) {
  //     const res = await fetch(`http://timetable.sbmt.by/shedule/group/${query}`);
  //     const textRes = res.text();
  //     parseString(textRes, (err, result) => {
  //       console.log(result)
  //     })
    
  //   }
  //   // dispatch({
  //   //   type: FETCH_TIMETABLE,
  //   //   timetable
  //   // })
  // } catch(e) {
  //   console.log('error', e)
  // }
  if(query[0]>=0 && query[0]<=9) {
  fetch(`http://timetable.sbmt.by/shedule/group/${query}`)
  .then(res => res.text() && console.log(res))
  .then(res => {
    console.log(res)
    parseString(res, (err, result) => {
      console.log(result)
  });
})
  }
}

