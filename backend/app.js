const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { environment } = require('./config');
const routes = require('./routes');
const {Note} = require('./db/models')
const { ValidationError } = require('sequelize');
const {faker} = require('@faker-js/faker')
const isProduction = environment === 'production';
const app = express();
console.log()
app.use(morgan('dev'));

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
            secure: !isProduction,
            sameSite: !isProduction && 'Lax',
            httpOnly: true,
        },
    })
);
app.post('/testing-save', async(req, res) => {
    const note = await Note.create({body : JSON.stringify(req.body)})
    res.json(note.id)
})
app.get('/testing-get', async(req, res) => {
    let note = await Note.findByPk(502)
    res.json(note)
})

app.use(routes);

app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = 'Resource Not Found';
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});

app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
        err.errors = err.errors.map((e) => e.message);
        err.title = 'Validation error';
    }
    next(err);
});
//Error formatter
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
    });
});

module.exports = app;
