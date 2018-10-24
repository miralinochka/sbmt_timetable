import React, {Component} from 'react';
import { Text, SafeAreaView, FlatList } from 'react-native';
import { Header, Input, CardItem } from '../common'
import Switch from './Switch';
import {connect} from 'react-redux';
import * as actions from '../../../actions/'

import ListItem from './ListItem'
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
      searchItem: searchItem === items[0] ? items[1] : items[0]
    }));
  }

  hangleSearchInput = (text) => {
    this.setState({searchQuery: text});
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
    await downloadTimetable(groupOrLecturer);
    Actions.timetable();
  }

  render() {
    const { searchItem } = this.state;
    console.log('lecturers',this.props.lecturers)
    return (
      <SafeAreaView>
        <Switch toggleSearch={this.toggleSearch} items={items} searchItem={searchItem}/>
        <CardItem styled={styles.cardItem}>
          <Input
            placeholder='Поиск...'
            onChangeText={this.hangleSearchInput}
          />
        </CardItem>
        <FlatList
          data={searchItem===items[0] ? this.displayGroups(): this.displayLecturers()}
          renderItem={({item}) => <ListItem listItem={item} onGroupPress={()=>this.onGroupPress(item)}/>}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    );
  }
};

const mapStateToProps = state => ({
  groups: state.searchItems.groups,
  lecturers: state.searchItems.lecturers
});

const mapDispatchToProps = {
  addGroups: actions.addGroups,
  addLecturers: actions.addLecturers,
  downloadTimetable: actions.downloadTimetable,
}
export default connect(mapStateToProps,mapDispatchToProps)(SearchTimetable);