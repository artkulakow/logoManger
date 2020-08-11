// import express from 'express';
import fs from 'fs';
import path, { resolve } from 'path';
// import Parse from 'json2csv';
import csv from 'csvtojson';

import kitsFilter from '../kits/kitsFilter.js';
import kitsSort from '../kits/kitsSort.js';

let rawKitList = [];
let rawKitListLoadedAt = -1;
let rawKitListIds = 100;
let kitThemes = [];
let kitLocations = [];

let kitInfoBlicklinkLoadedAt = -1;
let kitInfoBlicklinkSets = [];
let kitInfoBlicklinkColors = [];
let kitInfoBlicklinkCategories = [];

let kitInfoRebrickableLoadedAt = -1;
let kitInfoRebrickableSets = [];

const kitsDirectory = `../../data/kits/`;
const cacheDirectory = '../../data/cache/';
const cacheFile = 'kitCache.json';
const kitFiles = ['bankerBoxs.csv', 'built.csv', 'onShelfs.csv', 'packs.csv'];

const kitInfoBlicklinkDirectory = '../../data/legoData/blicklink/text/';
const kitInfoBlicklink = ['Sets.txt', 'colors.txt', 'categories.txt'];
const kitInfoBlicklinkCache = ['sets.json', 'colors.json', 'categories.json']

const kitInfoRebrickableDirectory = '../../data/legoData/Rebrickable/';
const kitInfoRebrickable = ['sets.csv'];
const kitInfoRebrickableCache = ['setsRebrickable.json'];

const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.pathname);

const loadKits = (req, res) => {
    const cFile = __dirname + '/' + cacheDirectory + cacheFile;
    if (fs.existsSync(cFile)) {
        console.log('Loading from kit cache file')
        fs.readFile(cFile, (err, cacheData) => {
            if (err) {
                console.error('Unable to read cache file: ' + cFile);
            }

            try {
                const obj = JSON.parse(cacheData);
                rawKitList = obj;

                // process the data
                sendKitsList(req, res);
            }
            catch(err) {
                console.error('Unable to convert kits cache file to json: ', err);
            }
        })

        rawKitListLoadedAt = new Date();

        return;
    }


    const prom = [];
    for (let i = 0; i < kitFiles.length; i++) {
        prom.push(new Promise((resolve, reject) => {
            const fileName = __dirname + '/' + kitsDirectory + kitFiles[i];
            console.log(`Loading fresh kit data file: ${fileName}`)
            fs.readFile(fileName, 'utf-8', (err, data) => {
                if (err) {
                    console.error(`Unable to read file: ${fileName}`)
                    res.json({msg: "read file error", err: err, fileName: fileName});

                    reject(err);
                }
                else {
                    csv()
                    .fromString(data)
                    .then((csvRow) => {
                        csvRow.map(row => {
                            row.built = row.Built.toLowerCase() === 'x';
                            row.id = rawKitListIds++;

                            rawKitList.push(row)
                        })
                        
                        resolve(fileName)
                    })
                }

            })
        }))
    }   

    Promise.all(prom).then(result => {
        rawKitListLoadedAt = new Date();

        // process the data
        sendKitsList(req, res);       

        // cache the file
        const jsonString = JSON.stringify(rawKitList);
        fs.writeFile(cFile, jsonString, err => {
            if (err) {
                console.error("Unable to write kits cache file: " + cFile);
            }
            else {
                console.log('Kits Cache File written');
            }
        })

    })
} // loadKits

