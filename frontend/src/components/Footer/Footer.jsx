import React from 'react';

import './Footer.scss';


class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className="copyright">
                    &copy;Arthur Kulakow 2020
                </div>
                <div className="version">
                    Version:&nbsp;0.1
                </div>
            </footer>
        );
    }
}


export default Footer;

