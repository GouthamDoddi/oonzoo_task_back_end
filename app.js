import createError from 'http-errors';
import express from 'express';
import path, { dirname } from 'path';
import cookieParser from 'cookie-parser';
import productsRouter from './routes/products.js';
import router from './routes/users.js';
import { fileURLToPath } from 'url';
import cors from 'cors';

// import { fileURLToPath } from 'url';
// import logReq from './middleware/logReq.js';

// var logger = require('morgan');


const app = express();

app.use(cors());

const __dirname = dirname(fileURLToPath(
    import.meta.url,
));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(express.json());
app.use(express.urlencoded({
    extended: false,
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// logging req and res
app.use((req, res, next) => {
    // logReq(req);
    if (req.originalUrl === '/webhook')
        next();
    else
        express.json()(req, res, next);
});

// routes init
app.use('/products', productsRouter);
app.use('/users',  router);


// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((req, res) => {
    // set locals, only providing error in development
    res.locals.message = err;
    res.locals.error = req.app.get('env') === 'development'
        ? 'error'
        : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`server running at ${port}`));

