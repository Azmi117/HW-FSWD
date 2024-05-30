const express = require('express');
const app = express();
const userController = require('./routes/user.routing');
const movieController = require('./routes/movie.routing');
const PORT = 4000;
const morgan = require('morgan');

app.use(express.json());
app.use(morgan('common'));
app.use(userController);
app.use(movieController);


app.listen(PORT, () => {
    console.log(`running on http://localhost:${PORT}`)
})