import {DeleteTopics} from '../Utils/DeleteTopics';
import { AddTopics } from '../Utils/AddTopics';

const postReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TOPIC':
      localStorage.setItem('topicData', JSON.stringify(action.data));
      return AddTopics(state, action); 
    case 'DELETE_TOPIC':
      const remainingItem = DeleteTopics(state, action); 
      localStorage.setItem('topicData', JSON.stringify(remainingItem));
      return remainingItem;
    default:
      return state;
  }
}

export default postReducer;