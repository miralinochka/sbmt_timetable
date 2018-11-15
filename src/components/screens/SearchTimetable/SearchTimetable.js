import React, { Component } from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import Input from '@common/Input';
import ContainerItem from '@common/ContainerItem';
import Spinner from '@common/Spinner';
import * as actions from '@src/actions';
import * as utils from '@src/utils';
import ListItem from '@common/ListItem';
import generalStyles from '@src/styles/general';
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

  async componentDidMount() {
    const { addGroupsAndLecturers, toggleSpinner } = this.props;
    toggleSpinner(true);
    await addGroupsAndLecturers();
    toggleSpinner(false);
  }

  toggleSearch = () => this.setState(({ searchItem }) => ({
    searchItem: searchItem === searchItems.group ? searchItems.lecturer : searchItems.group,
  }));

  hangleSearchInput = text => this.setState({ inputText: text });

  displayGroups = () => {
    const { groups } = this.props;
    const { inputText } = this.state;
    return groups.filter(group => (
      group.number.includes(inputText)
    ));
  }

  displayLecturers = () => {
    const { lecturers } = this.props;
    const { inputText } = this.state;
    return lecturers.filter(lecturer => (
      lecturer.name.includes(inputText) && !lecturer.name.toLowerCase().includes('вакансия')
    ));
  }

  onGroupPress = async (groupOrLecturer) => {
    const { downloadTimetable, toggleSpinner } = this.props;
    const lecturerName = groupOrLecturer.name && utils.shortenLecturerName(groupOrLecturer.name);
    toggleSpinner(true);
    Actions.reset('_timetable', { headerText: groupOrLecturer.number ? `${groupOrLecturer.number} гр.` : lecturerName });
    await downloadTimetable(groupOrLecturer);
  }

  render() {
    const { searchItem } = this.state;
    const { isLoading } = this.props;

    return (
      <SafeAreaView style={generalStyles.fullSize}>
        <Switch toggleSearch={this.toggleSearch} searchItems={searchItems} searchItem={searchItem} />
        <ContainerItem styled={styles.сontainerItem}>
          <Input
            placeholder="Поиск..."
            onChangeText={this.hangleSearchInput}
          />
        </ContainerItem>
        {
          isLoading ? <Spinner />
            : (
              <FlatList
                data={searchItem === searchItems.group ? this.displayGroups() : this.displayLecturers()}
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
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  groups: state.groupsAndLecturers.groups,
  lecturers: state.groupsAndLecturers.lecturers,
  isLoading: state.isLoading,
});

const mapDispatchToProps = {
  addGroupsAndLecturers: actions.addGroupsAndLecturers,
  downloadTimetable: actions.downloadTimetable,
  toggleSpinner: actions.toggleSpinner,
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchTimetable);
