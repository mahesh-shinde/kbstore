import React from 'react';
import $ from 'jquery';

class TagInputComponent extends React.Component<any> {
    private inputValue: Array<string> = [];

    constructor(props) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <div id="tags">
                <input aria-valuemax={10} maxLength={10} onMouseOut={(e) => this.HandleClick(e)} onKeyUp={(e) => this.OnKeyUpEvent(e)} id="textId" type="text" />
            </div>
        );
    }

    componentDidMount() {
        $(document).on('click', '.tag', (e) => {
            this.inputValue && this.inputValue.splice(this.inputValue.indexOf(e.target.value), 1);
            $(e.target).remove();
            this.OnItemUpdate && this.OnItemUpdate();
        });
    }

    componentWillUnmount() {
        $(".tag").unbind();
    }

    private ClearInput() {
        var tagInputs = document.querySelectorAll('.tag');
        for (var i = 0; i < tagInputs.length; i++) {
            var element = tagInputs[i] as HTMLSpanElement;
            element.remove();
        }
        this.inputValue = [];
    }

    private OnKeyUpEvent = (e) => {
        if (/(188|13)/.test(e.which))
            this.HandleClick(e);
    }

    private HandleClick = (event) => {
        var value = event.target.value;
        var text = value.replace(/[^a-zA-Z0-9\+\-\.\#]/g, '');
        if (text) {
            $(event.target).before('<span class="tag">' + text + '</span>');
            this.inputValue.push(text);
            this.OnItemUpdate();
        }
        event.target.value = "";
        event.target.focus();

    }

    private OnItemUpdate = () => {
        this.props.OnItemUpdate(this.inputValue);
    }
}

export default TagInputComponent;
