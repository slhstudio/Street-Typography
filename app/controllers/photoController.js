const mongoose = require ('mongoose');
const Photo = require ('../models/photoModel');
const multer = require('multer');
const uuid = require('uuid');
const jimp = require('jimp');

const handleError =  (error) => {
  console.warn(error);
  return null;
}

const photoController = {};

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
        next({message: 'Please choose a jpeg, png or gif'}, false);
    }
  }
}

photoController.upload = multer(multerOptions).single('photo');

photoController.resize = async (req, res, next) => {
  //console.log('req', req);
  //check if there is no new file to resize
  if (!req.file) {
    next();// skip to the next middleware;
    return; //same as return next();
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  // now we resize
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  // once we have written the photo to our filesystem, keep going!
  next();
}

photoController.savePhoto = async (req, res) => {
  console.log('file', req.file);
  console.log('body', req.body)
  
  const photo = await (new Photo(req.body))
    .save()
    .catch(handleError);
  
  res.json(photo);
};


module.exports = photoController;