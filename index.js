// express app server
require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');

const authRoutes = require('./api/routes/oauthRoutes');

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.set('trust proxy', 1);

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(morgan('tiny'));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to MongoDB');
});

var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/auth', authRoutes);

app.listen(8090, () => {
    console.log('Server started on port 8090');
});

