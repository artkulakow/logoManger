import  express from 'express';
import {getKitsList, getKitsThemes, getKitsLocation, getKitDetails, createKit} from '../controllers/kits.js';

const router = express.Router();

/* GET kits listing. */
router.get('/', function(req, res) {
    getKitsList(req, res);
});

// Add a new entry
router.post('/', function(req, res) {
    const {itemNumber, name, theme, quality, location, built, notes} = req.body;

    //createKit()

    res.send('kits - new one added')
})

// get a kit
router.get('/:kitId', function(req, res, next) {
    let kitId = req.params.kitId;
    kitId = parseInt(kitId, 10);

    if (isNaN(kitId)) {
        next();

        return;
    }

    getKitDetails(kitId, req, res);
})

// updata a kit
router.put('/:kitId', function(req, res) {
    res.send(`kits - update a kit --> kitId: ${req.params.kitId}`);
})

// delete a kit
router.delete('/:kitId', function(req, res) {
    res.send(`kits - delete a kit --> kitId: ${req.params.kitId}`);
})

// get themes in loaded kits
router.get('/themes', (req, res, next) => {
    getKitsThemes(req, res, next);
})

// get location of kits
router.get('/locations', (req, res, next) => {
    getKitsLocation(req, res, next);
})

export default router;
