import React from 'react';

class ToolbarComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            IsDeleteButtonEnabled: false
        };
    }

    public render(): JSX.Element {
        return (
            <div className="toolbarContainer" aria-label="toolbar container">
                <div className="search-button" aria-label="toolbar">
                <button onClick={this.OnSearch}><i className="button-icon">&#xe11a;&nbsp;</i>Search</button>
                </div>
                {this.props.IsAdmin &&
                    <div className="edit-buttons">

                        <button onClick={this.AddEditClick}><i className="button-icon">&#xe109;&nbsp;</i>Add</button>
                        {/* <button disabled={!this.state.IsDeleteButtonEnabled} onClick={this.OnEditClick}><i className="button-icon">&#xe109;&nbsp;</i>Edit</button> */}
                        <button disabled={!this.state.IsDeleteButtonEnabled} onClick={this.OnDelete}><i className="button-icon">&#xe10a;&nbsp;</i>Delete</button>
                    </div>
                }
            </div>
        );
    }

    public SetDeleteButtonStats = (status: boolean) =>{
        this.setState({IsDeleteButtonEnabled: status});
    }

    private OnSearch =()=> {
        this.props.OnSearch();
    }

    private OnDelete = () => {
        this.props.OnDelete();
    }

    private AddEditClick = () => {
        this.props.history.push('/AddEdit');
    }

    private OnEditClick = () => {
        this.props.OnEditClick && this.props.OnEditClick();
    }
}

export default ToolbarComponent;
