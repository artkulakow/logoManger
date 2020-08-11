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
    console.log(userData.length)
    if (userData.length === 0) {
        loadUserData(userId, req, res)

        return;
    }

    sendUserData(userId, req, res);
}