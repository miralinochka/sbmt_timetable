import React, {Component} from 'react';
import { Text, SafeAreaView, FlatList } from 'react-native';
import { Header, Input, CardItem } from '../common'
import Switcher from './Switcher'
import axios from 'axios';
import ListItem from './ListItem'

const item1 = 'Группа';
const item2 = 'Преподаватель';

class SearchTimetable extends Component {
  state = {
    searchItem: item1,
    groups: [],
  }

  async componentDidMount() {
    const {data} = await axios.get('http://timetable.sbmt.by/groups/');
    data.sort(this.comparator);
      console.log('groups', data);
      this.setState({groups: data})
  }

  toggleSearch = () => {
    this.setState(({ searchItem }) => ({
      searchItem: searchItem === item1 ? item2 : item1
    }));
    console.log('state',this.state)
  }
  comparator = (first, second) => {
    if (first.number < second.number)
    return -1;
  if (first.number > second.number)
    return 1;
  return 0;
  }
  render() {
    return (
      <SafeAreaView>
        <Switcher toggleSearch={this.toggleSearch} item1={item1} item2={item2}/>
        <CardItem>
          <Input
            placeholder='Поиск...'
          />
        </CardItem>
        <FlatList
          data={this.state.groups}
          renderItem={({item}) => <ListItem group={item}/>}
        />
      </SafeAreaView>
    );
  }
};
export default SearchTimetable;