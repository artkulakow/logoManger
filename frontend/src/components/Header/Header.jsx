import React from 'react';
import me from '../../img/me-1.png';

import './Header.scss';

class Header extends React.Component {
    constructor(props) {
        super(props)

        this.state = {showOverlay: false};

        // This binding is necessary to make `this` work in the callback
        this.clickOnContact = this.clickOnContact.bind(this);
    } // constructor

    clickOnContact() {
        console.log('click')
        this.setState({showOverlay: true})
    } // clickOnContact

    render() {
        const showOverlay = this.state.showOverlay;

        return (
            <div className="Header">
                {showOverlay ? (
                    <div className="overlay">
                        <img src={me} className="overlayImg" alt="This is Me"/>
                    </div>
                ) : null}
                <div className="headerContent" onClick={this.clickOnContact}>
                    <img src={me} className="meImg" alt="This is Me"/>
                    <div className="headerText">Art's React Test</div>
                </div>
            </div>
        );
    } // render
}

export default Header;
