export function DeleteTopics(state, action): Array<any> {
  var filterData = state.map((row) => {
    if (action.data.indexOf(row.TopicId.toString()) === -1) {
      row.TopicDetails = row.TopicDetails.filter((item: any) => {
        if (action.data.indexOf(item.SubTopicId.toString()) === -1)
          return item;
      })
      return row;
    }
  });

  filterData = filterData.filter((item) => {
    if (item !== undefined && item.TopicDetails && item.TopicDetails.length > 0)
      return item
  })
  return filterData;
}