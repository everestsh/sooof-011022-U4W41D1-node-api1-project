// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model')
const server = express()
server.use(express.json())

// TEST ok: http get :9000/hello
server.get('/hello', (req, res)=>{
    res.json("hello world")
})

// [GET]    /api/user     (R of CRUD, fetch all dogs)
// TEST : http get :9000/api/users -v
server.get('/api/users', async (req, res)=>{
    // console.log('getting all users')
    // res.json({message: "All array users"})

    // User.find()
    //     .then( users => {
    //         // throw new Error('Argh!!!!!') // TEST ERR
    //         res.status(200).json(users)
    //     })
    //     .catch(err=>{
    //         res.status(500).json({
    //             message: err.message,
    //             err: err.message,
    //             stack: err.stack
    //         })
    //     })
    try{
        // throw new Error('Argh!!!!')
        const users = await User.find()
        res.status(200).json(users)
    }catch(err){
        res.status(500).json({
            message: err.message,
            err: err.message,
            stack: err.stack
        })
    }
})

// [GET]    /api/users/:id (R of CRUD, fetch user by :id)
// http get :9000/api/users -v ; get id
// http get :9000/api/users/7Pg6T -v
server.get('/api/users/:id', (req, res)=>{
    res.json({message: "TEST: req user by id"})
})

// TEST ok: http get :9000/dfvmdjn
server.use('*', (req, res)=>{
    res.status(404).json({
        message: 'not found'
    })
})
module.exports = server; // EXPORT YOUR SERVER instead of {}
