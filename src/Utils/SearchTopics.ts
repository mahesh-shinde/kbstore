import { ISearchTopicParams } from "../Pages/Admin";

export function SearchTopic(data: ISearchTopicParams): Array<any> {
    var searchData = data.Data.map((row) => {
        var flag = false;
        if (data.SearchField.Topic ? row.Topic === data.SearchField.Topic : true) {
            row.TopicDetails = row.TopicDetails.filter((item: any) => {
                if ((data.SearchField.Description ? data.SearchField.Description === item.Description : true) &&
                    (data.SearchField.URL ? data.SearchField.URL === item.URL : true) &&
                    (data.SearchField.Tag && data.SearchField.Tag.length > 0 ? data.SearchField.Tag.filter(x => item.Tag.indexOf(x) > -1).length > 0 : true)) {
                    flag = true;
                    return item;
                }
            });
            if (flag)
                return row;
        }
    });
    searchData = searchData.filter((item) => {
        return item !== undefined
    });
    return searchData;
}