const express = require('express');
const router = express.Router();
const path = require('path');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
  }
})

const upload = multer({ storage: storage })

router.get('/', (req, res) => {
    res.send('hello world');
});

router.post('/api/upload', upload.single('example-picture'), (req, res) => {
    res.json(req.file);
})

router.get('/api/getPicture', (req, res) =>{
  const filePath = path.join(__dirname, '../uploads/example-picture-1730909983941-749054028.png')
  res.sendFile(filePath);
})

module.exports = router;