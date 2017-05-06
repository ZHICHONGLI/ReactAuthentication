import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

// data models and routes
import Album from './client/app/models/album';
import { getAlbums, getAlbum, postAlbum, deleteAlbum } from './client/app/routes/album';

const app = express();
const port = process.env.PORT || 4300;

// DB connection through mongoose
const options = {
    server: { socketOptions: { keepAlive: 1, connctTimeoutMS: 30000} },
    replset: { socketOptions: { keepAlive: 1, connctTimeoutMS: 30000} }
};
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/react-albums', options);

const db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error: '));

// body-parser and morgan
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/client/dist'));

// Enable CORS so that we can make HTTP request from webpack-dev-server
// I like this part
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// API
app.route('/albums')
    .post(postAlbum)
    .get(getAlbums);

app.route('/album/:id')
    .get(getAlbum)
    .delete(deleteAlbum)
    .put();

// handle all other requests
app.route("*").get((req, res) => {
    res.sendFile('client/dist/index.html', { root: __dirname});
});

app.listen(port);

console.log('ON -- PORT'+ 4300);