import express from 'express';
import fs from 'fs';
import path, { resolve } from 'path';
import Parse from 'json2csv';
import csv from 'csvtojson';

import kitsFilter from '../kits/kitsFilter.js';
import kitsSort from '../kits/kitsSort.js';

let rawKitList = [];
let rawKitListLoadedAt = -1;
let rawKitListIds = 100;
let kitThemes = [];
let kitLocations = [];

const kitsDirectory = `../../data/kits/`;
const cacheDirectory = '../../data/cache/';
const cacheFile = 'kitCache.json';
const kitFiles = ['bankerBoxs.csv', 'built.csv', 'onShelfs.csv', 'packs.csv'];

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
                console.error('Unable to convert kits cache file to json: ', err)
            }
        })

        return;
    }

    console.log('Fresh Data Load')
    const prom = [];
    for (let i = 0; i < kitFiles.length; i++) {
        prom.push(new Promise((resolve, reject) => {
            const fileName = __dirname + '/' + kitsDirectory + kitFiles[i];
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
                console.log('Kits Cache File written')
            }
        })

    })
}

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
        res.json({details: details});
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
