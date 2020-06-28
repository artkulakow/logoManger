import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import {setSelectedKit} from '../../actions/kits';

import Loading from '../Loading/Loading';

import './MyTable.scss';

class MyTable extends Component {
    displayName = "MyTable";

    constructor(props) {
        super(props);



        this.state = {
            sortColumn: -1,
            sortDirect: '',
        }
    }


    componentDidMount() {
        const {setSelectedKit} = this.props;

        setSelectedKit(-1);
    }

    componentDidUpdate(prevProps, prevState) {
        const {loading, setSelectedKit, fetchKits, columns} = this.props;
        const {sortColumn}  = this.state;

        if (loading) {
            setSelectedKit(-1);

            if (sortColumn !== -1) {
                this.setState(state =>
                    ({
                        sortColumn: -1,
                        sortDirect: ""
                    })
                );
            }
        }

        if (fetchKits) {
            for (let c = 0; c < columns; c++) {
                if (columns[c].sortOnLoad) {
                    if (sortColumn === -1) {
                        this.setState({sortColumn: c})
                    }
                }
            }

            console.log('init')
        }
    }

    selectLineHandler(index) {
        const {setSelectedKit, selectEntry} =  this.props;

        if (selectEntry) {
            setSelectedKit(index);
        }
    }

    renderEntry(entryIndex) {
        const {data, columns} = this.props;

        const entry = columns.map((c, cIndex) => {
            let val = data[entryIndex][c.field];
            if (!val)
                val = '---';

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
        const {data, loading, selectedKit} = this.props;

        if (loading) {
            return;
        }

        return (
            <div className="scrollContent">
                <div className="scrollContentInner">
                    {data.map((d, index) => {
                        let lineStyle = index % 2 === 0 ? 'contentLine alternateRow' : 'contentLine normalRow';
                        if (index === selectedKit) {
                            lineStyle = lineStyle + ' selected';
                        }

                        return (
                            <div key={index} className={lineStyle} onClick={() => this.selectLineHandler(index)}>
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
    selectEntry: PropTypes.bool,
};

MyTable.defaultProps = {
    multiSelect: false,
    loading: true,
    filters: [],
    selectActions: [],
    data: [],
    tableStyle: {width: '80%'},
};

const mapStateToProps = state => {
    return {
        selectedKit: state.selectedKit,
        fetchKits: state.fetchKits,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSelectedKit: k => dispatch(setSelectedKit(k)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTable)
