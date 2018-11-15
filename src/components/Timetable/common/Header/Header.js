import React, { Component } from 'react';
import {
  Text, TouchableOpacity, View, SafeAreaView, Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from '@src/actions';
import ContainerItem from '../ContainerItem';
import Container from '../Container';
import ActionIcon from './ActionIcon';
import styles from './styles';

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
    Actions.refresh({ subgroup });
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

  changeGroupView = () => {
    this.setState(prev => ({ visibleGroupView: !prev.visibleGroupView }));
  }

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
    if (initialRouteName === '_searchTimetable') {
      await addGroupsAndLecturers();
    } else {
      await downloadTimetable(currentGroupOrLecturer);
    }
    toggleSpinner(false);
  }

  onTickButtonPress = async () => {
    this.createEvent(eventTypes.SEND_FEEDBACK);
  }

  onBackButtonPress = () => {
    Actions.timetable();
  }

  render() {
    const {
      headerText, showGroups, back, subgroups, refresh, initialRouteName, subgroup,
    } = this.props;
    const {
      title, view, safeArea, hiddenIcon, backIcon, headerTextView,
    } = styles;
    const { visibleGroupView } = this.state;
    return (
      <SafeAreaView style={safeArea}>
        <View style={view}>
          {
          showGroups && (
            <ActionIcon
              icon={require('@src/images/groups.png')} // eslint-disable-line global-require
              hideIcon={(subgroups.length < 2) && hiddenIcon}
              onIconPress={this.onGroupButtonPress}
              disabled={subgroups.length <= 2}
              styled={styles.leftButton}
            />
          )
        }
          { visibleGroupView
          && (
          <Container styled={styles.groupViewStyle}>
            {this.renderGroups()}
          </Container>
          )}
          {
          back && (
            <ActionIcon
              icon={require('@src/images/back.png')} // eslint-disable-line
              backIcon={backIcon}
              styled={styles.leftButton}
              onIconPress={this.onBackButtonPress}
            />
          )
        }
          <View style={headerTextView}>
            <Text style={title}>{headerText}</Text>
            {subgroup !== '' && subgroup !== 'вся группа' && (
            <Text style={title}>
,
              {' '}
              {subgroup[0]}
              {' '}
подгр.
            </Text>
            )}
          </View>

          {
            initialRouteName === '_sendFeedback'
              ? (
                <ActionIcon
                  icon={require('@src/images/tick.png')} // eslint-disable-line
                  onIconPress={this.onTickButtonPress}
                  styled={styles.rightButton}
                />
              )
              : (
                <ActionIcon
                  icon={require('@src/images/refresh.png')} // eslint-disable-line
                  hideIcon={!refresh && hiddenIcon}
                  onIconPress={this.onRefreshButtonPress}
                  disabled={initialRouteName === '_savedTimetable'}
                  styled={initialRouteName !== '_savedTimetable' ? styles.rightButton : {}}
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
