const express = require('express');
const multer = require('multer')
const responseJSON = require('./response');
const lasExtractor = require('./las');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({storage: storage});

router.get('/las', upload.array('file'), (req, res) => {
    lasExtractor(req)
        .then(result => {
            res.send(responseJSON(200, 'Upload files seccess', result));
        })
        .catch(err => {
            res.send(responseJSON(500, 'Upload files failed', err));
        });
});

module.exports = router;
