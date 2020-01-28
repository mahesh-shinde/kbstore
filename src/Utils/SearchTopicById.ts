export function SearchTopicById(state, subTopicId: string): Array<any> {
    var filterData = state.map((row) => {
        if (subTopicId.indexOf(row.TopicId.toString()) > -1) 
            return row;
          row.TopicDetails = row.TopicDetails.filter((item: any) => {
            if (subTopicId.indexOf(item.SubTopicId.toString()) > -1)
              return item;
          })
          return row;
      });
    
      filterData = filterData.filter((item) => {
        if (item !== undefined && item.TopicDetails && item.TopicDetails.length > 0)
          return item
      })
      return filterData;
  }