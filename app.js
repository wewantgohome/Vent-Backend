const express = require('express');
const app = express.Router();
require('dotenv').config();
const port = process.env.PORT;
const router = require('./routes');


app.use(express.json());
app.use('/', router);


app.listen(port, ()=>{
    console.log("http://localhost:8080 listen..");
})