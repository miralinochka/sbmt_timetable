import React, { Component } from 'react';
import {
  Text, TouchableOpacity, View, Image, SafeAreaView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import colors from '../../../colors';
import { CardItem, Card } from '../common';

const ActionIcon = ({ icon, onIconPress, iconStyle }) => (
  <TouchableOpacity onPress={onIconPress}>
    <Image
      style={iconStyle}
      source={icon}
    />
  </TouchableOpacity>
);

class Header extends Component {
  state = {
    visibleGroupView: false,
  }

  changeTimetableView = (subgroup) => {
    console.log('subgroup', subgroup);
    Actions.timetable({ subgroup });
    this.changeGroupView();
  };

  renderGroups = () => {
    const { subgroups } = this.props;
    return subgroups.map(subgroup => (
      <CardItem key={subgroup}>
        <TouchableOpacity onPress={() => this.changeTimetableView(subgroup)}>
          <Text>{subgroup}</Text>
        </TouchableOpacity>
      </CardItem>
    ));
  };

  changeGroupView = () => {
    this.setState(prev => ({ visibleGroupView: !prev.visibleGroupView }));
  }

  render() {
    const { headerText, showIcons, back } = this.props;
    const {
      title, view, safeArea, icon, hiddenIcon, backIcon, groupViewStyle,
    } = styles;
    const { visibleGroupView } = this.state;
    return (
      <SafeAreaView style={safeArea}>
        <View style={view}>
          {
          showIcons && (
            <ActionIcon
              icon={require('../../../images/groups.png')}
              iconStyle={icon}
              onIconPress={this.changeGroupView}
            />
          )
        }
          { visibleGroupView
        && (
        <Card styled={groupViewStyle}>
          {
          this.renderGroups()
          }
        </Card>
        )
      }
          {
          back && (
            <ActionIcon
              icon={require('../../../images/back.png')}
              iconStyle={[icon, backIcon]}
              onIconPress={() => { Actions.timetable(); }}
            />
          )
        }
          <Text style={title}>{headerText}</Text>
          <ActionIcon
            icon={require('../../../images/refresh-button.png')}
            iconStyle={[icon, back && hiddenIcon]}
            onIconPress={() => {}}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = {
  safeArea: {
    backgroundColor: colors.mainColor,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  view: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingVertical: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.mainTextColor,
  },
  icon: {
    width: 30,
    height: 30,
  },
  backIcon: {
    width: 25,
    height: 25,
  },
  hiddenIcon: {
    opacity: 0,
  },
  groupViewStyle: {
    position: 'absolute',
    // transform: [{ translateY: 72 }, { translateX: -10 }],
    top: '120%',
  },
};

const mapStateToProps = state => ({
  subgroups: state.currentGroup.subgroups,
});

export default connect(mapStateToProps)(Header);
