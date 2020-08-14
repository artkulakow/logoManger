import fs from 'fs';
import path from 'path';

let userData = [];

const cacheDirectory = '../../data/cache/';
const cacheUsersFile = 'users.json';

const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.pathname);

const sendUserData = (userId, req, res) => {
    const userIndex = userData.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
        res.statusMessage = `User id ${userId} not found`
        res.status(404).send(`User id ${userId} not found`).end()

        return
    }

    res.json({user: userData[userIndex]});
}

const loadUserData = (userId, req, res) => {
    const cFile = __dirname + '/' + cacheDirectory + cacheUsersFile;
    if (fs.existsSync(cFile)) {
        console.log('Loading from users cache file')
        fs.readFile(cFile, (err, cacheData) => {
            if (err) {
                console.error('Unable to read cache file: ' + cFile);
            }

            try {
                const obj = JSON.parse(cacheData);
                userData = obj;

                // process the data
                sendUserData(userId, req, res);
            }
            catch(err) {
                console.error('Unable to convert kits cache file to json: ', err);
            }
        })

        return;
    }
}

export const getUserDetails = (userId, req, res) => {
    if (userData.length === 0) {
        loadUserData(userId, req, res)

        return;
    }

    sendUserData(userId, req, res);
}

const modifyUserData = (userId, req, res) => {
    const userIndex = userData.findIndex((user) => user.id === userId);
    const payload = req.body;

    // make sure the user id exists 
    if (userIndex === -1) {
        res.statusMessage = `User id ${userId} not found`
        res.status(404).send(`User id ${userId} not found`).end()

        return
    }

    // make sure the email address is unique, if changing
    if (payload.email) {
        const email = payload.email;
        const emailIndex = userData.findIndex((user) => user.email === email);
        if (emailIndex !== -1 && emailIndex !== userIndex) {
            res.statusMessage = `Email ${email} is not unique`
            res.status(404).send(`Email ${email} is not unique`).end()
    
            return
            }
    }

    userData[userIndex] = {...userData[userIndex], ...payload};
    const dt = new Date();
    userData[userIndex].modifyDate = (`${
        dt.getFullYear().toString().padStart(4, '0')}-${
        (dt.getMonth() + 1).toString().padStart(2, '0')}-${
        dt.getDate().toString().padStart(2, '0')} ${
        dt.getHours().toString().padStart(2, '0')}:${
        dt.getMinutes().toString().padStart(2, '0')}:${
        dt.getSeconds().toString().padStart(2, '0')}`
    );

    // update the cache
    const cFile = __dirname + '/' + cacheDirectory + cacheUsersFile;
    const jsonString = JSON.stringify(userData);
    fs.writeFile(cFile, jsonString, err => {
        if (err) {
            console.error("Unable to write kits cache file: " + cFile);
        }
        else {
            console.log('Kits Cache File written');
        }
    })
    
    res.json({user: userData[userIndex]});
}

export const modifyUser = (userId, req, res) => {
    if (userData.length == 0) {
        const cFile = __dirname + '/' + cacheDirectory + cacheUsersFile;
        if (fs.existsSync(cFile)) {
            console.log('Loading from users cache file')
            fs.readFile(cFile, (err, cacheData) => {
                if (err) {
                    console.error('Unable to read cache file: ' + cFile);
                }
    
                try {
                    const obj = JSON.parse(cacheData);
                    userData = obj;
    
                    // process the data
                    modifyUserData(userId, req, res);
                }
                catch(err) {
                    console.error('Unable to convert kits cache file to json: ', err);
                }
            })
        }

        return;
    }

    modifyUserData(userId, req,res);
}

export const createUser = (req, res) => {
    console.log('create ser!!!')
}