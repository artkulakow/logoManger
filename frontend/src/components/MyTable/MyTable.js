import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Loading from '../Loading/Loading';

import './MyTable.scss';

class MyTable extends Component {
    displayName = "MyTable";

    renderEntry(entryIndex) {
        const {data, columns} = this.props;
        console.log('columns: ', columns);
        console.log('data: ', data);

        const entry = columns.map((c, cIndex) => {
            return (
                <td key={entryIndex-cIndex} style={c.entryStyle}>
                    {data[entryIndex][c.field]}
                </td>
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
            <tbody className="scrollContent">
                {data.map((d, index) => {
                    const lineStyle = index % 2 === 0 ? 'alternateRow' : 'normalRow';

                    return (
                        <tr key={index} className={lineStyle}>
                            {this.renderEntry(index)}
                        </tr>
                    )
                })}
            </tbody>
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
                <table cellSpacing="0" cellPadding="0" className="scrollTable">
                    <thead className="fixedHeader">
                        <tr>
                            {columns.map((c, index) => (
                                <th key={index} style={c.headerStyle}>{c.label}</th>
                            ))}
                        </tr>
                    </thead>

                    {this.renderData()}
                </table>

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