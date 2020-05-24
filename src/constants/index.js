export const sceneNames = {
  timetable: { route: 'timetable', name: '_timetable', title: 'Расписание занятий' },
  searchTimetable: { route: 'searchTimetable', name: '_searchTimetable', title: 'Найти расписание' },
  savedTimetable: { route: 'savedTimetable', name: '_savedTimetable', title: 'Сохраненное расписание' },
  sendFeedback: { route: 'sendFeedback', name: '_sendFeedback', title: 'Напишите нам' },
};

export const weekdays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
export const monthArray = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];
export const feedbackSubjects = [
  {
    label: 'Оценка',
    value: 'Оценка',
  },
  {
    label: 'Рекомендация',
    value: 'Рекомендация',
  },
  {
    label: 'Баг',
    value: 'Баг',
  },
];

export const gestureConfig = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};

export const noTimetableFound = 'Нет занятий';
export const noTimetableError = 'Расписание не найдено :(';

export const searchItems = {
  group: 'Группа',
  lecturer: 'Преподаватель',
};
