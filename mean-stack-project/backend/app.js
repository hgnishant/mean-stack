const express = require('express');
const { ppid } = require('process');

const app = express();//execute and it will return express app.
// it's just a chain of middleware
app.use((req,res,next)=>{
    console.log('First middleware');
    next();//allows the request to pass to next middlewares in file
    //if u dont use next() and don't send a response as well, it will get stuck here till timeout.
});//to use the middleware function

app.use((req,res,next)=>{
    res.send('Hello from express');
    //not using next() will stop the chain here
});

//to export this app use below syntax:
module.exports = app;//export the entire app with all middlewares
