export function AddTopics(state, action): Array<any> {
    
    action.data.map((row) => {
        let oldStateData = state.map(a => ({ ...a }));
        var isTopicExist = oldStateData.filter(item => item.Topic === row.Topic).length > 0;
        if (isTopicExist) {
            let updatedData = oldStateData.map((item, index) => {
                if (item.Topic === row.Topic) {
                    item.TopicDetails.push({ SubTopicId: row.TopicDetails[0].SubTopicId, 
                        Description: row.TopicDetails[0].Description, 
                        URL: row.TopicDetails[0].URL, 
                        Tag: row.TopicDetails[0].Tag });
                }
                return item;
            }).slice();
            state = updatedData.map(a => ({ ...a }));
        }
        else {
            state = oldStateData.concat(row).map(a => ({ ...a }));
        }
    });

    return state;
}