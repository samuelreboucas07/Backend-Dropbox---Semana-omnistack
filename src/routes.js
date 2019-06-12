const express = require('express')
const routes = express.Router()
const multer = require('multer')
const multerConfig = require('./config/multer')

const BoxController = require('./controllers/boxController')
const FileController = require('./controllers/fileController')

routes.post("/boxes", BoxController.create);
routes.get("/boxes/:id", BoxController.show)

routes.post("/boxes/:id/file", multer(multerConfig).single('file'), FileController.create)

module.exports = routes;