const db = require('../models');
const send = require('send');
const Movie = db.Movie

class MovieController {
    static getAllMovie = async (req, res) => {
        const movie = await Movie.findAll();
        return res.json({ data: movie });
    };

    static getMovieById = async (req, res) => {
        const movie = await Movie.findByPk(req.params.id)

        if(!movie) return res.status(404).json({message: 'Not found'});

        return res.json({ data: movie });
    }
    static createMovie = async (req, res) => {
        try{
            const movie = await Movie.create({
                title: req.body.title,
                genres: req.body.genres,
                year: req.body.year
            });
            res.status(201).json(movie);
        }
        catch(err){
            res.status(500).send(err.message);
        }
    }
    static updateMovie = async (req, res) => {
        try{
            const movie = await Movie.findByPk(req.params.id);
            if(!movie) return res.status(404).send('User Not Found');

            movie.title = req.body.title;
            movie.genres = req.body.genres;
            movie.year = req.body.year;
            await movie.save();

            res.json(movie);

        }catch (err){
            res.status(500),send(err.message);
        }
    
    };
    static deleteMovie = async (req, res) => {
        try{
            const movie = await Movie.findByPk(req.params.id);
            if(!movie) return res.status(404).send('User Not Found');

            await movie.destroy();
            res.json(movie);

        }catch (err){
            res.status(500),send(err.message);
        }
    
    };
}

module.exports = MovieController;