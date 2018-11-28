import React from 'react';
import {
  createBottomTabNavigator, TabNavigator, createStackNavigator,
} from 'react-navigation';
// import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator'
import ShowTimetable from '@screens/ShowTimetable';
import SearchTimetable from '@screens/SearchTimetable';
import SavedTimetable from '@screens/SavedTimetable';
import SendFeedback from '@screens/SendFeedback';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sceneNames } from '@constants';
import {
  SearchIcon, TimetableIcon, BookmarkIcon, FeedbackIcon,
} from '@common/TabIcons';
import Header from '@common/Header';
import footerStyle from '@common/Footer';
import colors from '@styles/colors';

// const renderHeaderText = (currentGroupOrLecturerName) => {
//   if (currentGroupOrLecturerName) {
//     if (currentGroupOrLecturerName[0] > 0) return `${currentGroupOrLecturerName} гр.`;
//     return currentGroupOrLecturerName;
//   }
//   return 'Расписание занятий';
// };

const Tabs = createBottomTabNavigator({
  // ShowTimetable: createStackNavigator({ShowTimetable}),
  // SearchTimetable: createStackNavigator({SearchTimetable}),
  // SavedTimetable: createStackNavigator({SavedTimetable}),
  // SendFeedback: createStackNavigator({SendFeedback}),
  ShowTimetable,
  SearchTimetable,
  SavedTimetable,
  SendFeedback,
},
{
  initialRouteName: 'ShowTimetable',
  tabBarOptions: {
    showLabel: false,
    style: footerStyle.viewStyle,
  },
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  navigationOptions: ({ navigation }) => ({
    header: props => <Header {...props} />,
    tabBarIcon: () => {
      const { routeName } = navigation.state;
      switch (routeName) {
        case 'SearchTimetable':
          return <SearchIcon />;
        case 'ShowTimetable':
          return <TimetableIcon />;
        case 'SavedTimetable':
          return <BookmarkIcon />;
        default:
          return <FeedbackIcon />;
      }
    },
  }),
});

Tabs.navigationOptions = ({ navigation }) => {
  let title;
  const focusedRouteName = navigation.state.routes[navigation.state.index].routeName;
  switch (focusedRouteName) {
    case 'SearchTimetable':
      title = 'Найти расписание';
      break;
    case 'ShowTimetable':
      title = 'Расписание занятий';
      break;
    case 'SavedTimetable':
      title = 'Сохраненное расписание';
      break;
    default:
      title = 'Напишите нам';
      break;
  }
  return {
    title,
  };
};

// const mapStateToProps = state => ({
//   currentGroupOrLecturerName: state.timetable.currentGroupOrLecturer.groupOrLecturerName,
// });

// RouterComponent.defaultProps = {
//   currentGroupOrLecturerName: '',
// };

// RouterComponent.propTypes = {
//   currentGroupOrLecturerName: PropTypes.string,
// };

export default createStackNavigator(
  {
    Tabs,
  },
  {
    headerMode: 'screen',
    navigationOptions: ({ navigation }) => console.log(navigation) || ({
      header: props => console.log(props) || <Header {...props} />,
    }),
  },
);

// export default Tabs;
