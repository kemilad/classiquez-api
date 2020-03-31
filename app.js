const express = require('express');
const cors = require('cors');
const connectDB = require('./DbCon/connection');

const authentication = require('./middleware/authenticator');
const auth = require('./route/authentication');
const admin = require('./route/admin');
const movie = require('./route/movie');
const song = require('./route/song');
const book = require('./route/book');
require('dotenv').config();

const app = express();
connectDB();
const port = process.env.PORT;

console.log(`Listening on Port ${port}`);

app.use(cors());

app.use(express.json());
app.use(authentication);
app.use("/api/auth", auth);
app.use("/api/movie", movie);
app.use("/api/song", song);
app.use("/api/book", book);


app.listen(port, () => console.log('server started'));
