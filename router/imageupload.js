const multer = require("multer")
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
const express=require("express")
const router=new express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `public/${req.query.folder}`);
    },
    filename: (req, file, cb) => {
            cb(null, req.body.name);
    },
});


const upload = multer({
    storage: storage
}).single("image")

router.post("/upload",(req, res, next)=>{
    upload(req, res, async (err) => {
        if (err) {
            console.log(err);
        }
        try {
            const inputFilePath = path.join(req.file.path);
            console.log(inputFilePath);
            const folderName = req?.query?.folder;
            const baseFileName = path.basename(inputFilePath, path.extname(inputFilePath))+ Date.now() ;
            const outputFilePath = path.join('public', folderName, baseFileName +'.jpg');
            await sharp(inputFilePath)
                .jpeg({ quality: 80 })
                .toFile(outputFilePath);
            fs.unlink(inputFilePath, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            const data = {
                success: true,
                data: {
                    url: `/public/${folderName}/${baseFileName}.jpg`,
                },
            };
            res.status(200).send(data);
        }catch(error) {
            console.log(error);
            res.status(500).send('Internal server error!');
        }
    });
});

router.post("/delete",(req, res, next) => {
    const filePath = path.join(__dirname,"..",req.body.filepath) 
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(err);
            throw Error("Cannot Delete Image", 500);
        } else {
            const data = {
                success: true,
                data: {
                    message: "File Deleted Successfully",
                },
            };
            res.status(200).send(data);
        }
    });

});

module.exports = router;
