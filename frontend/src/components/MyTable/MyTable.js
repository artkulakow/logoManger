import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import {setSelectedKit} from '../../actions/kits';
//import {MyTableSearchBar} from './MyTableSearchBar';

import Loading from '../Loading/Loading';

import '../../css/icons.css';
import './MyTable.scss';
import MyTableSearchBar from './MyTableSearchBar';

class MyTable extends Component {
    displayName = "MyTable";

    constructor(props) {
        super(props);



        this.state = {
            sortTag: '',
            sortDir: 'ascending', //ascending (default) / descending
            sortType: '',
            filterTag: '',
            filterValue: '',
            filterCaseSensitive : false,
            filterSubstring: false,
        }
    }

    componentDidMount() {
        const {setSelectedKit, columns} = this.props;

        // reset the selected kit
        setSelectedKit(-1);

        for (let c = 0; c < columns.length; c++) {
            if (columns[c].sortOnLoad && columns[c].field) {
                this.setState({
                    sortTag: columns[c].field,
                    sortDir: columns[c].sortDir,
                    sortType: columns[c].sortType,
                }, () => {
                    this.fetchData(columns[c])
                });
            }
        }
    }

    fetchData = () => {
        const {fetchDataFunc} = this.props;

        // fetch the data
        let parms = [];
        const {sortTag, sortDir, sortType, filterTag, filterValue, filterCaseSensitive, filterSubstring} = this.state;
        if (sortTag !== '') {
            if (sortTag !== '') {
                parms.push(`sortTag=${sortTag}`);
                parms.push(`sortDir=${sortDir}`);
                if (sortType !== '') {
                    parms.push(`sortType=${sortType}`)
                }
            }
        }
        if (filterTag !== '' && filterValue !== '') {
            if (filterValue !== '') {
                parms.push(`filterTag=${filterTag}`);
                parms.push(`filterValue=${filterValue}`);
                if (filterCaseSensitive) {
                    parms.push(`filterCaseSensitive=true`);
                }
                if (filterSubstring) {
                    parms.push('filterSubstring=true');
                }
            }
        }

        parms = encodeURI('/?' + parms.join('&'))

        console.log(parms)
        fetchDataFunc(parms);
    }

    selectLineHandler(index) {
        const {setSelectedKit, selectEntry} =  this.props;

        if (selectEntry) {
            setSelectedKit(index);
        }
    }

    onClickHeaderEntry = (c) => {
        const {sortTag, sortDir} = this.state;

        if (c.field === sortTag) {
            this.setState({sortDir: sortDir === 'descending' ? 'ascending' : 'descending'}, () => {
                this.fetchData(c);
            }) 
        }
        else if (c.sortable) {
            this.setState({
                sortDir: 'ascending',
                sortTag: c.field,
                sortType: c.sortType ? c.sortType : '',
            },
            () => {
                this.fetchData();
            })
        }
    }

    doSearch = (searchOptions) => {
        console.log('doSearch')
        this.setState({
            filterTag: searchOptions.field,
            filterValue: searchOptions.value,
            filterCaseSensitive: searchOptions.caseSensitive ? searchOptions.caseSensitive : false,
            filterSubstring: searchOptions.substring ? searchOptions.subString: false,
        },
        () => {
            this.fetchData();
        })
    }


    renderSearchBar() {
        const {columns, displaySearch} = this.props;

        if (displaySearch && columns.some(col => col.search)) {
            return (
                <div>
                    <MyTableSearchBar
                        columns={columns}
                        search={this.doSearch}
                    />
                </div>
            )
        }
    }

    renderHeader() {
        const {columns} = this.props;
        const {sortTag, sortDir} = this.state;

        let sortIcon = 'sortDirArrow icon-triangle-dn';
        if (sortDir === 'descending') {
            sortIcon = 'sortDirArrow icon-triangle-up';
        }


        const renderHeaderEntrySortArrow = (c) => {
            if (c.field === sortTag) {
                return (
                    <div className={sortIcon}></div>
                )
            }

            return
        }

        return (
            <div className="fixedHeader">
                <div className="headerLine">
                    {columns.map((c, index) => (
                        <div key={index} className="headerEntry" style={c.headerStyle} onClick={() => this.onClickHeaderEntry(c)}>
                            {renderHeaderEntrySortArrow(c)}
                            <div className="label">{c.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        )
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
        const {tableStyle} = this.props;

        return (
            <div>
                <div className="myTableDiv" style={tableStyle}>
                    {this.renderSearchBar()}
                    <div className="scrollTable">
                        {this.renderHeader()}

                        {this.renderData()}
                    </div>

                    {this.renderLoading()}
                </div>
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
    fetchDataFunc: PropTypes.func,
    loadingError: PropTypes.object,
    displaySearch: PropTypes.bool,
};

MyTable.defaultProps = {
    multiSelect: false,
    loading: true,
    filters: [],
    selectActions: [],
    data: [],
    tableStyle: {width: '80%'},
    fetchDataFunc: undefined,
    displaySearch: false,
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
