import React, {Component} from 'react';
import ReactModal from 'react-modal';
import {connect} from "react-redux";

import {loadKits, setFetchKits, getKits , getKitsThemes, getKitsLocations, getKitDetails} from '../../../actions/kits';

import MyTable from '../../MyTable/MyTable';

import PopupMenu from '../../../PopupMenu/PopupMenu';
import Loading from '../../Loading/Loading';

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

            xPopupLoc: -1,
            yPopupLoc: -1,

            displayDetails: false,
            displayModify: false,
            displayDelete: false,
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
    }

    kitContextMenuHandler = (index, id, event) =>  {
        this.setState({
            xPopupLoc: event.pageX,
            yPopupLoc: event.pageY,
        })
    }

    kitsContextMenuSelectHandler = (menuId) => {
        const {selectedKit, getKitDetails} = this.props;

        console.log(`kitsContextMenuSelectHandler: ${menuId}`)
        switch (menuId) {
            case 'details':
                console.log(`details: ${selectedKit}`);

                // get the details;
                getKitDetails(selectedKit);

                this.setState({
                    xPopupLoc: -1,
                    yPopupLoc: -1,
                    displayDetails: true,
                });
                break;
            case 'modify':
                console.log(`modify: ${selectedKit}`);
                this.setState({
                    displayModify: true,
                    xPopupLoc: -1,
                    yPopupLoc: -1,
                });
                break;
            case 'delete':
                console.log(`delete: ${selectedKit}`);
                this.setState({
                    displayDelete: true,
                    xPopupLoc: -1,
                    yPopupLoc: -1,
                });
                break;
        }
    }

    kitDoubleClickHandler = (index, id, event) => {
        const {selectedKit, getKitDetails} = this.props;

        getKitDetails(selectedKit);

        this.setState({displayDetails: true,});
    }

    closeModalHandler = () => {
        this.setState(
            {

                displayDelete: false,
                displayDetails: false,
                displayModify: false,
            }
        )
    }

    renderDisplayModalYearParts = () => {
        const {kitDetailsLoading, kitDetails} = this.props;

        const year = (kitDetails.yearRelease === undefined) ? '--' : kitDetails.yearRelease;
        const numParts = (kitDetails.numberParts === undefined) ? '--' : kitDetails.numberParts;

        if (!kitDetailsLoading && year !== '--' && numParts !== '--') {
            return (
                <div className="contentLine">
                    <div className="contentEntry year">
                        <div className="entryLabel">Release Year</div>
                        <div className="entryValue">{year}</div>
                    </div>
                    <div className="contentEntry numParts">
                        <div className="entryLabel">Number Pieces</div>
                        <div className="entryValue">{numParts}</div>
                    </div>
                </div>
            )
        }

        return null;
    }

    renderDisplayDetailsCategory = () => {
        const {kitDetailsLoading, kitDetails} = this.props;

        if (!kitDetailsLoading && kitDetails.fullCategoryName !== undefined && kitDetails.fullCategoryName !== '') {
            return (
                <div className="contentLine">
                    <div className="contentEntry">
                        <div className="entryLabel">Category</div>
                        <div className="entryValue">{kitDetails.fullCategoryName}</div>
                    </div>
                </div>
            )
        }

        return null;
    }

    renderDisplayModalDetails = () => {
        const {displayDetails, displayModify, displayDelete} = this.state;
        const {kitDetailsLoading, kitDetails} = this.props;

        console.log('kitDetails: ', kitDetails)
        console.log(`kitDetailsLoading: ${kitDetailsLoading}`)

        let modalHeader = 'The Header';
        let modalContent = (<div>The Content</div>);
        let modalButtons = (<button className="modalBtn" onClick={this.closeModalHandler}>Close</button>);
        if (displayDetails) {
            if (kitDetailsLoading) {
                modalContent = (<Loading/>)
            }
            else {
                const theme = kitDetails.theme === '' ? '--' : kitDetails.theme;
                const name = kitDetails.name === '' ? '--' : kitDetails.name;
                const built = kitDetails.built ? 'True' : 'False';
                const notes = kitDetails.notes === '' ? '--' : kitDetails.notes;

                modalContent = (
                    <div>
                        <div className="contentLine">
                            <div className="contentEntry itemNumber">
                                <div className="entryLabel">Kit Number</div>
                                <div className="entryValue">{kitDetails.itemNumber}</div>
                            </div>

                            <div className="contentEntry theme">
                                <div className="entryLabel">Theme</div>
                                <div className="entryValue">{theme}</div>
                            </div>
                        </div>
                        <div className="contentLine">
                            <div className="contentEntry name">
                                <div className="entryLabel">Name</div>
                                <div className="entryValue">{name}</div>
                            </div>
                        </div>
                        {this.renderDisplayModalYearParts()}
                        {this.renderDisplayDetailsCategory()}
                        <div className="contentLine">
                            <div className="contentEntry location">
                                <div className="entryLabel">Location</div>
                                <div className="entryValue">{kitDetails.location}</div>
                            </div>
                            <div className="contentEntry quality">
                                <div className="entryLabel">Quality</div>
                                <div className="entryValue">{kitDetails.quality}</div>
                            </div>
                            <div className="contentEntry built">
                                <div className="entryLabel">Built</div>
                                <div className="entryValue">{built}</div>
                            </div>
                        </div>
                        <div className="contentLine">
                            <div className="contentEntry notes">
                                <div className="entryLabel">Notes</div>
                                <div className="entryValue multiline">{notes}</div>
                            </div>
                        </div>
                    </div>
                )
            }
        }

        return (
            <ReactModal
                isOpen={displayDetails || displayModify || displayDelete}
                contentLabel="Kit Details"
                className="modalDialog detailsDialog"
                overlanClassName='modalOverlay'
                xonRequestClose={this.closeModalHandler}
            >
                <div className="kitsModals">
                    <div className="modalHeaderDiv">
                        {modalHeader}
                    </div>
                    <hr></hr>
                    <div className="modalContentDiv">
                        {modalContent}
                    </div>

                    <div className="modalBtnDiv">
                        <div className="btnRightDiv">
                            {modalButtons}
                        </div>
                    </div>
                </div>
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
                {this.renderDisplayModalDetails()}
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