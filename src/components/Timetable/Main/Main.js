import React, {Component} from 'react';
import { Text, View, FlatList } from 'react-native';
import {connect} from 'react-redux';

class Main extends Component {
  render() {
    const { currentTimetable} = this.props;
    return (
      <View style={styles.container}> 
      <Text>Date</Text>
      {/* <FlatList
        data={currentTimetable}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <TimetableItem listItem={item}/>}
      /> */}
      </View>
    );
  }
};

const styles = {
	container: {
    flex: 1,
  },
  defaultText: {
    fontSize: 20,
  }
};

const mapStateToProps = state => ({
  currentTimetable: state.currentTimetable,
});

export default connect(mapStateToProps)(Main);
