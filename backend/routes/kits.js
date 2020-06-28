import  express from 'express';
import {getKitsList, createKit} from '../controllers/kits.js';

const router = express.Router();

/* GET kits listing. */
router.get('/', function(req, res) {
    getKitsList(req, res)

//   res.send('kits - get list');
//   let sTag = '';
//   let sDir = 'descending';
//   let fValue = '';
//   let fTag = '';
//   const {sortTag, sortDir, filterValue, filterTag} = req.query;

//   sTag = sortTag ? sortTag : sTag;
//   sDir = sortDir ? sortDir : sDir;
//   fValue = filterValue ? filterValue : fValue;
//   fTag = filterTag ? filterTag : fTag;

//   console.log(`get kits - tags -> sortTag: ${sTag}, sortDir: ${sDir}, filterTag: ${fTag}, filterValue: ${fValue}`);
});

// Add a new entry
router.post('/', function(req, res) {
    const {itemNumber, name, theme, quality, location, built, notes} = req.body;

    //createKit()

    res.send('kits - new one added')
})

// get a kit
router.get('/:kitId', function(req, res) {
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

export default router;
