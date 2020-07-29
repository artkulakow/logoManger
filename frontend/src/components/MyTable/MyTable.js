import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import {setSelectedKit} from '../../actions/kits';
import {formatApiError} from '../../utilities/errors';

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
        if (!!sortTag) {
            parms.push(`sortTag=${sortTag}`);
            if (!!sortDir) {
                parms.push(`sortDir=${sortDir}`);
            }
            if (!!sortType) {
                parms.push(`sortType=${sortType}`)
            }
        }
        if (!!filterTag && !!filterValue) {
            parms.push(`filterTag=${filterTag}`);
            parms.push(`filterValue=${filterValue}`);
            if (filterCaseSensitive !== undefined) {
                parms.push(`filterCaseSensitive=${filterCaseSensitive}`);
            }
            if (filterSubstring !== undefined) {
                parms.push(`filterSubstring=${!filterSubstring}`);
            }
        }

        parms = encodeURI('/?' + parms.join('&'))

        fetchDataFunc(parms);
    }

    selectLineHandler(e, index) {
        const {setSelectedKit, selectEntry, clickHandler, data} =  this.props;

        if (selectEntry) {
            setSelectedKit(data[index].id);

            if (clickHandler) {
                clickHandler(index, data[index].id, e);

                e.preventDefault();
                e.stopPropagation();
            }
        }
    }

    onContextMenuHandler = (e, index) => {
        const {setSelectedKit, selectEntry, contextMenuHandler, data} =  this.props;

        if (selectEntry) {
            setSelectedKit(data[index].id);

            if (contextMenuHandler) {
                contextMenuHandler(index, data[index].id, e)

                e.preventDefault();
            }
        }
    }

    onDoubleClickLineHandler = (e, index) => {
        const {setSelectedKit, selectEntry, data, doubleClickHandler} = this.props;

        if (selectEntry) {
            setSelectedKit(data[index].id);

            if (doubleClickHandler) {
                doubleClickHandler(index, data[index].id, e);
            }
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
        this.setState({
            filterTag: searchOptions.field,
            filterValue: searchOptions.value,
            filterCaseSensitive: searchOptions.caseSensitive ? searchOptions.caseSensitive : false,
            filterSubstring: searchOptions.substring ? !searchOptions.subString : false,
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

    renderToolbar = () => {
        const {toolbar, toolbarHandler, selectedKit} = this.props;

        if (toolbar === undefined) {
            return;
        }

        return (
            <div className="toolbarDiv">
                <div className="toolbarIconDiv">
                    {toolbar.map((tool, index) => {
                        let onClickHandler = () => toolbarHandler(tool.id);
                        let iconClassName = 'icon ' + tool.fontIcon;
                        if (selectedKit === -1) {
                            iconClassName += ' notSelected';
                            onClickHandler = null;
                        }

                        return (
                            <div key={index} className={iconClassName} title={tool.tooltip} onClick={onClickHandler}></div>
                        )
                    })}

                </div>
            </div>
        )
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
        const {data, loading, selectedKit, loadingError} = this.props;

        if (loading) {
            return;
        }

        if (!!loadingError) {
            return (
                <div className="scrollContent">
                    <div className="loadingError">{formatApiError(loadingError, "Error fetching List of kits")}</div>
                </div>
            )
        }
        else if (data.length === 0) {
            return (
                <div className="scrollContent">
                    <div className="noKits">No Lego<br></br>Kits Found</div>
                </div>
            )
        }

        return (
            <div className="scrollContent">
                <div className="scrollContentInner">
                    {data.map((d, index) => {
                        let lineStyle = index % 2 === 0 ? 'contentLine alternateRow' : 'contentLine normalRow';
                        if (data[index].id === selectedKit) {
                            lineStyle = lineStyle + ' selected';
                        }

                        return (
                            <div 
                                key={index} 
                                className={lineStyle} 
                                onClick={(e) => this.selectLineHandler(e, index)} 
                                onContextMenu={(e) => this.onContextMenuHandler(e, index)}
                                onDoubleClick={(e) => this.onDoubleClickLineHandler(e, index)}
                            >
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
                    {this.renderToolbar()}
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
    clickHandler: PropTypes.func,
    contextMenuHandler: PropTypes.func,
    doubleClickHandler: PropTypes.func,
    toolbar: PropTypes.array,
    toolbarHandler: PropTypes.func,
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
    clickHandler: undefined,
    contextMenuHandler: undefined,
    doubleClickHandler: undefined,
    toolbar: undefined,
    toolbarHandler: undefined,
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
