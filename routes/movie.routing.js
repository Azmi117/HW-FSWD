const express = require('express');
const router = express.Router();
const movieController = require('./../controller/movie.controller');

router.get('/movies', movieController.getAllMovie);
router.put('/movies/edit/:id', movieController.updateMovie);
router.get('/movies/:id', movieController.getMovieById);
router.post('/movies/add', movieController.createMovie);
router.delete('/movies/delete/:id', movieController.deleteMovie);

module.exports = router;