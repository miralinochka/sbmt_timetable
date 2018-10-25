import React, {Component} from 'react';
import { Text, SafeAreaView, FlatList } from 'react-native';

import {connect} from 'react-redux';
import * as actions from '../../../actions'

// import ListItem from './ListItem'

class SavedTimetable extends Component {
  render() {
    const { timetables } = this.props;
    return (
      <SafeAreaView>
        <Text>Hi</Text>
        {/* <FlatList
          data={timetables}
          renderItem={({item}) => <ListItem listItem={item} onGroupPress={()=>this.onGroupPress(item)}/>}
          keyExtractor={(item, index) => index.toString()}
        /> */}
      </SafeAreaView>
    );
  }
};

const mapStateToProps = state => ({
  timetables: state.timetable
});

const mapDispatchToProps = {
  addGroups: actions.addGroups,
  addLecturers: actions.addLecturers,
  downloadTimetable: actions.downloadTimetable,
}
export default connect(mapStateToProps,mapDispatchToProps)(SavedTimetable);