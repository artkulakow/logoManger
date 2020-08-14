import {getAllUsers, getUserDetails, modifyUser, createUser} from '../controllers/users.js';

import  express from 'express';
const router = express.Router();

/* GET users setting. */
router.get('/:userId', function(req, res, next) {
    let userId = req.params.userId;
    userId = parseInt(userId, 10);

    if (isNaN(userId)) {
        next();

        return;
    }

    getUserDetails(userId, req, res);
});

/* Get All Users */
router.get('/', function(req, res) {
    getAllUsers(req, res);
})

/* Modify user setting */
router.put('/:userId', function(req, res) {
    let userId = req.params.userId;
    userId = parseInt(userId, 10);

    modifyUser(userId, req, res);
})

/* Create user */
router.post('/', function(req, res) {
    createUser(req, res);
})

export default router;
