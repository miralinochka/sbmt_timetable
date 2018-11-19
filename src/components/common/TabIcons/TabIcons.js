import React from 'react';
import { Image } from 'react-native';
import iconStyle from '@common/Header/ActionIcon/styles';

export const SearchIcon = () => (
  <Image
    style={iconStyle.icon}
    source={require('@images/search.png')} // eslint-disable-line 
  />
);
export const TimetableIcon = () => (
  <Image
    style={iconStyle.icon}
    source={require('@images/calendar.png')} // eslint-disable-line 
  />
);
export const BookmarkIcon = () => (
  <Image
    style={iconStyle.icon}
    source={require('@images/bookmark.png')} // eslint-disable-line 
  />
);
export const FeedbackIcon = () => (
  <Image
    style={iconStyle.icon}
    source={require('@images/chat.png')} // eslint-disable-line 
  />
);
