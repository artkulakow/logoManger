import React, {Component, createRef} from 'react';
import Modal from 'react-modal';
import {connect} from "react-redux";

import {loadKits, setFetchKits, getKits , getKitsThemes, getKitsLocations} from '../../../actions/kits';

import MyTable from '../../MyTable/MyTable';

import './Kits.scss';

const legoColumns = [
    {
        label: "Item Number",
        headerStyle: {width:'149px'},
        entryStyle: {width: '149px'},
        position: 'left',
        field: 'Item Number',
        sortable: true,
        sortType: 'number',
        sortOnLoad: true,
        search: true,
        searchType: 'numeric',
    },
    {
        label: "Theme",
        headerStyle: {width:'249px'},
        entryStyle: {width: '249px'},
        position: 'center',
        field: 'Theme',
        sortable: true,
        search: true,
        searchEnableCaseSensitive: true,
        searchType: 'dropdown',
        searchDropdownData: [],
    },
    {
        label: "Name",
        headerStyle: {width:"calc(100% - 675px)"},
        entryStyle: {width:"calc(100% - 659px)"},
        position: 'left',
        field: 'Name',
        sortable: true,
        search: true,
        searchType: 'text',
        searchEnableCaseSensitive: true,
        searchEnableSubstring: true
    },
    {
        label: 'Location',
        headerStyle: {width: '274px'},
        entryStyle: {width: '258px'},
        position: 'left',
        field: 'Location',
        search: true,
        searchType: 'dropdown',
        searchDropdownData: [],
    }

];

class Kits extends Component {
    displayName = "Kits";

    inputFileRef = createRef();

    loadDataHandler = () => {
        this.inputFileRef.current.click();
    }

    componentDidMount() {
        const {kitsThemes, kitsLocations, getKitsThemes, getKitsLocations} = this.props;

        if (kitsThemes.length !== 0 && legoColumns[1].searchDropdownData.length === 0) {
            legoColumns[1].searchDropdownData = [...kitsThemes];
        }

        if (kitsLocations.length !== 0 && legoColumns[3].searchDropdownData.length === 0) {
            legoColumns[3].searchDropdownData = [...kitsLocations];
        }

        if (kitsThemes.length === 0) {
            getKitsThemes();
        }

        if (kitsLocations.length === 0) {
            getKitsLocations();
        }
    }

    render() {
        const legoFilters = [];
        const legoSelectActions = [];

        const {kits, kitsLoading, kitsError, selectedKit, getKits} = this.props;

        if (selectedKit !== -1) {
            console.log("kit selected: ", selectedKit)
        }

        Modal.setAppElement('body');

        return (
            <div className="kits">
                <div className="header">
                    <div className="label">
                        Art's Lego Collection
                    </div>
                </div>

                <MyTable
                    columns={legoColumns}
                    filters={legoFilters}
                    multiselect={true}
                    selectActions={legoSelectActions}
                    data={kits}
                    loading={kitsLoading}
                    loadingError={kitsError}
                    selectEntry={true}
                    fetchDataFunc={getKits}
                    displaySearch={true}
                />

                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        kits: state.kits,
        fetchKits: state.fetchKits,
        selectedKit: state.selectedKit,
        kitsLoading: state.kitsLoading,
        kitsError: state.kitsError,
        kitsThemes: state.kitsThemes,
        kitsLocations: state.kitsLocations,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadKits: k => dispatch(loadKits(k)),
        setFetchKits: state => dispatch(setFetchKits(state)),
        getKits: k => dispatch(getKits(k)),
        getKitsThemes: k => dispatch(getKitsThemes(k)),
        getKitsLocations: k => dispatch(getKitsLocations(k)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Kits)