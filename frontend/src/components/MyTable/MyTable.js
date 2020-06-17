import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Loading from '../Loading/Loading';

import './MyTable.scss';

class MyTable extends Component {
    displayName = "MyTable";

    renderEntry(entryIndex) {
        const {data, columns} = this.props;

        const entry = columns.map((c, cIndex) => {
            let val = data[entryIndex][c.field];
            if (!val)
                val = '--';

            return (
                <div key={entryIndex-cIndex} className="contentEntry" style={c.entryStyle}>
                    <div className="label">
                        {val}
                    </div>
                </div>
            )
        })

        return (
            entry
        )
    }

    renderData() {
        const {data, loading} = this.props;

        if (loading) {
            return;
        }

        return (
            <div className="scrollContent">
                <div className="scrollContentInner">
                    {data.map((d, index) => {
                        const lineStyle = index % 2 === 0 ? 'contentLine alternateRow' : 'contentLine normalRow';

                        return (
                            <div key={index} className={lineStyle}>
                                {this.renderEntry(index)}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    renderLoading() {
        const {loading} = this.props;

        if (loading) {
            return (
                <Loading />
            )
        }
    }

    render() {
        const {columns, tableStyle} = this.props;

        return (
            <div className="myTableDiv" style={tableStyle}>
                <div cellSpacing="0" cellPadding="0" className="scrollTable">
                    <div className="fixedHeader">
                        <div className="headerLine">
                            {columns.map((c, index) => (
                                <div key={index} className="headerEntry" style={c.headerStyle}>
                                    <div className="label">{c.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {this.renderData()}
                </div>

                {this.renderLoading()}
            </div>
        );
    }
}

MyTable.propTypes = {
    columns: PropTypes.array.isRequired,
    filters: PropTypes.array,
    multiSelect: PropTypes.bool,
    selectActions: PropTypes.array,
    data: PropTypes.array,
    loading: PropTypes.bool,
    tableHeight: PropTypes.string,
};

MyTable.defaultProps = {
    multiSelect: false,
    loading: true,
    filters: [],
    selectActions: [],
    data: [],
    tableStyle: {width: '80%'},
};

export default MyTable;