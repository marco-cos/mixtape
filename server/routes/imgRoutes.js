const { UploadAndRetrieve } = require("../controllers/imgController");
const router = require("express").Router();
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

const upload = multer({ storage: storage });

router.get('/images', UploadAndRetrieve);


module.exports = router;
