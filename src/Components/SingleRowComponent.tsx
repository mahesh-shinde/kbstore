import React from 'react';

class SingleRowComponent extends React.Component<any> {
    constructor(props) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <div role="row" key={this.props.index} className={this.props.IsAdmin ? 'admin-grid-section' :
                'user-grid-section'}>
                <div role="gridcell" className="topicId" hidden={true}>{this.props.row.TopicId}</div>
                {this.props.IsAdmin && <div role="gridcell" className="col item"><input data-id={this.props.row.TopicId} onChange={this.ChildrenCheckboxClick} className="childCheckbox" type="checkbox" /></div>}
                <div role="gridcell" className="item">{this.props.row.Topic} </div>
                <div role="gridcell" className="item">
                    <a className="grid-description-ellipsis" title={this.props.row.TopicDetails[0].Description} href={this.props.row.TopicDetails[0].URL} target={"_blank"}>{this.props.row.TopicDetails[0].Description}</a>
                </div>

            </div>
        );
    }

    private ChildrenCheckboxClick = (event?: any)=> {
        this.props.ChildrenCheckboxClick && this.props.ChildrenCheckboxClick(event);
    }
}

export default SingleRowComponent;
