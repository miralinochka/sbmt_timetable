import React, { Component } from 'react';
import { Text, SafeAreaView, FlatList } from 'react-native';
import {connect} from 'react-redux';
import { Input, CardItem } from '../common';
import Switch from './Switch';
import * as actions from "../../../actions";

import ListItem from './ListItem';
import styles from './styles';
import { Actions } from 'react-native-router-flux';

const items = ['Группа', 'Преподаватель'];

class SearchTimetable extends Component {
  state = {
    searchItem: items[0],
    searchQuery: '',
  }

  async componentDidMount() {
    const { addGroups, addLecturers } = this.props;
    await addGroups();
    await addLecturers();
  }

  toggleSearch = () => {
    this.setState(({ searchItem }) => ({
      searchItem: searchItem === items[0] ? items[1] : items[0],
    }));
  }

  hangleSearchInput = (text) => {
    this.setState({ searchQuery: text });
  }

  displayGroups = () => {
    const { groups } = this.props;
    const { searchQuery } = this.state;
    return groups.filter(group => (
      group.number.includes(searchQuery)
    ));
  }

  displayLecturers = () => {
    const { lecturers } = this.props;
    const { searchQuery } = this.state;
    return lecturers.filter(lecturer => (
      lecturer.name.includes(searchQuery) && !lecturer.name.toLowerCase().includes('вакансия')
    ));
  }

  onGroupPress = async (groupOrLecturer) => {
    const { downloadTimetable } = this.props;
    console.log('groupOrLecturer', groupOrLecturer);
    const lecturerNameArray = groupOrLecturer.name && groupOrLecturer.name.split(' ');
    const lecturerName = lecturerNameArray && (lecturerNameArray[2] ? `${lecturerNameArray[0]} ${lecturerNameArray[1][0]}. ${lecturerNameArray[2][0]}.` : `${lecturerNameArray[0]} ${lecturerNameArray[1][0]}.`);
    await downloadTimetable(groupOrLecturer);
    Actions.timetable();
    Actions.refresh({ headerText: groupOrLecturer.number ? `${groupOrLecturer.number} гр.` : lecturerName });
  }

  render() {
    const { searchItem } = this.state;
    return (
      <SafeAreaView>
        <Switch toggleSearch={this.toggleSearch} items={items} searchItem={searchItem} />
        <CardItem styled={styles.cardItem}>
          <Input
            placeholder="Поиск..."
            onChangeText={this.hangleSearchInput}
          />
        </CardItem>
        <FlatList
          data={searchItem === items[0] ? this.displayGroups() : this.displayLecturers()}
          renderItem={({ item }) => <ListItem listItem={item} onGroupPress={() => this.onGroupPress(item)} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  groups: state.searchItems.groups,
  lecturers: state.searchItems.lecturers,
});

const mapDispatchToProps = {
  addGroups: actions.addGroups,
  addLecturers: actions.addLecturers,
  downloadTimetable: actions.downloadTimetable,
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchTimetable);
