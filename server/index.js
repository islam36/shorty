require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const usersRouter = require('./routes/usersRouter');
const authRouter = require('./routes/authRouter');
const linksRouter = require('./routes/LinksRouter');
const mainRouter = require('./routes/mainRouter');
const shortLinkRouter = require('./routes/shortLinksRouter');
const {PORT, DB_URL} = process.env;
const cors = require('cors');
const app = express();

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then((connection) => {
    console.log("connected to the database");
}).catch((err) => {
    console.log("error while connection to database: " + err);
});

const FRONTEND_PATH = path.join(__dirname, '..', 'dist');

app.use(cors());
app.use(express.json());
app.use(express.static(FRONTEND_PATH));
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/links', linksRouter);
app.use('/main', mainRouter);
app.use('/', shortLinkRouter);

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});