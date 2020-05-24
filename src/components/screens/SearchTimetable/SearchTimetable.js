import React, { Component } from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '@common/Input';
import ContainerItem from '@common/ContainerItem';
import Spinner from '@common/Spinner';
import * as actions from '@actions';
import ListItem from '@common/ListItem';
import generalStyles from '@styles/general';
import Switch from './Switch';
import styles from './styles';

const searchItems = {
  group: 'Группа',
  lecturer: 'Преподаватель',
};

class SearchTimetable extends Component {
  state = {
    searchItem: searchItems.group,
    inputText: '',
  }

  componentDidMount() {
    const { addGroupsAndLecturers } = this.props;
    addGroupsAndLecturers();
  }

  toggleSearch = () => this.setState(({ searchItem }) => ({
    searchItem: searchItem === searchItems.group ? searchItems.lecturer : searchItems.group,
  }));

  hangleSearchInput = text => this.setState({ inputText: text });

  displayGroups = () => {
    const { groups } = this.props;
    const { inputText } = this.state;
    return groups.filter(group => (
      group.number.toLowerCase().includes(inputText.trim().toLowerCase())
    ));
  }

  displayLecturers = () => {
    const { lecturers } = this.props;
    const { inputText } = this.state;
    return lecturers.filter(lecturer => (
      lecturer.name.toLowerCase().includes(inputText.trim().toLowerCase()) && !lecturer.name.toLowerCase().includes('вакансия')
    ));
  }

  onGroupOrLecturerPress = async (groupOrLecturer) => {
    const { downloadTimetable } = this.props;
    await downloadTimetable(groupOrLecturer);
  }

  renderFlatListItem = ({ item }) => (
    <ListItem
      listItem={item}
      onGroupOrLecturerPress={() => this.onGroupOrLecturerPress(item)}
    />
  )

  keyExtractorFunction = index => index.toString();

  render() {
    const { searchItem } = this.state;
    const { isLoading } = this.props;

    return (
      <SafeAreaView style={generalStyles.fullSize}>
        <Switch
          toggleSearch={this.toggleSearch}
          searchItems={searchItems}
          searchItem={searchItem}
        />
        <ContainerItem styled={styles.сontainerItem}>
          <Input
            placeholder="Поиск..."
            onChangeText={this.hangleSearchInput}
            testID="searchInput"
          />
        </ContainerItem>
        {
          isLoading ? <Spinner />
            : (
              <FlatList
                data={searchItem === searchItems.group
                  ? this.displayGroups()
                  : this.displayLecturers()}
                keyboardDismissMode="onDrag"
                scrollsToTop
                renderItem={({ item }) => this.renderFlatListItem({ item })}
                keyExtractor={(item, index) => this.keyExtractorFunction(index)}
                testID="qwer42"
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
  isLoading: PropTypes.bool.isRequired,
  addGroupsAndLecturers: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  groups: state.groupsAndLecturers.groups,
  lecturers: state.groupsAndLecturers.lecturers,
  isLoading: state.isLoading,
});

const mapDispatchToProps = {
  downloadTimetable: actions.downloadTimetable,
  addGroupsAndLecturers: actions.addGroupsAndLecturers,
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchTimetable);
