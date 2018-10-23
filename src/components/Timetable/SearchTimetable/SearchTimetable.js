import React, {Component} from 'react';
import { Text, SafeAreaView, FlatList } from 'react-native';
import { Header, Input, CardItem } from '../common'
import Switch from './Switch';
import {connect} from 'react-redux';
import * as actions from '../../../actions/'

import ListItem from './ListItem'
import styles from './styles';

const items = ['Группа', 'Преподаватель'];

class SearchTimetable extends Component {
  state = {
    searchItem: items[0],
    searchQuery: '',
  }

  async componentDidMount() {
    const { addGroups } = this.props;
    await addGroups();
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

  render() {
    const { searchItem } = this.state;
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
          data={this.displayGroups()}
          renderItem={({item}) => <ListItem group={item}/>}
        />
      </SafeAreaView>
    );
  }
};

const mapStateToProps = state => ({
  groups: state.searchItems.groups,
});

const mapDispatchToProps = {
  addGroups: actions.addGroups,
}
export default connect(mapStateToProps,mapDispatchToProps)(SearchTimetable);