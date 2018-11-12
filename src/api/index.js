import axios from 'axios';

export const fetchAllGroupsTimetable = async () => {
  const { data } = await axios.get('http://timetable.sbmt.by/groups/');
  return data;
};

export const fetchAllLecturersTimetable = async () => {
  const { data } = await axios.get('http://timetable.sbmt.by/lecturers/');
  return data;
};

export const getGroupTimetable = async (groupFile) => {
  const { data } = await axios.get(`https://salty-inlet-18567.herokuapp.com/parse?query=/shedule/group/${groupFile}`);
  return data.schedule.lesson;
};

export const getLecturerTimetable = async (lecturerFile) => {
  const { data } = await axios.get(`https://salty-inlet-18567.herokuapp.com/parse?query=/shedule/lecturer/${lecturerFile}`);
  return data.lecturer.lesson;
};

export const postFeedback = (userFeedback) => {
  axios.post('https://salty-inlet-18567.herokuapp.com/feedback/send', userFeedback);
};
