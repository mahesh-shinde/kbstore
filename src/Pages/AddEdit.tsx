import React from 'react';
import AddEditSearchComponent from '../Components/AddEditSearchComponent';
import { connect } from 'react-redux';
import { IAddEdit, IRowItem, ITopicDetails, IColumnItem, IAddEditSearch } from '../Interface/IKbStoreProps';
import $ from 'jquery';
import { DeleteTopics } from '../Utils/DeleteTopics';
import ColumnComponent from '../Components/ColumnComponent';

class AddEdit extends React.Component<any, IAddEdit> {

    private Topic: string;
    private Tag: Array<string>;
    private URL: string;
    private Description: string;
    private topicDetails: IAddEditSearch;
    private childSearchRef: any;

    constructor(props) {
        super(props);

        //this.SetStatus();

        this.state = {
            data: [],
            IsAddLinkButtonEnabled: false,
            IsUpdateButtonVisible: false
        };

        this.childSearchRef = React.createRef();
    }

    public render(): JSX.Element {
        return (
            <div className="add-edit-section">
                <AddEditSearchComponent
                    {...this.props}
                    IsAdmin={this.props.IsAdmin}
                    OnTopicChanged={this.OnTopicChanged}
                    OnTagChanged={this.OnTagChanged}
                    OnDescriptionChanged={this.OnDescriptionChanged}
                    OnUrlChanged={this.OnUrlChanged}
                    ref={this.childSearchRef}
                />

                <div className="addedit-button">
                    <button className={'button'} disabled={!this.state.IsAddLinkButtonEnabled} onClick={this.OnAddLinkClick}>Add link</button>
                    
                </div>

                <div className="grid-section">
                    <div className="column-section">
                        <ColumnComponent
                            {...this.props}
                            Columns={this.GetColumns()}
                        />
                    </div>

                    <div className="body-section">
                        {this.state.data.length > 0 && this.state.data.map((row, index) =>
                            <div key={'topic' + index} className="grid-body-section">
                                {row.TopicDetails.map((item, index) =>
                                    <div key={'topic' + index} className={this.props.IsAdmin ? 'admin-grid-section' :
                                        'user-grid-section'}>

                                        <div className="item">
                                            <a className="hyperlink-text" href={item.URL} target={"_blank"}>{item.URL}</a>
                                        </div>
                                        <div className="item">
                                            <div className="inline-span ellipsis">{item.Description}</div>
                                            <div className="inline-span cursor-pointer tooltip">{'...'}
                                                <div className='tooltiptext '>
                                                    <div className='tooltipDescription'>{item.Description}</div>
                                                    <div onClick={(e) => this.DeleteClick(e, item)}><i className="button-icon">&nbsp;&nbsp;&#xe10a;&nbsp;</i></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        )}
                        {
                            this.state.data.length === 0 && <div className="empty-container"> No Data Available </div>}

                    </div>
                </div>
                <div className="addedit-button">
                    <button className="button" disabled={!(this.state.data.length > 0)} onClick={this.OnSaveClick}>Save</button>
                </div>

            </div>
        );
    }

    componentDidMount() {
        this.GetAddLinkButtonStatus();
    }

    private GetColumns(): Array<IColumnItem> {
        return [
            {
                Value: "URL",
                IsVisible: true
            },
            {
                Value: "Description",
                IsVisible: true
            }
        ]
    }

    private DeleteClick = (event: any, item: ITopicDetails) => {
        let selectedRows: Array<string> = [item.SubTopicId.toString()];
        var action = {
            data: selectedRows
        }

        this.setState({ data: DeleteTopics(this.state.data, action) });
        this.GetAddLinkButtonStatus();
    }

    private OnEditLinkClick = (e: any) => {
        e.preventDefault();
        this.SetGridData();
        this.setState({IsUpdateButtonVisible: false});
    }

    private OnAddLinkClick = (e: any) => {
        e.preventDefault();
        this.SetGridData();
    }

    private OnSaveClick = (e?: any) => {
        e.preventDefault();

        // if (this.topicDetails.SubTopicId) {
        //     this.props.dispatch({
        //         type: 'DELETE_TOPIC',
        //         data: [this.topicDetails.SubTopicId.toString()]
        //     });
        // }

        this.props.dispatch({
            type: 'ADD_TOPIC',
            data: this.state.data
        });
        this.props.history.push('/Admin');
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

    private OnTopicChanged = (val) => {
        this.Topic = val;
        this.GetAddLinkButtonStatus();
    }

    private OnDescriptionChanged = (val) => {
        this.Description = val;
        this.GetAddLinkButtonStatus();
    }

    private OnUrlChanged = (val) => {
        this.URL = val;
        this.GetAddLinkButtonStatus();
    }

    private OnTagChanged = (val) => {
        this.Tag = val;
        this.GetAddLinkButtonStatus();
    }

    private GetAddLinkButtonStatus = () => {
        this.setState({ IsAddLinkButtonEnabled: !!this.Topic && !!this.Description && !!(this.Tag && this.Tag.length > 0) && !!this.URL })
    }

    private SetGridData() {
        var user = this.props.IsAdmin ? 'Admin' : 'User';
        var subTopicId = Math.random();
        var topicDetails: Array<ITopicDetails> = [{ SubTopicId: subTopicId, Description: this.Description, URL: this.URL, Tag: this.Tag }];

        var topicData: IRowItem = {
            TopicId: Math.random(),
            Topic: this.Topic, Comment: '', CreatedBy: user, CreatedDateTime: new Date(),
            ModifiedBy: user, ModifiedDateTime: new Date(), TopicDetails: topicDetails
        };

        this.ResetAll();
        this.setState({ data: this.state.data.concat(topicData) });
    }

    private ResetAll = () => {
        this.Topic = '';
        this.Description = '';
        this.URL = '';
        this.Tag = [];
        this.childSearchRef.current.ResetAll();
    }
}

export default connect()(AddEdit);;
