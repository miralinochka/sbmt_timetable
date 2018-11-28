import React from 'react';
import {
  createBottomTabNavigator, createAppContainer, TabNavigator, createStackNavigator,
} from 'react-navigation';
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
import footerStyle from '@common/Footer';
import CustomHeader from './CustomHeader';

const renderHeaderText = (currentGroupOrLecturerName) => {
  if (currentGroupOrLecturerName) {
    if (currentGroupOrLecturerName[0] > 0) return `${currentGroupOrLecturerName} гр.`;
    return currentGroupOrLecturerName;
  }
  return 'Расписание занятий';
};

// const RouterComponent = ({ currentGroupOrLecturerName }) => (
//   <Router>
//     <Scene
//       key="root"
//       navBar={Header}
//       tabs
//       tabBarStyle={footerStyle.viewStyle}
//       showLabel={false}
//       transitionConfig={() => ({ screenInterpolator: screenProps => StackViewStyleInterpolator.forHorizontal(screenProps) })}
//     >
//       <Scene
//         key={sceneNames.searchTimetable.route}
//         icon={SearchIcon}
//         component={SearchTimetable}
//         headerText={sceneNames.searchTimetable.title}
//         refresh
//         back
//       />
//       <Scene
//         key={sceneNames.timetable.route}
//         icon={TimetableIcon}
//         component={ShowTimetable}
//         headerText={renderHeaderText(currentGroupOrLecturerName)}
//         showGroups
//         refresh
//         initial
//       />
//       <Scene
//         key={sceneNames.savedTimetable.route}
//         icon={BookmarkIcon}
//         component={SavedTimetable}
//         headerText={sceneNames.savedTimetable.title}
//         back
//       />
//       <Scene
//         key={sceneNames.sendFeedback.route}
//         icon={FeedbackIcon}
//         component={SendFeedback}
//         headerText={sceneNames.sendFeedback.title}
//         back
//       />
//     </Scene>
//   </Router>
// );

const headerDefaultNavigationConfig = {
  header: props => <CustomHeader {...props} />,
  headerStyle: {
    backgroundColor: 'transparent',
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 18,
    zIndex: 1,
    lineHeight: 23,
  },
  headerTintColor: '#fff',
};

const Search = createStackNavigator({
  Search: {
    screen: SearchTimetable,
    navigationOptions: {
      headerTitle: 'Tab 2 Screen',
    },
  },
},
{
  navigationOptions: {
    ...headerDefaultNavigationConfig,
  },
});

const AppNavigator = createBottomTabNavigator({
  SearchTimetable: Search,
  ShowTimetable: {
    screen: ShowTimetable,
    navigationOptions: () => ({
      title: 'fdfdf',
      tabBarIcon: () => <TimetableIcon />,
    }),
  },
  SavedTimetable: {
    screen: SavedTimetable,
    navigationOptions: () => ({
      tabBarIcon: () => <BookmarkIcon />,
    }),
  },
  SendFeedback: {
    screen: SendFeedback,
    navigationOptions: () => ({
      tabBarIcon: () => <FeedbackIcon />,
    }),
  },
},
{
  initialRouteName: 'ShowTimetable',
  tabBarOptions: {
    showLabel: false,
    style: footerStyle.viewStyle,
  },
  tabBarPosition: 'bottom',
  swipeEnabled: false,
});

// const mapStateToProps = state => ({
//   currentGroupOrLecturerName: state.timetable.currentGroupOrLecturer.groupOrLecturerName,
// });

// RouterComponent.defaultProps = {
//   currentGroupOrLecturerName: '',
// };

// RouterComponent.propTypes = {
//   currentGroupOrLecturerName: PropTypes.string,
// };

export default createAppContainer(AppNavigator);
