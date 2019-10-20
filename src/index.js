const express = require('express');
const path = require('path');
const multer = require('multer');
//const uuidv4 = require('uuid/v4');
var cors = require('cors');

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, /* uuidv4() +  "-originalname-" +*/ file.originalname/* .toLowerCase().trim() */ + ".png");
    }
})

// Initializations
const app = express();
app.use(cors());
// Settings
app.set('port', 3004);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Multer middleware
app.use(multer({
    storage,
    dest: path.join(__dirname, 'public/uploads'),
    limits: { fieldSize: 20000000 }, // 20mb
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        console.log(mimetype + " && " + extname)
        if (mimetype /* && extname */) {
            return cb(null, true)
        }
        cb("Error: archivo invalido")
    }

}).array('file')/* .fields([
    {
        name: 'file',
        maxCount: 3
    },]) *//* .single('file') *//* .array('file') *//* .fields([
    {
        name: 'image',
        maxCount: 3
    },
    {
        name: 'image2',
        maxCount: 3
    },
    {
        name: 'file',
        maxCount: 3
    },
]) *//* .single('image') */);
/* [
    {
        name: 'image',
        maxCount: 2
    },
    {
        name: 'image2',
        maxCount: 2
    }
] */
// Routes
app.use(require('./routes/routes'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})
/*
  files:
   [ { fieldname: 'file',
       originalname: '72742145_2533896076842215_907696674644688896_o.jpg',
       encoding: '7bit',
       mimetype: 'image/jpeg',
       destination:
        'C:\\Users\\redmagic\\Desktop\\server-image-camiones\\server-image-controldecamiones\\src\\public\\uploads',
       filename: '72742145_2533896076842215_907696674644688896_o.jpg.png',
       path:
        'C:\\Users\\redmagic\\Desktop\\server-image-camiones\\server-image-controldecamiones\\src\\public\\uploads\\72742145_2533896076842215_907696674644688896_o.jpg.png',
       size: 183282 },
       mimetype: 'image/jpeg',
       destination:
        'C:\\Users\\redmagic\\Desktop\\server-image-camiones\\server-image-controldecamiones\\src\\public\\uploads',
       filename: 'sample-096dcf911f1e1806214481be42328fa3.jpg.png',
       path:
        'C:\\Users\\redmagic\\Desktop\\server-image-camiones\\server-image-controldecamiones\\src\\public\\uploads\\sample-096dcf911f1e1806214481be42328fa3.jpg.png',
       size: 166775 } ],
  route:
   Route { path: '/upload', stack: [ [Layer] ], methods: { post: true } } }

const imageInfoExampleOfMulterAfterUpload = {
    fieldname: 'image',
    originalname: 'ZMCZ-13181.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    destination:
        'C:\\Users\\redmagic\\Desktop\\server\\server\\src\\public\\uploads',
    filename: '6a8c756b768a15e14b5fd22efc50101e',
    path:
        'C:\\Users\\redmagic\\Desktop\\server\\server\\src\\public\\uploads\\6a8c756b768a15e14b5fd22efc50101e',
    size: 65784
} */