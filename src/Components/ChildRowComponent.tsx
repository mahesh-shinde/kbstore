import React from 'react';

class ChildRowComponent extends React.Component<any> {
    constructor(props) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <div role="row" key={this.props.index} className={this.props.IsAdmin ? 'admin-grid-section child-body-section hide' :
                'user-grid-section child-body-section hide'}>
                <div role="gridcell" className="topicId" hidden={true}>{this.props.row.SubTopicId}</div>
                {this.props.IsAdmin && <div role="gridcell" className="col item"><input data-id={this.props.row.SubTopicId} onChange={this.ChildrenCheckboxClick} type="checkbox" className="childCheckbox" /></div>}
                <div role="gridcell" className="item child-row-topic"></div>
                <div role="gridcell" className="item child-row-description">
                    <a className="grid-description-ellipsis" title={this.props.row.Description} href={this.props.row.URL} target={"_blank"}>{this.props.row.Description}</a>
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        var childRows = document.getElementsByClassName('child-body-section');

        for (var i = 0; i < childRows.length; i++) {
            var element = childRows[i] as HTMLInputElement;
            if (!element.classList.contains('hide'))
                element.classList.add('hide');
        }
    }

    private ChildrenCheckboxClick = (event?: any) => {
        this.props.ChildrenCheckboxClick && this.props.ChildrenCheckboxClick(event);
    }
}

export default ChildRowComponent;
