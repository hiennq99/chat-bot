import express from 'express';
import viewEngine from './src/config/viewEngine';
import initRouter from './src/routes/web';
import bodyParse from 'body-parser';
require("dotenv").config();
let app = express();

//config view engine

viewEngine(app);

//parse request to json
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

initRouter(app);

let port = process.env.PORT || 3333
app.listen(port, () => {
    console.log("abc")
})
