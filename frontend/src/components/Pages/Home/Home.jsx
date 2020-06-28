import React, {Component, createRef} from 'react';
import Modal from 'react-modal';
import {readString} from 'react-papaparse';
import {connect} from "react-redux";

import {loadKits, setFetchKits} from '../../../actions/kits';

import MyTable from '../../MyTable/MyTable';

import './Home.scss';

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


class Home extends Component {
    displayName = "Home";

    inputFileRef = createRef();

    loadDataHandler = () => {
        this.inputFileRef.current.click();
    }

    handleFile = (e) => {
        const {loadKits, setFetchKits} = this.props;
        const content = e.target.result;
        let convertedData = readString(content, {header: true});

        // add id to the data
        convertedData = convertedData.data.map((data, index) => {
            let newData = data;
            newData.id = index;

            return newData;
            });

        console.log('raw: ', convertedData)

        loadKits(convertedData);

        setFetchKits(false);
    }
    
    onSelectFileHandler = (file) => {
        const {setFetchKits} = this.props;

        setFetchKits(true);

        let fileData = new FileReader();
        fileData.onloadend = this.handleFile;
        fileData.readAsText(file);
    }

    render() {
        const legoFilters = [];
        const legoSelectActions = [];


        console.log(this.props)

        const {kits, fetchKits, selectedKit} = this.props;

        if (selectedKit !== -1) {
            console.log("kit selected: ", selectedKit)
        }


        Modal.setAppElement('body');

        // <Modal
        //     contentLabel="Kit Details"
        //     isOpen={selectedKit !== -1}
        // >
        //     Kit Details
        // </Modal>

        kits.sort((a, b) => {
            a = parseInt(a['Item Number'], 10);
            if (isNaN(a)) {
                a = 0;
            }
            b = parseInt(b['Item Number'], 10);
            if (isNaN(b)) {
                b = 0;
            }
            if (a < b)
                return -1;
            else if (a > b)
                return 1

            return 0;
        })


        return (
            <div className="home">
                <input
                    ref={this.inputFileRef}
                    style={{ display: "none" }}
                    accept=".csv"
                    type="file"
                    onChange={e => {
                        this.onSelectFileHandler(e.target.files[0]);
                    }}
                />

                <div className="header">
                    <div className="label">
                        Art's Lego Collection
                    </div>
                    <div className="btn">
                        <button className="button" onClick={this.loadDataHandler}>Load...</button>
                    </div>
                </div>

                <MyTable
                    columns={legoColumns}
                    filters={legoFilters}
                    multiselect={true}
                    selectActions={legoSelectActions}
                    data={kits}
                    loading={fetchKits}
                    selectEntry={true}
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadKits: k => dispatch(loadKits(k)),
        setFetchKits: state => dispatch(setFetchKits(state)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)