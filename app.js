const express = require('express');
const app = express();
const userController = require('./routes/user.routing');
const movieController = require('./routes/movie.routing');
const PORT = 4000;
const morgan = require('morgan');
const path = require('path');

app.use(express.json());
app.use(morgan('common'));
userController.use("/upload", express.static(path.join(__dirname, "/upload")))
app.use(userController);
app.use(movieController);


app.listen(PORT, () => {
    console.log(`running on http://localhost:${PORT}`)
})