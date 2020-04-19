import React, { Component } from 'react';
import {
  Text, TouchableOpacity, View, SafeAreaView, Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from '@actions';
import ContainerItem from '../ContainerItem';
import Container from '../Container';
import ActionIcon from './ActionIcon';
import styles from './styles';
import { sceneNames } from '@constants';

export const eventTypes = {
  SEND_FEEDBACK: 'SEND_FEEDBACK',
};

class Header extends Component {
  static eventTypes = eventTypes;

  static subscribers = {};

  static subscribe(cb, event) {
    if (typeof cb !== 'function') {
      throw new Error('cb is not a function!');
    }
    if (!eventTypes[event]) {
      throw new Error(`not supported event type ${event}`);
    }
    Header.subscribers[event] = cb;
  }

  static unsubscribe(event) {
    if (!eventTypes[event]) {
      throw new Error(`not supported event type ${event}`);
    }
    Header.subscribers[event] = undefined;
  }

  state = {
    visibleGroupView: false,
  }

  createEvent = (event) => {
    if (typeof Header.subscribers[event] === 'function') {
      Header.subscribers[event]();
    }
  };

  changeTimetableView = (currentSubgroup) => {
    const { setCurrentSubgroup } = this.props;
    setCurrentSubgroup(currentSubgroup);
    this.setState({ visibleGroupView: false });
  };

  renderGroups = () => {
    const { subgroups } = this.props;
    if (Platform.OS === 'ios') {
      return subgroups.map(subgroup => (
        <ContainerItem key={subgroup}>
          <TouchableOpacity onPress={() => this.changeTimetableView(subgroup)}>
            <Text>{subgroup}</Text>
          </TouchableOpacity>
        </ContainerItem>
      ));
    }
    return null;
  };

  renderShortSubgroupName = (currentSubgroup) => {
    if (currentSubgroup !== '' && currentSubgroup !== 'вся группа') {
      const textString = `, ${currentSubgroup[0]} подгр.`;
      return (
        <Text style={styles.title}>{textString}</Text>
      );
    }
    return null;
  }

  changeGroupView = () => this.setState(prev => ({ visibleGroupView: !prev.visibleGroupView }));

  onGroupButtonPress = () => {
    if (Platform.OS === 'ios') {
      return this.changeGroupView();
    }
    const { subgroups, currentSubgroup, setCurrentSubgroup } = this.props;
    if (currentSubgroup) {
      const subIndex = subgroups.indexOf(currentSubgroup);
      if (subIndex !== subgroups.length - 1) {
        return setCurrentSubgroup(subgroups[subIndex + 1]);
      }
      return setCurrentSubgroup(subgroups[0]);
    }
    return setCurrentSubgroup(subgroups[1]);
  }

  onRefreshButtonPress = async () => {
    const {
      downloadTimetable,
      currentGroupOrLecturer,
      initialRouteName,
      addGroupsAndLecturers,
    } = this.props;
    if (initialRouteName === sceneNames.searchTimetable.name) {
      await addGroupsAndLecturers();
    } else {
      await downloadTimetable(currentGroupOrLecturer, new Date());
    }
  }

  onTickButtonPress = async () => this.createEvent(eventTypes.SEND_FEEDBACK);

  onBackButtonPress = () => Actions.timetable();

  render() {
    const {
      headerText, showGroups, back, subgroups, refresh, initialRouteName, currentSubgroup,
    } = this.props;
    const {
      title,
      view,
      safeArea,
      hiddenIcon,
      backIcon,
      headerTextView,
      leftButton,
      groupViewStyle,
      rightButton,
    } = styles;
    const { visibleGroupView } = this.state;
    return (
      <SafeAreaView style={safeArea}>
        <View style={view}>
          {
          showGroups && (
            <ActionIcon
              icon={require('@images/groups.png')} // eslint-disable-line global-require
              hideIcon={(subgroups.length < 2) && hiddenIcon}
              onIconPress={this.onGroupButtonPress}
              disabled={subgroups.length <= 2}
              styled={leftButton}
              testID="subgroupButton"
            />
          )
        }
          { visibleGroupView
          && (
          <Container styled={groupViewStyle}>
            {this.renderGroups()}
          </Container>
          )}
          {
          back && (
            <ActionIcon
              icon={require('@images/back.png')} // eslint-disable-line
              backIcon={backIcon}
              styled={leftButton}
              onIconPress={this.onBackButtonPress}
              testID="backButton"
            />
          )
        }
          <View style={headerTextView}>
            <Text style={title}>{headerText}</Text>
            {initialRouteName === sceneNames.timetable.name
            && this.renderShortSubgroupName(currentSubgroup)}
          </View>

          {
            initialRouteName === sceneNames.sendFeedback.name
              ? (
                <ActionIcon
                  icon={require('@images/tick.png')} // eslint-disable-line
                  onIconPress={this.onTickButtonPress}
                  styled={rightButton}
                  testID="tickButton"
                />
              )
              : (
                <ActionIcon
                  icon={require('@images/refresh.png')} // eslint-disable-line
                  hideIcon={!refresh && hiddenIcon}
                  onIconPress={this.onRefreshButtonPress}
                  disabled={initialRouteName === sceneNames.savedTimetable.name}
                  styled={initialRouteName !== sceneNames.savedTimetable.name ? rightButton : {}}
                  testID="refreshButton"
                />
              )
          }
        </View>
      </SafeAreaView>
    );
  }
}

Header.defaultProps = {
  showGroups: null,
  back: null,
  refresh: null,
  currentSubgroup: '',
};

Header.propTypes = {
  headerText: PropTypes.string.isRequired,
  showGroups: PropTypes.bool,
  back: PropTypes.bool,
  refresh: PropTypes.bool,
  subgroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentSubgroup: PropTypes.string,
  initialRouteName: PropTypes.string.isRequired,
  setCurrentSubgroup: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  subgroups: state.timetable.currentGroupOrLecturer.subgroups,
  currentSubgroup: state.timetable.currentGroupOrLecturer.currentSubgroup,
  currentGroupOrLecturer: state.timetable.currentGroupOrLecturer,
});

const mapDispatchToProps = {
  downloadTimetable: actions.downloadTimetable,
  addGroupsAndLecturers: actions.addGroupsAndLecturers,
  setCurrentSubgroup: actions.setCurrentSubgroup,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
