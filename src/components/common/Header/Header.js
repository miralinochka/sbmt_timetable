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

  changeTimetableView = (subgroup) => {
    Actions.reset('_timetable', { subgroup });
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

  renderShortSubgroupName = (subgroup) => {
    if (subgroup !== '' && subgroup !== 'вся группа') {
      const textString = `, ${subgroup[0]} подгр.`;
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
    const { subgroups, subgroup } = this.props;
    if (subgroup) {
      const subIndex = subgroups.indexOf(subgroup);
      if (subIndex !== subgroups.length - 1) {
        return Actions.refresh({ subgroup: subgroups[subIndex + 1] });
      }
      return Actions.refresh({ subgroup: subgroups[0] });
    }
    return Actions.refresh({ subgroup: subgroups[1] });
  }

  onRefreshButtonPress = async () => {
    const {
      downloadTimetable,
      currentGroupOrLecturer,
      toggleSpinner,
      initialRouteName,
      addGroupsAndLecturers,
    } = this.props;
    toggleSpinner(true);
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
      headerText, showGroups, back, subgroups, refresh, initialRouteName, subgroup,
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
            />
          )
        }
          <View style={headerTextView}>
            <Text style={title}>{headerText}</Text>
            {this.renderShortSubgroupName(subgroup)}
          </View>

          {
            initialRouteName === sceneNames.sendFeedback.name
              ? (
                <ActionIcon
                  icon={require('@images/tick.png')} // eslint-disable-line
                  onIconPress={this.onTickButtonPress}
                  styled={rightButton}
                />
              )
              : (
                <ActionIcon
                  icon={require('@images/refresh.png')} // eslint-disable-line
                  hideIcon={!refresh && hiddenIcon}
                  onIconPress={this.onRefreshButtonPress}
                  disabled={initialRouteName === sceneNames.savedTimetable.name}
                  styled={initialRouteName !== sceneNames.savedTimetable.name ? rightButton : {}}
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
  subgroup: '',
};

Header.propTypes = {
  headerText: PropTypes.string.isRequired,
  showGroups: PropTypes.bool,
  back: PropTypes.bool,
  refresh: PropTypes.bool,
  subgroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  subgroup: PropTypes.string,
  initialRouteName: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  subgroups: state.timetable.currentGroupOrLecturer.subgroups,
  currentGroupOrLecturer: state.timetable.currentGroupOrLecturer,
});

const mapDispatchToProps = {
  downloadTimetable: actions.downloadTimetable,
  addGroupsAndLecturers: actions.addGroupsAndLecturers,
  toggleSpinner: actions.toggleSpinner,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
