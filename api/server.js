// BUILD YOUR SERVER HERE
const express = require('express');

const server = express()
server.use(express.json())

// TEST ok: http get :9000/hello
server.get('/hello', (req, res)=>{
    res.json("hello world")
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
