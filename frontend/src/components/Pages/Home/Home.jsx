import React, {Component} from 'react';

import MyTable from '../../MyTable/MyTable';

import './Home.scss';

class Home extends Component {
    displayName = "Home";

    render() {
        const legoColumns = [
            {
                label: "Item Number",
                headerStyle: {width:'150px'},
                entryStyle: {width: '150px'},
                position: 'left',
                sortable: true,
                field: 'itemNumber',
            },
            {
                label: "Theme",
                headerStyle: {width:'250px'},
                entryStyle: {width: '250px'},
                position: 'center',
                sortable: true,
                field: 'theme',
            },
            {
                label: "Name",
                headerStyle: {width:"calc(100% - 400px)"},
                entryStyle: {width:"calc(100% - 400px)"},
                position: 'left',
                sortable: true,
                field: 'name',
            }

        ];

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

        return (
            <div className="home">
                <div className="header">
                    Art's Lego Collection
                </div>

                <MyTable
                    columns={legoColumns}
                    filters={legoFilters}
                    multiselect={true}
                    selectActions={legoSelectActions}
                    data={legoData}
                    loading={legoDataLoading}
                />
            </div>
        );
    }
}


export default Home;