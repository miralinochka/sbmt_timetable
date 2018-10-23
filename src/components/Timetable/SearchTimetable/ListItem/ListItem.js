import React, {Component} from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import {CardItem} from '../../common'

class ListItem extends Component {
  onGroupPress = () => {
    
  }
  render() {
    const { number, speciality, course, form } = this.props.group;
    console.log(this.props)
    return (
      <TouchableOpacity onPress={this.onGroupPress}>
        <View>
          <CardItem styled={styles.container}>
            <Text style={styles.title}>{number}</Text>
            <Text style={styles.subtitle}>{speciality}, {course} курс, {form}</Text>
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