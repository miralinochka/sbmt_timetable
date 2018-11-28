const renderShortSubgroupName = (subgroup) => {
  if (subgroup !== '' && subgroup !== 'вся группа') {
    const textString = `, ${subgroup[0]} подгр.`;
    return (
      <Text style={styles.title}>{textString}</Text>
    );
  }
  return null;
}

const HeaderTitle = () => (
  <View style={headerTextView}>
    <Text style={title}>{headerText}</Text>
    {this.renderShortSubgroupName(subgroup)}
  </View>
);
