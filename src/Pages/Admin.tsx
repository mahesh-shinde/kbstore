import React from 'react';
import SearchComponent from '../Components/SeachComponent';
import ToolbarComponent from '../Components/ToolbarComponent';
import GridComponent from '../Components/GridComponent';
import { connect } from 'react-redux';
import { SearchTopic } from '../Utils/SearchTopics';
import { IColumnItem, IAddEditSearch } from '../Interface/IKbStoreProps';
import { SearchTopicById } from '../Utils/SearchTopicById';

export interface ISearchTopicParams {
    Data: Array<any>;
    SearchField: IAddEditSearch;
}

class Admin extends React.Component<any, any> {
    private child: any;
    private toolbarRef: any;
    private Topic: string;
    private Tag: Array<string>;
    private URL: string;
    private Description: string;

    constructor(props) {
        super(props);

        this.child = React.createRef();
        this.toolbarRef = React.createRef();
        this.state = {
            Topic: '',
            Tag: [],
            URL: '',
            Description: '',
            GridData: this.props.posts
        }
    }

    public render(): JSX.Element {

        return (
            <div className="adminSection" role="main">
                <SearchComponent
                    IsAdmin={true}
                    OnTopicChanged={this.OnTopicChanged}
                    OnTagChanged={this.OnTagChanged}
                    OnDescriptionChanged={this.OnDescriptionChanged}
                    OnUrlChanged={this.OnUrlChanged}
                />
                <ToolbarComponent {...this.props}
                    IsAdmin={true}
                    OnDelete={this.OnDelete}
                    OnEditClick={this.OnEditClick}
                    OnSearch={this.OnSearch}
                    ref = {this.toolbarRef} />
                <GridComponent {...this.props}
                    IsAdmin={true}
                    Columns={this.GetColumns()}
                    ref={this.child}
                    RowSelected = {this.RowSelected}
                    Rows={this.state.GridData}></GridComponent>
            </div>
        );
    }

    componentWillMount() {
        this.setState({ GridData: this.props.posts });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.posts !== this.props.posts) {
            this.setState({ GridData: nextProps.posts });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        this.RowSelected();
    }

    private GetColumns(): Array<IColumnItem> {
        return [
            {
                Value: "Topic",
                IsVisible: true
            },
            {
                Value: "Description",
                IsVisible: true
            }
        ]
    }

    private OnSearch = () => {
        const newArray = this.props.posts.map(a => ({...a}));
      
        this.setState({ GridData: SearchTopic({Data: newArray, SearchField: {
            Topic: this.Topic,
            Description: this.Description,
            Tag: this.Tag,
            URL: this.URL
        }}) || [] });
    }

    private OnDelete = () => {
        var selectedTopicIds = this.child.current.GetSelectedRows();

        this.props.dispatch({
            type: 'DELETE_TOPIC',
            data: selectedTopicIds
        });
    }

    private OnEditClick = () => {
        var selectedTopicIds = this.child.current.GetSelectedRows();
        var topicData = SearchTopicById(this.props.posts, selectedTopicIds[0]);

        this.props.history.push({
            pathname: '/AddEdit',
            state: { topic:  this.GetTopicDetails(topicData[0])}
        });
    }

    private GetTopicDetails(topicData): IAddEditSearch {
        return {
            SubTopicId: topicData.TopicDetails[0].SubTopicId || null,
            Topic: topicData.Topic || '',
            URL: topicData.TopicDetails[0].URL || '',
            Description: topicData.TopicDetails[0].Description || '',
            Tag: topicData.TopicDetails[0].Tag || ''
        };
    } 

    private RowSelected = () => {
        var selectedTopicIds = this.child.current.GetSelectedRows();

      this.toolbarRef.current.SetDeleteButtonStats(selectedTopicIds.length > 0)
    }

    private OnTopicChanged = (val) => {
        this.Topic = val;
    }

    private OnDescriptionChanged = (val) => {
        this.Description = val;
    }

    private OnUrlChanged = (val) => {
        this.URL = val;
    }

    private OnTagChanged = (val) => {
        this.Tag = val || [];
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state
    }
}

export default connect(mapStateToProps)(Admin);
