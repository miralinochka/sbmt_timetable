import React, {Component} from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import {CardItem} from '../../common'

class ListItem extends Component {
  onGroupPress = () => {
    
  }
  renderSubtitle = ({ listItem }) => {
    return listItem.speciality ? `${listItem.speciality}, ${listItem.course} курс, ${listItem.form}` : `Кафедра ${listItem.name}, ${listItem.department}`;
  }
  render() {
    const { listItem } = this.props;
    return (
      <TouchableOpacity onPress={this.onGroupPress}>
        <View>
          <CardItem styled={styles.container}>
            <Text style={styles.title}>{listItem.number || listItem.name}</Text>
            <Text style={styles.subtitle}>{this.renderSubtitle({ listItem })}</Text>
          </CardItem>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  title: {
    fontSize: 18,
    paddingLeft: 15,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 15,
    paddingLeft: 15,
    color: '#303033'
  },
  container: {
    flexDirection: 'column',
  }
}
export default ListItem;