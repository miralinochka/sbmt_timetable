import React, {Component} from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import {CardItem} from '../../common'

class ListItem extends Component {
  onGroupPress = () => {
    
  }
  render() {
    const { number, speciality, course, form } = this.props.group;
    return (
      <TouchableOpacity onPress={this.onGroupPress}>
        <View>
          <CardItem>
            <Text style={styles.title}>{number}</Text>
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
  }
}
export default ListItem;