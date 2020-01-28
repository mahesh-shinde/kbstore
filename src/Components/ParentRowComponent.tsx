import React from 'react';

class ParentRowComponent extends React.Component<any> {
    constructor(props) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <div role="row" key={this.props.index} className={this.props.IsAdmin ? 'admin-grid-section' :
                'user-grid-section'}>
                <div role="gridcell" className="topicId" hidden={true}>{this.props.row.TopicId}</div>
                {this.props.IsAdmin && <div role="gridcell" className="col item"><input data-id={this.props.row.TopicId} onChange={this.ChildrenCheckboxClick} type="checkbox" className="childCheckbox" /></div>}
                <div role="gridcell" className="item parent-row-topic" onClick={this.ParentRowClick}>{this.props.row.Topic}</div>
                <div role="gridcell" className="item parent-row-description" onClick={this.ParentRowClick}></div>
            </div>
        );
    }

    private ParentRowClick = (event?: any) => {
        this.props.ParentRowClick && this.props.ParentRowClick(event);
    }

    private ChildrenCheckboxClick = (event?: any)=> {
        this.props.ChildrenCheckboxClick && this.props.ChildrenCheckboxClick(event);
    }
}

export default ParentRowComponent;
