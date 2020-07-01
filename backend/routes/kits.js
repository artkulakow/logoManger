import  express from 'express';
import {getKitsList, getKitsThemes, createKit} from '../controllers/kits.js';

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
    const kitId = req.params.kitId;

    if (kitId === 'themes') {
        next();

        return;
    }

    res.send(`kits - get a kits details --> kitId: ${req.params.kitId}`);
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

export default router;