const loadkitInfoBlicklink = () => {
    console.log('loadkitInfoBlicklink')

    let infoFound = false;
    for(let i = 0; i < kitInfoBlicklinkCache.length; i++) {
        const infoFile = __dirname + '/' + cacheDirectory + kitInfoBlicklinkCache[i];
        console.log(`kitInfoBlicklinkFile: ${infoFile}`)
        if (fs.existsSync(infoFile)) {
            console.log(`Loading cache kit info file ${infoFile}`);
            fs.readFile(infoFile, (err, cacheData) => {
                if (err) {
                    console.error(`Unable to read cache file: ${infoFile}`);
                }

                try {
                    const obj = JSON.parse(cacheData);
                    if (i === 0) {
                        console.log('kitInfoBlicklinkSets - loaded')
                        kitInfoBlicklinkSets = obj;
                    }
                    else if (i === 1) {
                        console.log('kitInfoBlicklinkColors - loaded')
                        kitInfoBlicklinkColors = obj;
                    }
                    else if (i === 2) {
                        console.log('kitInfoBlicklinkCategories - loaded')
                        kitInfoBlicklinkCategories = obj;
                    }
                }
                catch (err) {
                    console.error(`Unable to convert kit info file: ${infoFile} to json: `, err);
                }
            });

        infoFound = true;
        }
    }

    if (infoFound) {
        kitInfoBlicklinkLoadedAt = new Date();
        
        return;
    }

    const promInfo = [];
    for (let i = 0; i < kitInfoBlicklink.length; i++) {
        console.log(`loading info file: ${kitInfoBlicklink[i]}`)
        promInfo.push(new Promise((resolve, reject) => {
            const fileName = __dirname + '/' + kitInfoBlicklinkDirectory + kitInfoBlicklink[i];
            let kitInfoBlicklinkId = 1;
            console.log(`Loading fresh kit info file: ${fileName}`)
            fs.readFile(fileName, 'utf-8', (err, data) => {
                if (err) {
                    console.error(`Unable to read file: ${fileName}`)

                    reject(err);
                }
                else {
                    data = data.replace(/\t/g, ",");

                    csv()
                    .fromString(data)
                    .then((csvRow) => {
                        csvRow.map(row => {
                            row.id = kitInfoBlicklinkId++;

                            if (i === 0) {
                                // sets
                                const s = {};
                                s.categoryId = parseInt(row['Category ID'], 10);
                                s.categoryName = row['Category Name'];
                                s.number = parseInt(row.Number.slice(0, -2), 10);
                                s.yearRelease = parseInt(row['Year Released'], 10);

                                const weight = row['Weight (in Grams)'];
                                if (weight !== '?') {
                                    s.weightGrams = parseFloat(weight);
                                    s.weightOunces = parseFloat((s.weightGrams * 0.035274).toFixed(2));
                                }

                                let dim = row.Dimensions;
                                dim = dim.split(' x ')
                                if (dim[0] === '?') {
                                    s.widthCm = '?';
                                    s.HeightCm = '?';
                                    s.depthCm = '?';
                                    s.widthInch = '?';
                                    s.HeightInch = '?';
                                    s.depthInch = '?';
                                }
                                else {
                                    s.widthCm = parseFloat(dim[0]);
                                    s.heightCm = parseFloat(dim[1]);
                                    s.depthCm = parseFloat(dim[2]);
                                    s.widthInch = parseFloat((s.widthCm * 0.393701).toFixed(2));
                                    s.heightInch = parseFloat((s.heightCm * 0.393701).toFixed(2));
                                    s.depthInch = parseFloat((s.depthCm * 0.393701).toFixed(2));
                                }
                                s.dimensionsCm = row.Dimensions;
                                s.dimensionsInch = `${s.widthInch} x ${s.heightInch} x ${s.depthInch}`;

                                s.id = kitInfoBlicklinkId++;

                                kitInfoBlicklinkSets.push(s)
                            }
                            else if (i === 1) {
                                // colors
                                const c = {};
                                c.colorId = parseInt(row['Color ID'], 10);
                                c.colorName = row['Color Name'];
                                c.rgb = row.RGB;
                                c.parts = row.Parts;
                                c.inSet = row['In Sets'];
                                c.wanted = row.Wanted;
                                c.forSale = row['For Sale'];
                                c.yearFrom = row['Year From'];
                                c.yearTo = row['Year To'];
                                c.id = kitInfoBlicklinkId++;

                                kitInfoBlicklinkColors.push(c);
                            }
                            else if (i === 2) {
                                // catagegories
                                const c = {}
                                c.categoryId = parseInt(row['Category ID'], 10);
                                c.categoryName = row['Category Name'];
                                c.id = kitInfoBlicklinkId++;

                                kitInfoBlicklinkCategories.push(c);
                            }
                        })
                        
                        resolve(fileName)
                    })
                }

            })
        }))
    } 
    
    Promise.all(promInfo).then(result => {
        kitInfoBlicklinkLoadedAt = new Date();

        // kitInfoBlicklinkSets
        let infoFile = __dirname + '/' + cacheDirectory + 'sets.json';
        let jsonString = JSON.stringify(kitInfoBlicklinkSets);
        fs.writeFile(infoFile, jsonString, err => {
            if (err) {
                console.error("Unable to write kits cache file: " + infoFile);
            }
            else {
                console.log('Kit Info Sets Cache File written');
            }
        })

        // kitInfoBlicklinkColors
        infoFile = __dirname + '/' + cacheDirectory + 'colors.json';
        jsonString = JSON.stringify(kitInfoBlicklinkColors);
        fs.writeFile(infoFile, jsonString, err => {
            if (err) {
                console.error("Unable to write kits cache file: " + infoFile);
            }
            else {
                console.log('Kit Info Colors Cache File written');
            }
        })

        // kitInfoBlicklinkCategories
        infoFile = __dirname + '/' + cacheDirectory + 'categories.json';
        jsonString = JSON.stringify(kitInfoBlicklinkCategories);
        fs.writeFile(infoFile, jsonString, err => {
            if (err) {
                console.error("Unable to write kits cache file: " + infoFile);
            }
            else {
                console.log('Kit Info Categories Cache File written');
            }
        })
    })

} // loadkitInfoBlicklink

