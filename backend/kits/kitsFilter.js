const kitsFilter = (orgKitList, req) => {
    // copy the array
    let kitList = [...orgKitList];

    // see if there is a sortTab
    const {filterTag, filterValue, filterCaseSensitive, filterSubstring} = req.query;
    let fTag = '';
    let fValue = '';
    let fCaseSensitive = false; // true / false (default)
    let fSubstring = false; // true / false (default)

    fTag = decodeURIComponent(filterTag ? filterTag : fTag);
    fValue = decodeURIComponent(filterValue ? filterValue : fValue);
    fCaseSensitive = filterCaseSensitive ? (filterCaseSensitive === 'true') : fCaseSensitive;
    fSubstring = decodeURIComponent(filterSubstring ? (filterTSubstring === 'true'): fSubstring);

    console.log(`kitsFilter -> filterTag: ${fTag}, filterValue: ${fValue}, filterCaseSensitive: ${fCaseSensitive}, $filterSubstring: ${fSubstring}`)
        
    // only do it if there is a filterTag and filterValue
    if (fTag !== '' && fValue !== '') {
        console.log('filter kits');
        kitList = kitList.filter((kit) => {
            if (kit[fTag]) {
                return kit[fTag] === fValue
            }
        })
    }
    
    console.log(`num filtered: ${kitList.length}`)
    return kitList
}

export default kitsFilter;