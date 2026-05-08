require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');

const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

const connectDB = require('./config/db');

const app = express();

connectDB();

require('./config/passport')(passport);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride('_method'));
app.use(express.static('public'));

app.use(expressLayouts);
app.set('layout', './layouts/layout');
app.set('view engine', 'ejs');

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'medicarehubsecret',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use('/', require('./routes/authRoutes'));
app.use('/', require('./routes/appointmentRoutes'));
app.use('/api', require('./routes/apiRoutes'));

app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});