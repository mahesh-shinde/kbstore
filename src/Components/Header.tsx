import React from 'react';

class Header extends React.Component {
    constructor(props){
        super(props);
    }

    public render(): JSX.Element {
        return(
            <div role="heading" aria-level={1} className="kbheaderContainer">
                
                <span aria-label="header title" className="headertitle">KB Store</span>
            </div>
        );
    }
}

export default Header;
