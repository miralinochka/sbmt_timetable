import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import ShowTimetable from '@screens/ShowTimetable';


it('renders correctly', () => {
  const tree = renderer.create(
    <ShowTimetable />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
