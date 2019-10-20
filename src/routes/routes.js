const { Router } = require('express');
const router = Router();
const fs = require('fs');
const stream = require('stream');
const path = require('path');

// Routes
router.get('/', (req, res) => {
    res.render('index');
});

router.post('/upload', (req, res) => {
    console.log(req.files);
    //res.send(req.file)
    res.send(req.files)
});
router.get('/upload/image/:id', (req, res) => {
    //res.send(`Get Image Name with id ${req.params.id}`)
    const pat = path.join(__dirname, `../public/uploads/${req.params.id}`)
    const r = fs.createReadStream(pat) // or any other way to get a readable stream
    const ps = new stream.PassThrough() // <---- this makes a trick with stream error handling
    stream.pipeline(
        r,
        ps, // <---- this makes a trick with stream error handling
        (err) => {
            if (err) {
                console.log(err) // No such file or any other kind of error
                return res.sendStatus(400);
            }
        })
    ps.pipe(res) // <---- this makes a trick with stream error handling
});
router.put('/upload/image/:id', (req, res) => {
    res.send(req.file)
});

module.exports = router;