import React from 'react';

class ColumnComponent extends React.Component<any> {
    constructor(props) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <div role="row" className={this.props.IsAdmin ? 'admin-grid-section' :
                'user-grid-section'}>

                {this.props.IsAdmin && <div className="col item"><input onChange={this.HeaderCheckboxClick} className="headerCheckbox" type="checkbox" /></div>}

                {this.props.Columns.length > 0 && this.props.Columns.map((row, index) =>
                    row.IsVisible && <div role="columnheader" key={'column' + index} className="col item">{row.Value}</div>
                )}
            </div>
        );
    }

    private HeaderCheckboxClick = (event?: any) => {
        this.props.HeaderCheckboxClick && this.props.HeaderCheckboxClick(event);
    }
}

export default ColumnComponent;
