const express = require('express');
const cors = require('cors');
const cookie = require('cookie-parser');

const authRoute = require('./routes/authRoutes');
const userRoute = require('./routes/userRoutes')

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookie());

app.use('/auth', authRoute);
app.use('/users', userRoute);

module.exports = app;