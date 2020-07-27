import React, {Component} from 'react';
import ReactModal from 'react-modal';
import {connect} from "react-redux";

import {loadKits, setFetchKits, getKits , getKitsThemes, getKitsLocations, getKitDetails} from '../../../actions/kits';

import MyTable from '../../MyTable/MyTable';

import './Kits.scss';
import PopupMenu from '../../../PopupMenu/PopupMenu';

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

    kitsContextMenu = [
        {
            id: 'details',
            label: 'Details',
            tooltip: 'Display Kit Details',
            fontIcon: 'icon-more-details',
        },
        {
            id: 'modify',
            label: 'Modify',
            tooltip: 'Modifiy Selected Kit',
            fontIcon: 'icon-edit-contact',
        },
        {
            id: 'delete',
            label: 'Delete',
            tooltip: 'Delete Selected Kit',
            fontIcon: 'icon-delete-circle',
        }
    ]

    constructor(props) {
        super(props);

        this.state = {
            searchDropdownsLoaded: false,
            showDetailsModal: false,

            xPopupLoc: -1,
            yPopupLoc: -1,
        }
    }

    componentDidMount() {
        const {kitsThemes, kitsLocations, getKitsThemes, getKitsLocations} = this.props;


        if (kitsThemes.length === 0) {
            getKitsThemes();
        }

        if (kitsLocations.length === 0) {
            getKitsLocations();
        }
    }

    componentDidUpdate(prevProps) {
        const {kitsLoading, kitsLocations, kitsThemes} = this.props;

        if (!kitsLocations || !kitsThemes) {
            return;
        }

        if (kitsLoading !== undefined && !kitsLoading) {
            if (kitsThemes.length !== 0 && legoColumns[1].searchDropdownData.length === 0) {
                legoColumns[1].searchDropdownData = [...kitsThemes];
            }

            if (kitsLocations.length !== 0 && legoColumns[3].searchDropdownData.length === 0) {
                legoColumns[3].searchDropdownData = [...kitsLocations];
            }
        }
    }

    kitClickHandler = (index, id, event) => {
        this.setState({
            xPopupLoc: -1,
            yPopupLoc: -1,
        });     

        this.props.getKitDetails(id);
    }

    kitContextMenuHandler = (index, id, event) =>  {
        this.setState({
            xPopupLoc: event.pageX,
            yPopupLoc: event.pageY,
        })
    }

    kitsContextMenuSelectHandler = (menuId) => {
        console.log(`kitsContextMenuSelectHandler: ${menuId}`)
    }

    kitDoubleClickHandler = (index, id, event) => {
        console.log(`kitDoubleClickHandler => index: ${index}, id: ${id}`)
    }

    renderModal = () => {
        const {showDetailsModal} = this.state;

        return (
            <ReactModal
                isOpen={showDetailsModal}
            >
                <div>Hi</div>
            </ReactModal>
        )
    }

    renderPopupMenu = () => {
        const {xPopupLoc, yPopupLoc} = this.state;

        if (xPopupLoc !== -1) {
            return (
                <PopupMenu
                    xLoc={xPopupLoc}
                    yLoc={yPopupLoc}
                    menu={this.kitsContextMenu}
                    onSelect={this.kitsContextMenuSelectHandler}
                />
            );
        }
    }

    render() {
        const legoFilters = [];
        const legoSelectActions = [];

        const {kits, kitsLoading, kitsError, getKits} = this.props;

        return (
            <div className="kits">
                {this.renderModal()}
                {this.renderPopupMenu()}
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
                    loading={kitsLoading === undefined ? false : kitsLoading}
                    loadingError={kitsError}
                    selectEntry={true}
                    fetchDataFunc={getKits}
                    displaySearch={true}
                    toolbar={this.kitsContextMenu}
                    toolbarHandler={this.kitsContextMenuSelectHandler}
                    clickHandler={this.kitClickHandler}
                    contextMenuHandler={this.kitContextMenuHandler}
                    doubleClickHandler={this.kitDoubleClickHandler}
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
        kitDetails: state.kitDetails,
        kitDetailsError: state.kitDetailsError,
        kitDetailsLoading: state.kitDetailsLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadKits: k => dispatch(loadKits(k)),
        setFetchKits: state => dispatch(setFetchKits(state)),
        getKits: k => dispatch(getKits(k)),
        getKitsThemes: k => dispatch(getKitsThemes(k)),
        getKitsLocations: k => dispatch(getKitsLocations(k)),
        getKitDetails: k => dispatch(getKitDetails(k))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Kits)