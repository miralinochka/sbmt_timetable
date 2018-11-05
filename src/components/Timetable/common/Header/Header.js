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
    const { downloadTimetable, currentGroupOrLecturer, toggleSpinner } = this.props;
    toggleSpinner(true);
    await downloadTimetable(currentGroupOrLecturer);
  }

  render() {
    const {
      headerText, showIcons, back, subgroups,
    } = this.props;
    const {
      title, view, safeArea, hiddenIcon, backIcon, groupViewStyle,
    } = styles;
    const { visibleGroupView } = this.state;
    console.log('header props', this.props)
    return (
      <SafeAreaView style={safeArea}>
        <View style={view}>
          {
          showIcons && (
            <ActionIcon
              icon={require('../../../../images/groups.png')} // eslint-disable-line global-require
              hideIcon={(subgroups.length < 2) && hiddenIcon}
              onIconPress={(subgroups.length > 2) && this.changeGroupView}
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
          <ActionIcon
            icon={require('../../../../images/refresh-button.png')} // eslint-disable-line
            hideIcon={back && hiddenIcon}
            onIconPress={this.onRefreshButtonClick}
          />
        </View>
      </SafeAreaView>
    );
  }
}

Header.defaultProps = {
  showIcons: null,
  back: null,
};

Header.propTypes = {
  headerText: PropTypes.string.isRequired,
  showIcons: PropTypes.bool,
  back: PropTypes.bool,
  subgroups: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = state => ({
  subgroups: state.currentGroupOrLecturer.subgroups,
  currentGroupOrLecturer: state.currentGroupOrLecturer,
});

const mapDispatchToProps = {
  downloadTimetable: actions.downloadTimetable,
  toggleSpinner: actions.toggleSpinner,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
