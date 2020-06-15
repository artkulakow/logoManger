import React, {Component} from 'react';

import './Loading.scss';

class Loading extends Component {
    displayName = "MyTable";

    render() {
        return (
            <div className="loadingDiv">
                <div className="loading"></div>
            </div>
        );
    }
}

export default Loading;