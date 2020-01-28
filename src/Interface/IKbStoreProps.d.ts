export interface IComponentProps {
    IsAdmin: boolean;
}

export interface IGridComponentProps extends IComponentProps {
    Columns: Array<IColumnItem>,
    Rows: Array<IRowItem>,
    RowSelected?: any
}

export interface IColumnItem {
    Value: string;
    IsVisible: boolean;
}

export interface IRowItem {
    TopicId: number;
    Topic: string;
    TopicDetails: Array<ITopicDetails>,
    Comment: string;
    CreatedBy?: string;
    CreatedDateTime?: Date;
    ModifiedBy?: string;
    ModifiedDateTime?: Date;
}

export interface ITopicDetails {
    SubTopicId: number;
    Description: string;
    URL: string;
    Tag: Array<string>;
}

export interface IAddEditSearchComponentProps extends IComponentProps {
    OnTopicChanged?: any;
    OnTagChanged?: any;
    OnDescriptionChanged?: any;
    OnUrlChanged?: any;
}

export interface IAddEditSearch {
    Topic: string;
    Tag: Array<string>;
    URL: string;
    Description: string;
    SubTopicId?: number;
}

export interface IAddEdit {
    data: Array<IRowItem>;
    IsAddLinkButtonEnabled: boolean;
    IsUpdateButtonVisible?: boolean;
}

export interface ILoginParams {
    UserId: string;
    Password: string;
    IsError: boolean;
}

export interface IDictionary<T> {
    [Key: string]: T;
}

export interface ISearchTopicParams {
    Data: Array<any>;
    SearchField: IAddEditSearch;
}