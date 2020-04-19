import axios from 'axios';
import config from '../config/config.json';

export const fetchAllGroupsTimetable = async () => {
  const { data } = await axios.get(`${config.baseApi}${config.query.groupsTimetableQuery}`);
  return data;
};

export const fetchAllLecturersTimetable = async () => {
  const { data } = await axios.get(`${config.baseApi}${config.query.lecturersTimetableQuery}`);
  return data;
};

export const getGroupTimetable = async (groupFile) => {
  const { data } = await axios.get(`${config.baseApi}${config.query.groupXmlTimetableQuery}/${groupFile}`);
  return data;
};

export const getLecturerTimetable = async (lecturerFile) => {
  const { data } = await axios.get(`${config.baseApi}${config.query.lecturerXmlTimetableQuery}/${lecturerFile}`);
  return data;
};

export const sendFeedback = userFeedback => axios.post(`${config.serverApi}${config.query.sendFeedbackQuery}`, userFeedback);
