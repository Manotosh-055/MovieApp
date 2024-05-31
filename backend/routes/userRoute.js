const express = require('express');
const { registerUser, loginUser, addMovie, getMovieList, AddToWatch, getWatchedMovie, removeMovieFromWatchlist, removeMovieFromWatched, MoveToWatchlist, addWatch } = require('../controller/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/add-movie', addMovie);
router.post('/add-watch', addWatch);
router.get("/all-list/:id",getMovieList);
router.post('/add-to-watch', AddToWatch);
router.post('/move-to-watch', MoveToWatchlist);
router.get("/all-watched/:id",getWatchedMovie);
router.post('/remove-from-watchlist', removeMovieFromWatchlist);
router.post('/remove-from-watched', removeMovieFromWatched);

module.exports = router;