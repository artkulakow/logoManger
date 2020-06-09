import React from 'react';
import legoLogo from '../../img/LEGO-Logo-Ani2b.gif';

import './Header.scss';

class Header extends React.Component {
    render() {
        return (
            <div className="Header">
                <div className="headerContent">
                    <img src={legoLogo} className="meImg" alt="Lego"/>
                    <div className="headerText">Art's Lego Manager</div>
                </div>
            </div>
        );
    } // render
}

export default Header;
