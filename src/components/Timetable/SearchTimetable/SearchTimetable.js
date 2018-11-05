import React, { Component } from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import Input from '../common/Input';
import ContainerItem from '../common/ContainerItem';
import Switch from './Switch';
import Spinner from '../common/Spinner';
import * as actions from '../../../actions';
import * as utils from '../../../utils';
import ListItem from '../common/ListItem';
import styles from './styles';

const items = ['Группа', 'Преподаватель'];

class SearchTimetable extends Component {
  state = {
    searchItem: items[0],
    searchQuery: '',
    isLoading: true,
  }

  async componentDidMount() {
    const { addGroupsAndLecturers } = this.props;
    await addGroupsAndLecturers();
    this.hideSpinner();
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
    const { downloadTimetable, toggleSpinner } = this.props;
    console.log('groupOrLecturer', groupOrLecturer);
    const lecturerName = groupOrLecturer.name && utils.shortenLecturerName(groupOrLecturer.name);
    toggleSpinner(true);
    Actions.reset('_timetable', { headerText: groupOrLecturer.number ? `${groupOrLecturer.number} гр.` : lecturerName });
    await downloadTimetable(groupOrLecturer);
  }

  hideSpinner = () => {
    this.setState({
      isLoading: false,
    });
  }

  render() {
    const { searchItem, isLoading } = this.state;
    return (
      <SafeAreaView>
        <Switch toggleSearch={this.toggleSearch} items={items} searchItem={searchItem} />
        <ContainerItem styled={styles.containerItem}>
          <Input
            placeholder="Поиск..."
            onChangeText={this.hangleSearchInput}
          />
        </ContainerItem>
        {
          isLoading ? <Spinner />
            : (
              <FlatList
                data={searchItem === items[0] ? this.displayGroups() : this.displayLecturers()}
                keyboardDismissMode="onDrag"
                scrollsToTop
                renderItem={({ item }) => (
                  <ListItem
                    listItem={item}
                    onGroupPress={() => this.onGroupPress(item)}
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            )
        }
      </SafeAreaView>
    );
  }
}

SearchTimetable.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  lecturers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = state => ({
  groups: state.searchItems.groups,
  lecturers: state.searchItems.lecturers,
});

const mapDispatchToProps = {
  addGroupsAndLecturers: actions.addGroupsAndLecturers,
  downloadTimetable: actions.downloadTimetable,
  toggleSpinner: actions.toggleSpinner,
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchTimetable);
