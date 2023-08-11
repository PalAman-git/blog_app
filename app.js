const express = require('express');
const app = express();
const cors = require('cors');
const notesRouter = require('./controllers/blogs');
const middleware = require('./utils/middleware')


app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs',notesRouter);

app.use(middleware.unknownEndpoint);//it should be always second last
app.use(middleware.errorHandler);//it should be the last middleware

module.exports = app;