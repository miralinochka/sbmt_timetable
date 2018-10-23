import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import colors from '../../../colors'
import { Actions } from 'react-native-router-flux';

export const Footer = () => {
  const { viewStyle } = styles;
  return (
      <View style={viewStyle}>
        <TouchableOpacity onPress={()=>{Actions.searchTimetable()}}>
          <Image
          style={{width: 30, height: 30}}
          source={require('../../../images/search.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
          style={{width: 30, height: 30}}
          source={require('../../../images/calendar.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
          style={{width: 30, height: 30}}
          source={require('../../../images/bookmark.png')}
          />
        </TouchableOpacity>
      </View>
  );
};
const styles = {
  viewStyle: {
      backgroundColor: colors.mainColor,
      justifyContent: 'space-around',
      alignItems: 'center',
      shadowColor: 'black',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.2,
      flexDirection: 'row',
      paddingVertical: 15,
  },
};
