import React from 'react';
import { IGridComponentProps } from '../Interface/IKbStoreProps';
import ColumnComponent from './ColumnComponent';
import SingleRowComponent from './SingleRowComponent';
import ParentRowComponent from './ParentRowComponent';
import ChildRowComponent from './ChildRowComponent';



class GridComponent extends React.Component<IGridComponentProps> {
    private SelectedRows: Array<string> = [];
    constructor(props: IGridComponentProps) {
        super(props);
    }

    public render(): JSX.Element {
        const { Columns, Rows } = this.props;
        return (
            <div className="grid-section" role="grid">
                <div className="column-section">
                <ColumnComponent
                    {...this.props}
                    Columns={Columns}
                    HeaderCheckboxClick={this.HeaderCheckboxClick} />
                </div>
                <div className="body-section">
                {Rows && Rows.length > 0 && Rows.map((row, index) =>

                    <div key={index} className="grid-body-section" role="rowgroup">
                        {row.TopicDetails.length === 1 &&
                            (<SingleRowComponent
                                {...this.props}
                                index={index}
                                row={row}
                                ChildrenCheckboxClick={this.ChildrenCheckboxClick}
                            />)
                        }

                        {row.TopicDetails.length > 1 &&
                            <ParentRowComponent
                                {...this.props}
                                index={index}
                                row={row}
                                ChildrenCheckboxClick={this.ChildrenCheckboxClick}
                                ParentRowClick={this.parentRowClick}
                            />
                        }

                        {row.TopicDetails.length > 1 &&
                            row.TopicDetails.map((item, index) =>
                                <ChildRowComponent
                                    {...this.props}
                                    index={index}
                                    row={item}
                                    ChildrenCheckboxClick={this.ChildrenCheckboxClick}
                                />
                            )}
                        {(!!row.TopicDetails && row.TopicDetails.length === 0) && <div className="empty-container"> No Data Available </div>}
                    </div>
                )}
                
                {(!!Rows && Rows.length === 0) && <div className="empty-container"> No Data Available </div>}
                </div>
            </div>


        );
    }

    componentDidUpdate(prevProps, prevState) {
        this.ResetAllCheckbox();
    }

    public GetSelectedRows = () => {
        this.SelectedRows = [];
        var checkboxes = document.getElementsByClassName('childCheckbox');

        for (var i = 0; i < checkboxes.length; i++) {
            var element = checkboxes[i] as HTMLInputElement;
            if (element.checked) {
                var topicId = element.getAttribute('data-id');
                this.SelectedRows.push(topicId);
            }
        }
        return this.SelectedRows;
    }

    private ResetAllCheckbox() {
        if (this.props.IsAdmin) {
            var checkboxes = document.getElementsByClassName('childCheckbox');
            var headerCheckbox = document.getElementsByClassName('headerCheckbox')[0] as HTMLInputElement;

            for (var i = 0; i < checkboxes.length; i++) {
                var element = checkboxes[i] as HTMLInputElement;
                element.checked = false;
            }
            headerCheckbox.checked = false;
        }
    }

    private HeaderCheckboxClick = (event?: any) => {
        var checkboxes = document.getElementsByClassName('childCheckbox');
        if (event.target.checked) {
            for (var i = 0; i < checkboxes.length; i++) {
                var element = checkboxes[i] as HTMLInputElement;
                element.checked = true;
            }

        } else {
            for (var j = 0; j < checkboxes.length; j++) {
                var checkbox = checkboxes[j] as HTMLInputElement;
                checkbox.checked = false;
            }
        }
        this.props.RowSelected && this.props.RowSelected();
    }

    private ChildrenCheckboxClick = (event?: any) => {
        var flag = false;
        var checkboxes = document.getElementsByClassName('childCheckbox');
        var headerCheckbox = document.getElementsByClassName('headerCheckbox')[0] as HTMLInputElement;
        for (var i = 0; i < checkboxes.length; i++) {
            var element = checkboxes[i] as HTMLInputElement;
            if (element.checked) {
                flag = true;
            }
            else {
                flag = false;
                break;
            }
        }
        if (flag === true) {
            headerCheckbox.checked = true;
        }
        else {
            headerCheckbox.checked = false;
        }
        this.props.RowSelected();
    }

    private parentRowClick = (event?: any) => {

        var element = event.target;

        var childrens: Array<any> = element.parentElement.parentElement.getElementsByClassName('child-body-section');
        Array.from(childrens).forEach(element => {
            element.classList.toggle('hide');
        });
    }
}

export default GridComponent;
