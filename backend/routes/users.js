import {getUserDetails} from '../controllers/users.js';

import  express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/:userId', function(req, res, next) {

    let userId = req.params.userId;
    userId = parseInt(userId, 10);

    if (isNaN(userId)) {
        next();

        return;
    }

    getUserDetails(userId, req, res);
});

export default router;
