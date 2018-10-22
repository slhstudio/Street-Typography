const mongoose = require ('mongoose');
const Photo = require ('../models/photoModel');
const User = require('../models/userModel');
const multer = require('multer');
const uuid = require('uuid');
const jimp = require('jimp');

const handleError = (error) => {
  console.warn(error);
  return null;
}

const photoController = {};

const storage = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
        next(null, false);
    }
  }
};

photoController.upload = multer(storage).single('image');

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
  req.body.author = req.user.username;
  const photoPromise = new Photo(req.body)
    .save()
    .catch(handleError);
  //is this useful?? could make user object big if list of photos is long...
  const addToUserPromise = User
    .findByIdAndUpdate(req.user.id, { $addToSet: { photos: req.body.photo }});
  const result = await Promise.all([photoPromise, addToUserPromise]);
  res.send(req.body.photo);
};

photoController.findPhoto = async (req, res) => {
  const pic = await Photo.findOne({ photo: req.params.photo })
  res.send(pic);
}

photoController.getAll = async (req, res) => {
  const all = await Photo.find();
  res.send(all);
}

photoController.getMine = async (req, res) => {
  //or could just say: res.send(req.user.photos) --> but that would not get me notes which I'm using for alt tag
  const mine = await Photo.find({ author : req.user.username }, 'photo notes')
  res.send(mine);
}

photoController.update = async (req, res) => {
  const done = await Photo.findOneAndUpdate({ photo: req.params.photo }, req.body)
    .catch(handleError);
  res.send('updated');
}

photoController.deletePhoto = async (req, res) => {
  const nix = await Photo.findOneAndDelete({photo: req.params.image})
    .catch(handleError);
  res.send('success')
};

module.exports = photoController;