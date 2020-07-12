const kitsFilter = (orgKitList, req) => {
    // copy the array
    let kitList = [...orgKitList];

    // see if there is a sortTab
    const {filterTag, filterValue, filterCaseSensitive, filterSubstring} = req.query;
    let fTag = '';
    let fValue = '';
    let fCaseSensitive = undefined; // true / false (default)
    let fSubstring = undefined; // true / false (default)

    fTag = decodeURIComponent(filterTag ? filterTag : fTag);
    fValue = decodeURIComponent(filterValue ? filterValue : fValue);
    fCaseSensitive = filterCaseSensitive ? (filterCaseSensitive === 'true') : false;
    fSubstring = filterSubstring ? (filterSubstring === 'true'): false;

    console.log(`kitsFilter -> filterTag: ${fTag}, filterValue: ${fValue}, filterCaseSensitive: ${fCaseSensitive}, $filterSubstring: ${fSubstring}`)
        
    // only do it if there is a filterTag and filterValue
    if (fTag !== '' && fValue !== '') {
        console.log('filter kits');
        const val = fCaseSensitive ? fValuetoLowerCase : fValue;
        kitList = kitList.filter((kit) => {
            if (kit[fTag]) {
                const listTag = fCaseSensitive ? kit[fTag].toLowerCase : kit[fTag];
                
                if (fSubstring) {
                    return listTag.includes(val)
                }

                return listTag === val;
            }
        })
    }
    
    console.log(`num filtered: ${kitList.length}`)
    return kitList
}

export default kitsFilter;