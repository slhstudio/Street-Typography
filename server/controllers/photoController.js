const mongoose = require('mongoose');
const Photo = require('../models/photoModel');
const User = require('../models/userModel');
const multer = require('multer');
const uuid = require('uuid');
const jimp = require('jimp');
const fs = require('fs');

const handleError = error => {
  console.warn(error);
  return null;
};

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
};

photoController.savePhoto = async (req, res, error) => {
  req.body.author = req.user.username;
  const photoPromise = new Photo(req.body).save().catch(error);
  //is this useful?? could make user object big if list of photos is long...
  const addToUserPromise = User.findByIdAndUpdate(req.user.id, {
    $addToSet: { photos: req.body.photo }
  });
  const result = await Promise.all([photoPromise, addToUserPromise]);
  res.send(req.body.photo);
};

photoController.findPhoto = async (req, res) => {
  const pic = await Photo.findOne({ photo: req.params.photo });
  res.send(pic);
};

photoController.getAll = async (req, res) => {
  const all = await Photo.find();
  res.send(all);
};

photoController.getMine = async (req, res) => {
  //or could just say: res.send(req.user.photos) --> but that would not get me notes which I'm using for alt tag
  const mine = await Photo.find({ author: req.user.username }, 'photo notes');
  res.send(mine);
};

photoController.update = async (req, res) => {
  const done = await Photo.findOneAndUpdate(
    { photo: req.params.photo },
    req.body
  ).catch(handleError);
  res.send('updated');
};

photoController.deletePhoto = async (req, res, error) => {
  const nixPromise = Photo.findOneAndDelete({ photo: req.params.image }).catch(
    error
  );
  const removeFromUserPromise = User.findByIdAndUpdate(req.user.id, {
    $pull: { photos: req.params.image }
  });
  const result = await Promise.all([nixPromise, removeFromUserPromise]);
  fs.unlink(`./public/uploads/${req.params.image}`, () => {
    console.log('file deleted!');
  });
  res.send('success');
};

photoController.mapPhotos = async (req, res, error) => {
  const coordinates = [req.query.lng, req.query.lat];
  const q = {
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates
        },
        $maxDistance: 10000 //in meters so 10km
      }
    }
  };
  const photos = await Photo.find(q)
    .select('photo location notes')
    .limit(10);
  res.json(photos);
};

module.exports = photoController;
