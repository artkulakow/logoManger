import React, {useState, useRef} from 'react';
import Dropdown from 'react-dropdown';

//import 'react-dropdown/style.scss';
import './MyTableSearchBar.scss';
import '../../css/icons.css';

const MyTableSearchBar = (props) => {
    const [searchType, setSearchType] = useState('text');
    const [searchValue, setSearchValue] = useState('');
    const [searchColumn, setSearchColumn] = useState({value: -1, label: 'Search Column'});
    const [searchMatchCase, setSearchMatchCase] = useState(false);
    const [searchMatchWholeWord, setSearchMatchWholeWord] = useState(false);
    const [searchDropdown, setSearchDropdown] = useState({value: -1, label: 'Search Value', className: 'searchValueDropDown'});
    const searchFieldTextRef = useRef();

    let searchInput;

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
        const {columns} = props;

        const col = columns[selValue.value];
        let sType = col.searchType ? col.searchType : 'text';
        setSearchColumn(selValue);
        setSearchType(sType);

        console.log(`sType: ${sType}`)

        if (sType === 'numeric' || sType === 'dropdown') {
            setSearchValue('');
        }
        else {
            setSearchValue('');
            setSearchMatchCase(false);
            setSearchMatchWholeWord(false);
        }
    }

    const onClickSearch = () => {
        const {columns, search} = props;

        const columnIndex = searchColumn.value;
        const searchField = columns[columnIndex].field;
        const searchType = columns[columnIndex].searchType;

        console.log(`searchType: ${searchType}`)
        if (search) {
            const searchOptions = {};
            if ((searchType !== 'dropdown') || (searchType === 'dropdown' && searchDropdown.value !== -1)) {
                searchOptions.field = searchField;
                searchOptions.value = searchValue;

                if (searchType === 'text') {
                    searchOptions.caseSensitive = searchMatchCase;
                    searchOptions.substring = searchMatchWholeWord;
                }
            }

            search(searchOptions);
        }
    }

    const onKeyPressed = (e) => {
        if (e.key === 'Enter' && searchColumn.value !== -1) {
            onClickSearch();
        }
    }

    const onNumericInput = (e) => {
        const val = (e.target.validity.valid) ? e.target.value : searchValue;
        setSearchValue(val);
    }

    const onClickClear = () => {
        setSearchValue('');
        searchInput.focus();
    }

    const onChangeValueDropdown = (selValue) => {
        setSearchDropdown(selValue)

        setSearchValue(selValue.label);
    }

    const searchValueDisplay = (type, ref) => {
        if (type === 'numeric') {
            return  (
                <div className='searchValueDiv searchValueNumericDiv'>
                    <input 
                        ref={(input) => {searchInput = input;}}
                        className='searchTypeNumeric' 
                        type="text"
                        onInput={onNumericInput}
                        onKeyPress={onKeyPressed}
                        pattern="[0-9]*"
                        value={searchValue}
                        maxLength={10}
                    />
                    <div className="searchFieldClear icon-close" onClick={onClickClear} title="Clear Search"></div>
                </div>
            )

        }
        else if (type === 'dropdown') {
            const {columns} = props;
            const dropData = columns[searchColumn.value].searchDropdownData;
            let options = dropData.map((data, index) => {
                const col = {};
                col.label = data;
                col.value = index;
    
                return col;
            });
            options = [{value: -1, label: 'Search Value', className: 'searchValueDropDown'}, ...options];
        
            return (
                <Dropdown 
                    className='searchValueDropdown'
                    options={options} 
                    onChange={onChangeValueDropdown} 
                    placeholder="placeholder"
                    arrowClosed={<span className="icon-triangle-rounded-dn" />}
                    arrowOpen={<span className="icon-triangle-rounded-up" />}
                    value={searchDropdown}
                />

            )
        }
        else {
            const matchCaseStyle = searchMatchCase ? 'searchFieldMatchCase icon-type-case searchFieldEnabled' : 'searchFieldMatchCase icon-type-case';
            const matchWholeWordStyle = searchMatchWholeWord ? 'searchFieldMatchWholeWord icon-type-edit searchFieldEnabled' : 'searchFieldMatchWholeWord icon-type-edit';

            return  (
                <div className='searchValueDiv searchValueTextDiv'>
                    <input 
                        ref={(input) => {searchInput = input;}}
                        className='searchTypeText' 
                        type="text"
                        onChange={e => setSearchValue(e.target.value)}
                        onKeyPress={onKeyPressed}
                        value={searchValue}
                    />
                    <div className={matchCaseStyle} title="Match Case" onClick={() => setSearchMatchCase(!searchMatchCase)}></div>
                    <div className={matchWholeWordStyle} title="Match Whole Word" onClick={() => setSearchMatchWholeWord(!searchMatchWholeWord)}></div>
                    <div className="searchFieldClear icon-close" onClick={onClickClear} title="Clear Search"></div>
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