import React, { Component } from 'react';
import {
  Text, TouchableOpacity, View, Image, SafeAreaView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import ContainerItem from '../ContainerItem';
import Container from '../Container';
import * as actions from '../../../../actions';
import styles from './styles';

const ActionIcon = ({
 icon, onIconPress, hiddenIcon, backIcon 
}) => (
  <TouchableOpacity onPress={onIconPress} style={styles.icon}>
    <Image
      style={[styles.icon, backIcon, hiddenIcon]}
      source={icon}
    />
  </TouchableOpacity>
);

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
    const { downloadTimetable, currentGroupOrLecturer } = this.props;
    await downloadTimetable(currentGroupOrLecturer);
  }

  render() {
    const {
 headerText, showIcons, back, subgroups 
} = this.props;
    const {
      title, view, safeArea, hiddenIcon, backIcon, groupViewStyle,
    } = styles;
    const { visibleGroupView } = this.state;
    return (
      <SafeAreaView style={safeArea}>
        <View style={view}>
          {
          showIcons && (
            <ActionIcon
              icon={require('../../../../images/groups.png')}
              hiddenIcon={(!subgroups || subgroups.length < 2) && hiddenIcon}
              onIconPress={subgroups && this.changeGroupView}
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
              icon={require('../../../../images/back.png')}
              backIcon={backIcon}
              onIconPress={() => { Actions.timetable(); }}
            />
          )
        }
          <Text style={title}>{headerText}</Text>
          <ActionIcon
            icon={require('../../../../images/refresh-button.png')}
            hiddenIcon={back && hiddenIcon}
            onIconPress={this.onRefreshButtonClick}
          />
        </View>
      </SafeAreaView>
    );
  }
}


const mapStateToProps = state => ({
  subgroups: state.currentGroupOrLecturer.subgroups,
  currentGroupOrLecturer: state.currentGroupOrLecturer,
});

const mapDispatchToProps = {
  downloadTimetable: actions.downloadTimetable,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