const loadkitInfoRebrickable = () => {
    console.log('loadkitInfoRebirckable')

    let infoFound = false;
    for(let i = 0; i < kitInfoRebrickableCache.length; i++) {
        const infoFile = __dirname + '/' + cacheDirectory + kitInfoRebrickableCache[i];
        console.log(`kitInfoRebrickableFile: ${infoFile}`)
        if (fs.existsSync(infoFile)) {
            console.log(`2 - Loading cache kit info file ${infoFile}`);
            fs.readFile(infoFile, (err, cacheData) => {
                if (err) {
                    console.error(`Unable to read cache file: ${infoFile}`);
                }

                try {
                    const obj = JSON.parse(cacheData);
                    if (i === 0) {
                        console.log('kitInfoRebrickableSets - loaded')
                        kitInfoRebrickableSets = obj;
                    }
                }
                catch (err) {
                    console.error(`Unable to convert kit info file: ${infoFile} to json: `, err);
                }
            });

        infoFound = true;
        }
    }

    if (infoFound) {
        kitInfoRebrickableLoadedAt = new Date();
        
        return;
    }

    const promInfo = [];
    for (let i = 0; i < kitInfoRebrickable.length; i++) {
        console.log(`loading info file: ${kitInfoRebrickable[i]}`)
        promInfo.push(new Promise((resolve, reject) => {
            const fileName = __dirname + '/' + kitInfoRebrickableDirectory + kitInfoRebrickable[i];
            let kitInfoRebrickableId = 1;
            console.log(`Loading fresh kit info file: ${fileName}`)
            fs.readFile(fileName, 'utf-8', (err, data) => {
                if (err) {
                    console.error(`Unable to read file: ${fileName}`)

                    reject(err);
                }
                else {
                    data = data.replace(/\t/g, ",");

                    csv()
                    .fromString(data)
                    .then((csvRow) => {
                        csvRow.map(row => {
                            const s = {};
                            s.id = kitInfoRebrickableId++;
                            s.setNumber = parseInt(row.set_num.slice(0, -2), 10);
                            s.name = row.name;
                            s.year = parseInt(row.year, 10);
                            s.themeId = parseInt(row.theme_id, 10);
                            s.numberParts = parseInt(row.num_parts, 10);

                            kitInfoRebrickableSets.push(s)
                        })
                        
                        resolve(fileName)
                    })
                }
            })
        }))
    }
    
    Promise.all(promInfo).then(result => {
        kitInfoRebrickableLoadedAt = new Date();

        // kitInfoRebrickableSets
        let infoFile = __dirname + '/' + cacheDirectory + 'setsRebrickable.json';
        let jsonString = JSON.stringify(kitInfoRebrickableSets);
        fs.writeFile(infoFile, jsonString, err => {
            if (err) {
                console.error("Unable to write kits cache file: " + infoFile);
            }
            else {
                console.log('Kit Info Sets Cache File written');
            }
        })
    })
} // loadkitInfoRebrickable



