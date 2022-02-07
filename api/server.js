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
server.get('/api/users/:id', async (req, res)=>{
    // res.json({message: "TEST: req user by id"})
    // User.findById(req.params.id)
    //     .then( user => {
    //         // throw new Error("Argh!!!!!!")
    //         // console.log("user -> ", user)
    //         if(!user){
    //             res.status(404).json({message: "The user with the specified ID does not exist"} )
    //         }else{
    //             res.status(200).json(user)
    //         }
    //     })
    //     .catch( err=>{
    //         req.status(500).json({
    //             message: err.message,
    //             err: err.message,
    //             stack: err.stack
    //         })
    //     })

    try{
        const user = await User.findById(req.params.id)
        if(!user){
            res.status(404).json({message: "The user with the specified ID does not exist"} )
        }else{
            res.status(200).json(user)
        }
    }catch(err){
        res.status(500).json({
            message: err.message,
            err: err.message,
            stack: err.stack
        })
    }
})

// [POST]   /api/users     (C of CRUD, create new user from JSON payload)
// TEST ERR: http post :9000/api/users -v 
// TEST ERR: http post :9000/api/users name=foo bar=vooo -v
// TEST ERR: http post :9000/api/users name=foo bar=vooo --verbos
// TEST : http post :9000/api/users name=foo bio=vooo --verbos
server.post('/api/users', async (req, res)=>{
    // res.json({message: "TEST: create by endpoint"})
    // const user = req.body
    // if(!user.name || !user.bio){
    //     res.status(400).json({ message: "Please provide name and bio for the user" })
    // }else{
    //     User.insert(user)
    //         .then( newUser => {
    //             // console.log(stuff)
    //             res.status(201).json(newUser)
    //         })
    //         .catch( err=>{
    //             res.status(500).json({
    //                 message: err.message,
    //                 err: err.message,
    //                 stack: err.stack
    //             })
    //         })
    // } 

    try{
        const user = req.body
        if(!user.name || !user.bio){
            res.status(400).json({ message: "Please provide name and bio for the user" })
        }else{
             const newUser = await  User.insert(user)
            res.status(201).json(newUser)
        }
    }catch(err){
        res.status(500).json({
            message: err.message,
            err: err.message,
            stack: err.stack
        })
    }

 })


 // [PUT]    /api/users/:id (U of CRUD, update user with :id using JSON payload)
// TEST : http get :9000/api/users  -v  ; to get id
// TEST : http put :9000/api/users/sHvJT  name=eee bio=rrr -v
server.put('/api/users/:id', async (req, res)=>{
    // res.json({message: "TEST: update by endpoint"}) 

    try{
        const passibleUser = await User.findById(req.params.id) 
        if(!passibleUser){
            res.status(404).json({message: "The user with the specified ID does not exist"} )
        }else if(!req.body.name || !req.body.bio) {
            res.status(400).json({ message: "Please provide name and bio for the user" })
        } else{
            const updateUser = await User.update(req.params.id, req.body)
            res.status(200).json(updateUser)
        } 
    }catch(err){
        res.status(500).json({
            message: err.message,
            err: err.message,
            stack: err.stack
        })
    }
})

 // [DELETE] /api/users/:id (D of CRUD, remove user with :id)
// TEST : http get :9000/api/users -v ; get id
// TEST : http delete :9000/api/users/7Pg6T -v
 server.delete('/api/users/:id', async (req, res)=>{
    // res.json({message: "TEST: delete by endpoint"}) 
    
    try{
        const passibleUser = await User.findById(req.params.id)
        if(!passibleUser){
            res.status(404).json({
                message: 'The user with the specified ID does not exist'
            })
        }else{
            const deleteUser = await User.remove(passibleUser.id)
            res.status(200).json(deleteUser)
        }
    }catch(err){
        res.status(500).json({
            message: err.message,
            err: err.message,
            stack: err.stack
        })
    }
})

// TEST ok: http get :9000/dfvmdjn
server.use('*', (req, res)=>{
    res.status(404).json({
        message: 'not found'
    })
})
module.exports = server; // EXPORT YOUR SERVER instead of {}
