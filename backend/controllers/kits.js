import express from 'express';
import fs from 'fs';
import path, { resolve } from 'path';
import Parse from 'json2csv';
import csv from 'csvtojson';
import e from 'express';

let rawKitList = [];
let rawKitListLoadedAt = -1;
let rawKitListIds = 100;

const kitsDirectory = `../../data/kits/`;
const kitFiles = ['bankerBoxs.csv', 'built.csv', 'onShelfs.csv', 'packs.csv'];

const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.pathname);

const loadKits = (req, res) => {
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

    // let numResolved = 0
    // for(let p = 0; p < prom.length; p++) {
    //     prom[p].then(() => {
    //         numResolved++
    //         console.log(`${p} resolved, num resolved: ${numResolved}`)
    //     })
    // }

    Promise.all(prom).then(result => {
        rawKitListLoadedAt = new Date();

        sendKitsList(req, res)
    })
}

const sendKitsList = (req, res) => {
    res.json({length: rawKitList})
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