const sendKitsList = (req, res) => {
    // filter
    let kitList = kitsFilter(rawKitList, req);

    // sort
    kitList = kitsSort(kitList, req);

    // only send the fields needed
    kitList = kitList.map((kit) => {
        const k = {};
        k.id = kit.id;
        k["Item Number"] = kit["Item Number"];
        k["Theme"] = kit["Theme"];
        k["Name"] = kit["Name"];
        k["Location"] = kit["Location"];

        return k;
    })
    
    res.json({kits: kitList});
    // res.statusMessage = "send help!!!"
    // res.status(333).send('There seems to be an error').end()
}

export const getKitsList = (req, res) => {
    if (kitInfoBlicklinkLoadedAt === -1) {
        loadkitInfoBlicklink();
    }

    if (kitInfoRebrickableLoadedAt === -1) {
        loadkitInfoRebrickable();
    }

    if (rawKitListLoadedAt === -1) {
        loadKits(req, res);
    }
    else {
        sendKitsList(req, res)      
    }
}

export const createKit = (req, res) => {
    console.log('get kits list')
}

export const getKitDetails = (kitId, req, res) => {
    const details = rawKitList.find((kit) => kit.id === kitId);
    if (details === undefined) {
        res.status(404).end();
        res.statusMessage = "Kit Not Found";
    }
    else {
        const kitNum = parseInt(details['Item Number'], 10);
        const set = kitInfoBlicklinkSets.find((s) => s.number === kitNum);
        let cat = undefined;
        if (set !== undefined) {
            cat = kitInfoBlicklinkCategories.find((c) => c.categoryId === set.categoryId);
        }

        const setRebrickable = kitInfoRebrickableSets.find((s) => s.setNumber === kitNum);

        const d = {};       
        d.itemNumber = parseInt(details['Item Number'], 10);
        d.quality = parseInt(details['Quality'], 10);
        d.theme = details['Theme'];
        d.name = details['Name'];
        d.location = details['Location'];
        d.notes = details['Notes'];
        d.built = details['built'];

        if (set !== undefined) {
            d.yearRelease = set.yearRelease;
            d.weightGrams = set.weightGrams;
            d.weightOunces = set.weightOunces;
            d.widthCm = set.widthCm;
            d.widthInch = set.widthInch;
            d.heightCm = set.heightCm;
            d.heightInch = set.heightInch;
            d.depthCm = set.depthCm;
            d.depthInch = set.depthInch;
            d.fullCategoryName = set.categoryName;
        }

        if (cat !== undefined) {
            d.shortCategoryName = cat.categoryName;
        }

        if (setRebrickable !== undefined) {
            d.numberParts = setRebrickable.numberParts;

            if (d.yearRelease === undefined) {
                d.yearRelease = setRebrickable.year;
            }
        }

        res.json({details: d});
    }
}

export const getKitsThemes = (req, res, next) => {
    if (kitThemes.length === 0) {
        for(let k = 0; k < rawKitList.length; k++) {
            const theme = rawKitList[k].Theme;
            if (theme === '') {
                continue;
            }

            if (!kitThemes.includes(theme)) {
                kitThemes.push(theme);
            }
        }

        kitThemes.sort();
    }

    res.json({kitsThemes: kitThemes});
}

export const getKitsLocation = (req, res, next) => {
    if (kitLocations.length === 0) {
        for(let k = 0; k < rawKitList.length; k++) {
            const location = rawKitList[k].Location;
            if (location === '') {
                continue;
            }

            if (!kitLocations.includes(location)) {
                kitLocations.push(location);
            }
        }

        kitLocations.sort();
    }

    res.json({kitsLocations: kitLocations});

}
