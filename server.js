import express from 'express';
import viewEngine from './src/config/viewEngine';
import initRouter from './src/routes/web';
import bodyParse from 'body-parser';
require("dotenv").config();
let app = express();
// var cors = require('cors');

//config view engine

viewEngine(app);

//parse request to json
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

initRouter(app);


// use it before all route definitions
// app.use(cors({ origin: 'http://localhost:3333' }));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3333');

    // // Request methods you wish to allow
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // // Request headers you wish to allow
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // // Set to true if you need the website to include cookies in the requests sent
    // // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
let port = process.env.PORT || 3333
app.listen(port, () => {
    console.log("started")
})
