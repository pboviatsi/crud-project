var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var app = express();

var indexRouter = require('./routes/productsRoutes');

app.use(cors());
app.options('*', cors());

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../Client/build')));
}
app.use(express.static(path.join(__dirname, "../Client/build")));

app.use(express.json());

// routes των προϊόντων
app.use('/products', indexRouter);

app.get('*',async (req,res)=>{
    res.sendFile(path.join(__dirname, "../Client/build/index.html"));
})
// 404 και error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.json({error: err});
});

module.exports = app;
