import React, {Component, createRef} from 'react';
import Modal from 'react-modal';
import {connect} from "react-redux";

import {loadKits, setFetchKits, getKits} from '../../../actions/kits';

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
    },
    {
        label: "Theme",
        headerStyle: {width:'249px'},
        entryStyle: {width: '249px'},
        position: 'center',
        field: 'Theme',
        sortable: true,
    },
    {
        label: "Name",
        headerStyle: {width:"calc(100% - 400px)"},
        entryStyle: {width:"calc(100% - 400px)"},
        position: 'left',
        field: 'Name',
        sortable: true,
    }

];

class Kits extends Component {
    displayName = "Kits";

    inputFileRef = createRef();

    loadDataHandler = () => {
        this.inputFileRef.current.click();
    }

    componentDidMount() {
        console.log('component did mount')
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadKits: k => dispatch(loadKits(k)),
        setFetchKits: state => dispatch(setFetchKits(state)),
        getKits: k => dispatch(getKits(k))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Kits)