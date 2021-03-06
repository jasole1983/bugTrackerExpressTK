const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const { environment } = require('./config');
const isProduction = environment === 'production';
let morgOpt = isProduction? 'tiny':'dev';
const app = express();

app.use(morgan(morgOpt));
app.use(cookieParser());
app.use(express.json());
if (!isProduction) {
  app.use(cors());
}
app.use(helmet({
    contentSecurityPolicy: false
}));
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true,
            
        },
    })
);  
app.use(routes);

app.use((_req, _res, next) => {
    const err = new Error("OOPS! Something went wrong! ERROR: 404");
    err.title = "UH-OH!! Resource Not Found";
    err.errors = ["OOPS! Something went wrong! ERROR: 404"];
    err.status = 404;
    next(err);
  });

const { ValidationError } = require('sequelize');

app.use((err, _req, _res, next) => {
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
});

app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;