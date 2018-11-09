import React, { Component } from 'react';
import {
  Text, TouchableOpacity, View, SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import ContainerItem from '../ContainerItem';
import Container from '../Container';
import ActionIcon from './ActionIcon';
import * as actions from '../../../../actions';
import styles from './styles';

class Header extends Component {
  state = {
    visibleGroupView: false,
  }

  changeTimetableView = (subgroup) => {
    Actions.refresh({ subgroup });
    this.setState({ visibleGroupView: false });
  };

  renderGroups = () => {
    const { subgroups } = this.props;
    return subgroups.map(subgroup => (
      <ContainerItem key={subgroup}>
        <TouchableOpacity onPress={() => this.changeTimetableView(subgroup)}>
          <Text>{subgroup}</Text>
        </TouchableOpacity>
      </ContainerItem>
    ));
  };

  changeGroupView = () => {
    this.setState(prev => ({ visibleGroupView: !prev.visibleGroupView }));
  }

  onRefreshButtonClick = async () => {
    const {
      downloadTimetable, currentGroupOrLecturer, toggleSpinner, initialRouteName, addGroupsAndLecturers,
    } = this.props;
    toggleSpinner(true);
    if (initialRouteName === '_searchTimetable') {
      console.log('add groups');
      await addGroupsAndLecturers();
    } else {
      console.log('download tt');
      await downloadTimetable(currentGroupOrLecturer);
    }
    toggleSpinner(false);
  }

  onTickButtonClick = () => {
    const { toggleModal } = this.props;
    toggleModal(true);
  }

  render() {
    const {
      headerText, showGroups, back, subgroups, refresh, initialRouteName,
    } = this.props;
    const {
      title, view, safeArea, hiddenIcon, backIcon, groupViewStyle,
    } = styles;
    const { visibleGroupView } = this.state;
    console.log('header props', this.props);
    return (
      <SafeAreaView style={safeArea}>
        <View style={view}>
          {
          showGroups && (
            <ActionIcon
              icon={require('../../../../images/groups.png')} // eslint-disable-line global-require
              hideIcon={(subgroups.length < 2) && hiddenIcon}
              onIconPress={this.changeGroupView}
              disabled={subgroups.length <= 2}
            />
          )
        }
          { visibleGroupView
        && (
        <Container styled={groupViewStyle}>
          {
          this.renderGroups()
          }
        </Container>
        )
      }
          {
          back && (
            <ActionIcon
              icon={require('../../../../images/back.png')} // eslint-disable-line
              backIcon={backIcon}
              onIconPress={() => { Actions.timetable(); }}
            />
          )
        }
          <Text style={title}>{headerText}</Text>
          {
            initialRouteName === '_sendFeedback'
              ? (
                <ActionIcon
                  icon={require('../../../../images/tick.png')} // eslint-disable-line
                  onIconPress={this.onTickButtonClick}
                />
              )
              : (
                <ActionIcon
                  icon={require('../../../../images/refresh.png')} // eslint-disable-line
                  hideIcon={!refresh && hiddenIcon}
                  onIconPress={this.onRefreshButtonClick}
                  disabled={initialRouteName === '_savedTimetable'}
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
};

Header.propTypes = {
  headerText: PropTypes.string.isRequired,
  showGroups: PropTypes.bool,
  back: PropTypes.bool,
  refresh: PropTypes.bool,
  subgroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  initialRouteName: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  subgroups: state.currentGroupOrLecturer.subgroups,
  currentGroupOrLecturer: state.currentGroupOrLecturer,
});

const mapDispatchToProps = {
  downloadTimetable: actions.downloadTimetable,
  addGroupsAndLecturers: actions.addGroupsAndLecturers,
  toggleSpinner: actions.toggleSpinner,
  toggleModal: actions.toggleModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
