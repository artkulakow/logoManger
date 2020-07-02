const kitsSort = (orgKitList, req) => {
    // copy the array
    const kitList = [...orgKitList];

    // see if there is a sortTab
    const {sortTag, sortDir, sortType} = req.query;
    let sTag = '';
    let sDir = 'ascending';  //ascending (default) / descending
    let sType = 'string'; //string (default), number

    // only do it if there is a sortTab
    sTag = decodeURIComponent(sortTag ? sortTag : sTag);
    sDir = sortDir ? sortDir : sDir;
    sType = sortType ? sortType : sType;
    
    console.log(`kitsSort -> sortTag: ${sTag} - ${sortTag}, sortDir: ${sDir}, sortType: ${sType}`)

    if (sTag !== '') {
        console.log('sorting kits')
        if (sType === 'number') {
            kitList.sort((a, b) => {
                a = parseInt(a[sTag], 10);
                if (isNaN(a)) {
                    a = 0;
                }
                b = parseInt(b[sTag], 10);
                if (isNaN(b)) {
                    b = 0;
                }

                if (sortDir === 'descending') {
                    if (a < b)
                        return -1;
                    else if (a > b)
                        return 1
        
                    return 0;
                }
                else {
                    if (a > b)
                        return -1;
                    else if (a < b)
                        return 1
        
                    return 0;
                }
            })
        }
        else {
            kitList.sort((a, b) => {
                a = a[sTag] ? a[sTag].toLowerCase() : '';
                b = b[sTag] ? b[sTag].toLowerCase() : '';

                if (sortDir === 'descending') {
                    if (a < b)
                        return -1;
                    else if (a > b)
                        return 1
        
                    return 0;
                }
                else {
                    if (a < b)
                        return -1;
                    else if (a > b)
                        return 1
        
                    return 0;
                }
            })
        }
    }


    return kitList
}

export default kitsSort;