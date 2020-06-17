import React, {Component, createRef} from 'react';
//import ReactModal from 'react-modal';
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
        sortable: true,
        field: 'Item Number',
    },
    {
        label: "Theme",
        headerStyle: {width:'249px'},
        entryStyle: {width: '249px'},
        position: 'center',
        sortable: true,
        field: 'Theme',
    },
    {
        label: "Name",
        headerStyle: {width:"calc(100% - 400px)"},
        entryStyle: {width:"calc(100% - 400px)"},
        position: 'left',
        sortable: true,
        field: 'Name',
    }

];


class Home extends Component {
    displayName = "Home";

    inputFileRef = createRef();


    loadDataHandler = () => {
        this.inputFileRef.current.click();
    }

    render() {
        const legoFilters = [];
        const legoSelectActions = [];
        const legoData = [
            {
                itemNumber: 123456789,
                theme: 'The theme',
                name: 'This is a kit',
            },
            {
                itemNumber: 123456789,
                theme: 'The theme',
                name: 'This is a kit',
            },
            {
                itemNumber: 123456789,
                theme: 'The theme',
                name: 'This is a kit',
            },
            {
                itemNumber: 123456789,
                theme: 'The theme',
                name: 'This is a kit',
            },
            {
                itemNumber: 123456789,
                theme: 'The theme',
                name: 'This is a kit',
            },
            {
                itemNumber: 123456789,
                theme: 'The theme',
                name: 'This is a kit',
            },
            {
                itemNumber: 123456789,
                theme: 'The theme',
                name: 'This is a kit',
            },
            {
                itemNumber: 123456789,
                theme: 'The theme',
                name: 'This is a kit',
            },
            {
                itemNumber: 123456789,
                theme: 'The theme',
                name: 'This is a kit',
            },
            {
                itemNumber: 123456789,
                theme: 'The theme',
                name: 'This is a kit',
            },
            {
                itemNumber: 123456789,
                theme: 'The theme',
                name: 'This is a kit',
            },
            {
                itemNumber: 123456789,
                theme: 'The theme',
                name: 'This is a kit',
            },
            {
                itemNumber: 123456789,
                theme: 'The theme',
                name: 'This is a kit',
            },
            {
                itemNumber: 123456789,
                theme: 'The theme',
                name: 'This is a kit',
            },
            {
                itemNumber: 123456789,
                theme: 'The theme',
                name: 'This is a kit',
            },
            {
                itemNumber: 123456789,
                theme: 'The theme',
                name: 'This is a kit',
            },
            {
                itemNumber: 123456789,
                theme: 'The theme',
                name: 'This is a kit',
            },
        ];
        const legoDataLoading = false;

        const handleFile = (e) => {
            const {loadKits, setFetchKits} = this.props;
            const content = e.target.result;
            const convertedData = readString(content, {header: true});

            loadKits(convertedData.data);

            setFetchKits(false);
        }
        
        const onChange = (file) => {
            const {setFetchKits} = this.props;

            setFetchKits(true);

            let fileData = new FileReader();
            fileData.onloadend = handleFile;
            fileData.readAsText(file);
        }

        console.log(this.props)

        const {kits, fetchKits} = this.props;

        return (
            <div className="home">
                <input
                    ref={this.inputFileRef}
                    style={{ display: "none" }}
                    accept=".csv"
                    type="file"
                    onChange={e => {
                        onChange(e.target.files[0]);
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
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        kits: state.kits,
        fetchKits: state.fetchKits,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadKits: k => dispatch(loadKits(k)),
        setFetchKits: state => dispatch(setFetchKits(state)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)