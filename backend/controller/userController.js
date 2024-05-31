const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }

    const userExists = await User.findOne({ email: email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });

    } else {
        res.status(400);
        throw new Error("User not found");
    }
});


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;


    if (!email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }

    const user = await User.findOne({ email: email });

    if (user._id && (await user.matchPassword(password))) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    }
    else {
        console.log("hello");
        res.status(400);
        throw new Error("Invalid Credentials");
    }

});

const addMovie = asyncHandler(async (req, res) => {
    const { pic, moviename, popularity, rdate, des, id } = req.body;
    const user = await User.findOne({ _id: id });

    if (user) {
        user.watchlists.push({
            pic,
            movie_name: moviename,
            release_date: rdate,
            popularity,
            description: des
        });

        await user.save();

        res.status(200).json(user.watchlists);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

const addWatch = asyncHandler(async (req, res) => {
    const { pic, moviename, popularity, rdate, des, id } = req.body;
    const user = await User.findOne({ _id: id });

    if (user) {
        user.watchlists = user.watchlists.filter(movie => movie.movie_name.toString() !== moviename);
        user.watched.push({
            pic,
            movie_name: moviename,
            release_date: rdate,
            popularity,
            description: des
        });

        await user.save();

        res.status(200).json(user.watched);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

const getMovieList = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });

    if (user) {
        res.status(200).json(user.watchlists);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});
const AddToWatch = asyncHandler(async (req, res) => {
    const { movieid, pic, moviename, popularity, rdate, des, userid } = req.body;
    const user = await User.findOne({ _id: userid });


    if (user) {
        user.watchlists = user.watchlists.filter(movie => movie._id.toString() !== movieid);
        user.watched.push({
            pic,
            movie_name: moviename,
            release_date: rdate,
            popularity,
            description: des
        });

        await user.save();

        res.status(200).json(user.watched);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

const getWatchedMovie = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });

    if (user) {
        res.status(200).json(user.watched);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

const removeMovieFromWatchlist = asyncHandler(async (req, res) => {
    const { movieid, userid } = req.body;
    const user = await User.findOne({ _id: userid });

    if (user) {
        user.watchlists = user.watchlists.filter(movie => movie._id.toString() !== movieid);
        await user.save();

        res.status(200).json(user.watchlists);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});
const removeMovieFromWatched = asyncHandler(async (req, res) => {
    const { movieid, userid } = req.body;
    const user = await User.findOne({ _id: userid });

    if (user) {
        user.watched = user.watched.filter(movie => movie._id.toString() !== movieid);
        await user.save();

        res.status(200).json(user.watched);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

const MoveToWatchlist = asyncHandler(async (req, res) => {
    const { movieid, pic, moviename, popularity, rdate, des, userid } = req.body;
    const user = await User.findOne({ _id: userid });


    if (user) {
        user.watched = user.watched.filter(movie => movie._id.toString() !== movieid);
        user.watchlists.push({
            pic,
            movie_name: moviename,
            release_date: rdate,
            popularity,
            description: des
        });

        await user.save();

        res.status(200).json(user.watchlists);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

module.exports = { registerUser, loginUser, addMovie, addWatch, getMovieList, AddToWatch, getWatchedMovie, removeMovieFromWatchlist, removeMovieFromWatched, MoveToWatchlist }