import React from 'react';
import TagInputComponent from './TagInputComponent';
import { IAddEditSearchComponentProps, IAddEditSearch, ITopicDetails } from '../Interface/IKbStoreProps';

class AddEditSearchComponent extends React.Component<any, IAddEditSearch> {
    private tagInputRef : any;
    private topicDetails: IAddEditSearch;

    constructor(props){
        super(props);

        this.tagInputRef = React.createRef();
        
        this.SetStatus();

        this.state = {
            Topic: this.topicDetails.Topic,
            Tag: this.topicDetails.Tag,
            URL: this.topicDetails.URL,
            Description: this.topicDetails.Description
        }
    }

    public render(): JSX.Element {
        return(
          <div className="searchControlsContainer" role="search">
              <div className="row" role="row">
                  <div className="topicContainer searchFieldSection">
                      <label>Topic</label>
                      <input className={'textbox'} type="text" name="Topic" value={this.state.Topic} onChange={this.OnTopicChanged}></input>
                  </div>

                  <div className="tagContainer searchFieldSection">
                      <label>Tag</label>
                      <TagInputComponent ref={this.tagInputRef} OnItemUpdate = {this.OnItemUpdate}/>
                  </div>
                 
              </div>
            <hr className="horizantal-seperator"/>
              <div className="row" role="row">
                <div className="urlContainer searchFieldSection">
                      <label>Url</label>
                      <input className={'textbox'} type="text" name="URL" value={this.state.URL} onChange={this.OnUrlChanged}></input>
                  </div>
                  <div className="descriptionContainer searchFieldSection">
                      <label>Description</label>
                      <input className={'textbox'} type="text" name="Description" value={this.state.Description} onChange={this.OnDescriptionChanged}></input>
                  </div>
              </div>

          </div>
        );
    }

    public ResetAll =() =>{
        this.tagInputRef.current.ClearInput();
        this.setState({Topic: '',Description:'',Tag:[] ,URL:''});
    }

    private SetStatus(): IAddEditSearch {
        let topicData = this.props.location.state && this.props.location.state.topic;
        this.topicDetails = {
            SubTopicId: topicData && topicData.SubTopicId || null,
            Topic: topicData && topicData.Topic || '',
            URL: topicData && topicData.URL || '',
            Description: topicData && topicData.Description || '',
            Tag: topicData && topicData.Tag || ''
        };
        return this.topicDetails;
    }

    private OnItemUpdate =(value) => {
        this.setState({Tag: value});
        this.props.OnTagChanged(value);
    }

    private OnTopicChanged = (event?:any) => {
        this.setState({Topic: event.target.value});
        this.props.OnTopicChanged(event.target.value);
    }

    private OnDescriptionChanged = (event?:any) => {
        this.setState({Description: event.target.value});
        this.props.OnDescriptionChanged(event.target.value);
    }

    private OnUrlChanged = (event?:any) => {
        this.setState({URL: event.target.value});
        this.props.OnUrlChanged(event.target.value);
    }
}

export default AddEditSearchComponent;
