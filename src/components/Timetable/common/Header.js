import React from 'react';
import { Text, TouchableOpacity, View, Image, SafeAreaView } from 'react-native';
import colors from '../../../colors'
import { Actions } from 'react-native-router-flux';

const ActionIcon = ({ icon, onPress, iconStyle }) => (
  <TouchableOpacity onPress={onPress} >
    <Image
      style={iconStyle}
      source={icon}
    />
  </TouchableOpacity>
);

export const Header = ({ headerText, showIcons, back }) => {
  const { title, view, safeArea, icon, hiddenIcon, backIcon } = styles;
  return (
    <SafeAreaView style={safeArea}>
    <View style={view}>
      {
        showIcons && (
          <ActionIcon
            icon={require('../../../images/groups.png')}
            iconStyle={icon}
            onPress={() => {}}
          />
        )
      }
      {
        back && (
          <ActionIcon
            icon={require('../../../images/back.png')}
            iconStyle={[icon, backIcon]}
            onPress={() => {Actions.timetable()}}
          />
        )
      }
      <Text style={title}>{headerText}</Text>
        <ActionIcon
        icon={require('../../../images/refresh-button.png')}
        iconStyle={[icon, back && hiddenIcon]}
        onPress={() => {}}
      />
    </View>
    </SafeAreaView>
  );
};
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
    fontSize: 20,
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
  }
};

