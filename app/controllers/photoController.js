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
};

photoController.upload = multer(multerOptions).single('image');


photoController.resize = async (req, res, next) => {
  //check if there is no new file to resize
  if (!req.file) {
    next();
    return; //same as return next();
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  //resize
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  //write to filesystem
  await photo.write(`./public/uploads/${req.body.photo}`);
  next();
}

photoController.savePhoto = async (req, res) => {
  console.log('file', req.file);
  console.log('body', req.body);
  
  const photo = await (new Photo(req.body))
    .save()
    .catch(handleError);
  
  res.redirect(`/myphoto/${req.body.photo}`);
};

photoController.findPhoto = async (req, res) => {
  const pic = await Photo.findOne({ photo: req.params.photo })
  res.send(pic);
}

module.exports = photoController;