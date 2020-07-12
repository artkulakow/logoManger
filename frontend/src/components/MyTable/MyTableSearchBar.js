import React, {useState, useRef} from 'react';
import Dropdown from 'react-dropdown';

//import 'react-dropdown/style.scss';
import './MyTableSearchBar.scss';
import '../../css/icons.css';

const MyTableSearchBar = (props) => {
    const [searchType, setSearchType] = useState('text');
    const [searchValue, setSearchValue] = useState('');
    const [searchColumn, setSearchColumn] = useState({value: -1, label: 'Seach Column'})
    const searchFieldTextRef = useRef();

    const options = [];
    const {columns} = props;
    for(let c = 0; c < columns.length; c++) {
        if (columns[c].search) {
            const col = {};
            col.label = columns[c].label;
            col.value = c;

            options.push(col);
        }
    }

    const onChangeColumn = (selValue) => {
        setSearchColumn(selValue);
    }

    const onClickSearch = () => {
        const {columns, search} = props;

        const columnIndex = searchColumn.value;
        const searchField = columns[columnIndex].field;
        console.log(`field: ${searchField}, value: ${searchValue}`)

        if (search) {
            const searchOptions = {};
            searchOptions.field = searchField;
            searchOptions.value = searchValue;

            search(searchOptions);
        }
    }

    const onKeyPressed = (e) => {
        if (e.key === 'Enter' && searchColumn.value !== -1) {
            onClickSearch();
        }
    }

    const searchValueDisplay = (type, ref) => {
        if (type === 'text') {
            
            return  (
                <div className='searchValueDiv'>
                    <input 
                        className='searchTypeText' 
                        ref={ref}
                        type="text"
                        onChange={e => setSearchValue(e.target.value)}
                        onKeyPress={onKeyPressed}
                    />
                </div>
            )
        }
    }

    const searchBtnDisabled = /*searchValue === '' ||*/ searchColumn.value === -1;
    return (
        <div className='myTableSearchBarDiv'>
            <Dropdown 
                className='selectColumn'
                options={options} 
                onChange={onChangeColumn} 
                placeholder="placeholder"
                arrowClosed={<span className="icon-triangle-rounded-dn" />}
                arrowOpen={<span className="icon-triangle-rounded-up" />}
                value={searchColumn}
            />

            {searchValueDisplay(searchType, searchFieldTextRef)}

            <button className='searchButton' disabled={searchBtnDisabled} type='button' onClick={onClickSearch}>Search</button>
        </div>
    )
};

export default MyTableSearchBar;