import * as utils from '@utils';
import moment from 'moment';

describe('utils', () => {
  it('compares 2 numbers', () => {
    expect(utils.comparator({ number: 5 }, { number: 2 })).toBe(1);
    expect(utils.comparator({ number: 3 }, { number: 4 })).toBe(-1);
    expect(utils.comparator({ number: 1 }, { number: 1 })).toBe(0);
  });

  it('gets erliest timetable date', () => {
    const date = new Date().setDate(0);
    expect(utils.getEarliestTimetableDate({
      651: {
        timetable: {},
        createdOn: date,
        filename: 'q',
      },
      652: {
        timetable: {},
        createdOn: new Date().setDate(15),
        filename: 'q',
      },
      654: {
        timetable: {},
        createdOn: new Date().setDate(11),
        filename: 'q',
      },
    })).toBe(date);
  });

  it('gets erliest timetable', () => {
    const date = new Date().setDate(0);
    expect(utils.getEarliestTimetable({
      651: {
        timetable: {},
        createdOn: date,
        filename: 'q',
      },
      652: {
        timetable: {},
        createdOn: new Date().setDate(15),
        filename: 'q',
      },
      654: {
        timetable: {},
        createdOn: new Date().setDate(11),
        filename: 'q',
      },
    })).toBe('651');
  });

  it('gets subgroups', () => {
    expect(utils.getSubgroups([
      {
        date: '03.09.2018', day: 'Пн', time: '10:20', subgroup: 'вся группа',
      },
      {
        date: '03.09.2018', day: 'Пн', time: '10:20', subgroup: '1 подгруппа',
      },
      {
        date: '03.09.2018', day: 'Пн', time: '10:20', subgroup: '2 подгруппа',
      },
      {
        date: '03.09.2018', day: 'Пн', time: '10:20', subgroup: 'вся группа',
      },
      {
        date: '03.09.2018', day: 'Пн', time: '10:20', subgroup: '1 подгруппа',
      },
      {
        date: '03.09.2018', day: 'Пн', time: '10:20', subgroup: '2 подгруппа',
      },
    ])).toEqual(['вся группа', '1 подгруппа', '2 подгруппа']);
  });

  it('checks if it is a group', () => {
    expect(utils.checkIfGroup('1401.xml')).toBe(true);
    expect(utils.checkIfGroup('Buloichik.xml')).toBe(false);
  });

  it('shortens lecturer name', () => {
    expect(utils.shortenLecturerName('Мирончик Алина Александровна')).toBe('Мирончик А. А.');
    expect(utils.shortenLecturerName('Мирончик Алина')).toBe('Мирончик А.');
  });

  it('check valid email', () => {
    expect(utils.checkValidEmail('email@domain.com')).toBe(true);
    expect(utils.checkValidEmail('firstname.lastname@domain.com')).toBe(true);
    expect(utils.checkValidEmail('email@subdomain.domain.com')).toBe(true);
    expect(utils.checkValidEmail('email@123.123.123.123')).toBe(true);
    expect(utils.checkValidEmail('1234567890@domain.com')).toBe(true);
    expect(utils.checkValidEmail('email@domain-one.com')).toBe(true);
    expect(utils.checkValidEmail('_______@domain.com')).toBe(true);
    expect(utils.checkValidEmail('email@domain.co.jp')).toBe(true);
    expect(utils.checkValidEmail('firstname-lastname@domain.com')).toBe(true);

    expect(utils.checkValidEmail('plainaddress')).toBe(false);
    expect(utils.checkValidEmail('#@%^%#$@#$@#.com')).toBe(false);
    expect(utils.checkValidEmail('@domain.com')).toBe(false);
    expect(utils.checkValidEmail('Joe Smith <email@domain.com>')).toBe(false);
    expect(utils.checkValidEmail('email.domain.com')).toBe(false);
    expect(utils.checkValidEmail('email@domain@domain.com')).toBe(false);
    expect(utils.checkValidEmail('.email@domain.com')).toBe(false);
    expect(utils.checkValidEmail('email.@domain.com')).toBe(false);
    expect(utils.checkValidEmail('email..email@domain.com')).toBe(false);
    expect(utils.checkValidEmail('あいうえお@domain.com')).toBe(false);
    expect(utils.checkValidEmail('email@domain.com (Joe Smith)')).toBe(false);
    expect(utils.checkValidEmail('email@domain')).toBe(false);
    expect(utils.checkValidEmail('email@-domain.com')).toBe(false);
    expect(utils.checkValidEmail('email@111.222.333.44444')).toBe(false);
    expect(utils.checkValidEmail('email@domain..com')).toBe(false);
  });

  it('check unfilled feedback values', () => {
    expect(utils.checkUnfilledFeedbackValues({
      userName: '',
      email: '',
      subject: '',
      message: '',
    })).toBe(true);
    expect(utils.checkUnfilledFeedbackValues({
      userName: 'ds',
      email: 'ds',
      subject: 'ds',
      message: 'sd',
    })).toBe(false);
    expect(utils.checkUnfilledFeedbackValues({
      userName: '',
      email: 'ds',
      subject: '',
      message: '',
    })).toBe(true);
  });

  it('checks internet connection', () => {
    expect(utils.checkNoInternetConnection(null)).toEqual(false);
    expect(utils.checkNoInternetConnection(0)).toBe(true);
  });

  it('prints header text', () => {
    expect(utils.printHeaderText(null)).toBe('Расписание занятий');
    expect(utils.printHeaderText(undefined)).toBe('Расписание занятий');
    expect(utils.printHeaderText('')).toBe('Расписание занятий');
    expect(utils.printHeaderText('Мирончик А.')).toBe('Мирончик А.');
    expect(utils.printHeaderText('541')).toBe('541 гр.');
  });

  it('returns current timetable', () => {
    const date = moment().set({ month: 8, date: 10 });
    const timetable = [
      {
        building: 'Октябрьская',
        date: '03.09.2018',
        day: 'Пн',
        lecturer: 'Платонова Елена Павловна',
        room: '8а ',
        subgroup: 'вся группа',
        subject: 'Физическая культура',
        time: '10:20',
        type: 'Практика',
      },
      {
        building: 'Московская 5',
        date: '10.09.2018',
        day: 'Пн',
        lecturer: 'Гриневич Елена Георгиевна',
        room: '309',
      },
      {
        building: 'Московская 8',
        date: '10.09.2018',
        day: 'Пн',
        lecturer: 'Гриневич Елена Георгиевна',
        room: '309',
      },
      {
        building: 'Московская 6',
        date: '15.10.2018',
        day: 'Пн',
      },
    ];
    const timetableToEqual = [
      {
        building: 'Московская 5',
        date: '10.09.2018',
        day: 'Пн',
        lecturer: 'Гриневич Елена Георгиевна',
        room: '309',
      },
      {
        building: 'Московская 8',
        date: '10.09.2018',
        day: 'Пн',
        lecturer: 'Гриневич Елена Георгиевна',
        room: '309',
      },
    ];
    expect(utils.getCurrentTimetable(timetable, date)).toEqual(timetableToEqual);
    expect(utils.getCurrentTimetable(timetable, moment())).toEqual([]);
  });

  it('returns background color', () => {
    expect(utils.generateBackgroundColor(null)).toBe('#ffd966');
    expect(utils.generateBackgroundColor(undefined)).toBe('#ffd966');
    expect(utils.generateBackgroundColor('')).toBe('#ffd966');
    expect(utils.generateBackgroundColor('л')).toBe('#2b78e4');
    expect(utils.generateBackgroundColor('з')).toBe('#ff6666');
    expect(utils.generateBackgroundColor('э')).toBe('#ff6666');
    expect(utils.generateBackgroundColor('т')).toBe('#a39e9e');
    expect(utils.generateBackgroundColor('уср')).toBe('#a39e9e');
    expect(utils.generateBackgroundColor('кср')).toBe('#a39e9e');
    expect(utils.generateBackgroundColor('п')).toBe('#ffd966');
    expect(utils.generateBackgroundColor('дд')).toBe('#ffd966');
  });
});
