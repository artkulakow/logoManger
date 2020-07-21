import React from 'react';

import './errors.scss';

export const formatApiError = (err, title="ApiError") => {
    if (err.isAxiosError) {
        if (!err.response) {
            return (
                <div className="apiErrorMsgDiv">
                    <div className="apiErrorHeading">{title}</div>
                    <div className="apiErrorMsg">Unable to talk to server</div>
                </div>
            )
        }
        else {
            return (
                <div className="apiErrorMsgDiv">
                    <div className="apiErrorHeading">{title}</div>
                    {err.response.statusText.length > 0 &&
                        <div className="apiErrorMsg">{err.response.statusText}</div>
                    }
                    {err.response.data.length > 0 &&
                        <div className="apiErrorMsg">{err.response.data}</div>
                    }
                    <div className="apiErrorMsg">{`Status Code: ${err.response.status}`}</div>
                </div>
            )
        }
    }
}