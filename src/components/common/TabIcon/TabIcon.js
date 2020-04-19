import React from 'react';
import { Image, View } from 'react-native';
import iconStyle from '@common/Header/ActionIcon/styles';
import colors from '@styles/colors';
import generalStyles from '@styles/general';
import { sceneNames } from '@constants';

export default (props) => {
  let Icon;

  switch (props.title) {
    case sceneNames.timetable.route:
      Icon = require('@images/calendar.png'); // eslint-disable-line 
      break;
    case sceneNames.searchTimetable.route:
      Icon = require('@images/search.png'); // eslint-disable-line 
      break;
    case sceneNames.savedTimetable.route:
      Icon = require('@images/bookmark.png'); // eslint-disable-line 
      break;
    case sceneNames.sendFeedback.route:
      Icon = require('@images/chat.png'); // eslint-disable-line 
      break;
    default:
      break;
  }

  const borderColor = props.focused ? colors.mainTextColor : colors.mainColor;

  return (
    <View style={{
      flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      borderTopColor: borderColor, borderTopWidth: 4, padding: 20,
      ...generalStyles.defaultPaddingVertical,
    }}
    >
      <Image
        style={iconStyle.icon}
        source={Icon}
      />
    </View>
  );
};
