import React from 'react';
import { Text, TouchableOpacity, View, Image, SafeAreaView } from 'react-native';
import colors from '../../../colors'

export const Header = ({ headerText, showIcons, back }) => {
  const { textStyle, viewStyle, safeAreaStyle, refreshStyle, iconStyle } = styles;
  console.log()
  return (
    <SafeAreaView style={safeAreaStyle}>
    <View style={viewStyle}>
      {
        showIcons && (
          <TouchableOpacity>
            <Image
              style={iconStyle}
              source={require('../../../images/groups.png')}
            />
          </TouchableOpacity>
        )
      }
      <Text style={textStyle}>{headerText}</Text>
      {showIcons && (<TouchableOpacity>
        <Image
          style={iconStyle}
          source={require('../../../images/refresh-button.png')}
        />
      </TouchableOpacity>
      )}
    </View>
    </SafeAreaView>
  );
};
const styles = {
  safeAreaStyle: {
    backgroundColor: colors.mainColor,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  viewStyle: {
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row',
      paddingVertical: 15,
  },
  textStyle: {
    fontSize: 20,
    color: colors.mainTextColor,
  },
  iconStyle: {
    width: 30, 
    height: 30,
  },
};

