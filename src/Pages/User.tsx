import React from 'react';
import SearchComponent from '../Components/SeachComponent';
import ToolbarComponent from '../Components/ToolbarComponent';
import GridComponent from '../Components/GridComponent';
import { connect } from 'react-redux';
import { SearchTopic } from '../Utils/SearchTopics';
import { IColumnItem } from '../Interface/IKbStoreProps';

class User extends React.Component<any, any> {
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
            GridData: this.props.posts.length > 0 ? this.props.posts : JSON.parse(localStorage.getItem("topicData"))
        }
    }

    public render(): JSX.Element {

        return (
            <div className="userSection" role="main">
                <SearchComponent
                    IsAdmin={false}
                    OnTopicChanged={this.OnTopicChanged}
                    OnTagChanged={this.OnTagChanged}
                    OnDescriptionChanged={this.OnDescriptionChanged}
                    OnUrlChanged={this.OnUrlChanged}
                />
                <ToolbarComponent {...this.props}
                    IsAdmin={false}
                    OnSearch={this.OnSearch}
                    ref = {this.toolbarRef} />
                <GridComponent {...this.props}
                    IsAdmin={false}
                    Columns={this.GetColumns()}
                    ref={this.child}
                    Rows={this.state.GridData}></GridComponent>
            </div>
        );
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
        const newArray = this.props.posts.length > 0 ? this.props.posts.map(a => ({...a})) : JSON.parse(localStorage.getItem("topicData")).map(a => ({...a}));
      
        this.setState({ GridData: SearchTopic({Data: newArray, SearchField: {
            Topic: this.Topic,
            Description: this.Description,
            Tag: this.Tag,
            URL: this.URL
        }}) || [] });
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

export default connect(mapStateToProps)(User);
