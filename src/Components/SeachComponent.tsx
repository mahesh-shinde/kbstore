import React from 'react';
import TagInputComponent from './TagInputComponent';
import { IAddEditSearchComponentProps, IAddEditSearch } from '../Interface/IKbStoreProps';

class SearchComponent extends React.Component<IAddEditSearchComponentProps, IAddEditSearch> {
    constructor(props){
        super(props);

        this.state = {
            Topic: '',
            Tag: [],
            URL: '',
            Description: ''
        }
    }

    public render(): JSX.Element {
        return(
          <div className="searchControlsContainer" role="search">
              <div className="row">
                  <div className="topicContainer searchFieldSection">
                      <label>Topic</label>
                      <input className={'textbox'} type="text" name="Topic" value={this.state.Topic} onChange={this.OnTopicChanged}></input>
                  </div>
                  <div className="urlContainer searchFieldSection">
                      <label>Url</label>
                      <input className={'textbox'} type="text" name="URL" value={this.state.URL} onChange={this.OnUrlChanged}></input>
                  </div>
              </div>

              <div className="row">
                  <div className="descriptionContainer searchFieldSection">
                      <label>Description</label>
                      <input className={'textbox'} type="text" name="Description" onChange={this.OnDescriptionChanged}></input>
                  </div>

                  <div className="tagContainer searchFieldSection">
                      <label>Tag</label>
                      <TagInputComponent OnItemUpdate = {this.OnItemUpdate}/>
                  </div>
              </div>

          </div>
        );
    }

    private OnTopicChanged = (event?:any) => {
        this.setState({Topic: event.target.value});
        this.props.OnTopicChanged(event.target.value);
    }

    private OnDescriptionChanged = (event?:any) => {
        this.setState({Description: event.target.value});
        this.props.OnDescriptionChanged(event.target.value);
    }

    private OnItemUpdate =(value) => {
        this.setState({Tag: value});
        this.props.OnTagChanged(value);
    }

    private OnUrlChanged = (event?:any) => {
        this.setState({URL: event.target.value});
        this.props.OnUrlChanged(event.target.value);
    }
}

export default SearchComponent;
