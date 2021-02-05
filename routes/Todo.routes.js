const express = require('express')
const router = express.Router()

//grab your model 
const TodoModel = require('../models/Todo.model.js')

router.get('/', (req, res) => {
    res.render('landing.hbs')
})

//handling the /todos url request from the browser
router.get('/todos', (req, res) => {
    // fetch all the todos from my database
    TodoModel.find()
        .then((todos) => {
            // please create this page in your views folder
            res.render('todos.hbs', {todos})
        })
        .catch(() => {
            console.log('Something went wrong while finding')
        })
})

// this is a GET route
router.get('/todos/create', (req, res) => {
    // please create this page in your views folder
    res.render('create-form.hbs')
})

// this is a POST route
router.post('/todos/create', (req, res) => {
     //do something here
     // body-parser library will give you a req.body object
     const {myTodo, myDescription} = req.body
     let myNewTodo = {
         name: myTodo,
         description: myDescription
     }

     //create a new todo in your database

     TodoModel.create(myNewTodo)
        .then(() => {
            //sends a page hbs to the user
            // res.render()

            //redirect the user to the /todos page
            // changes the url in the browser
            // like your <a> links
            res.redirect('/todos')


            // if you want to keep the user on the same page
            //and conditionally render something
            //res.render('create-form.hbs', {dataAdded: true})
        })
        .catch(() => {
            console.log('something went wrong creating')
        })
})

//create a route to handle todo details

router.get('/todos/:id', (req, res)=> {
    // grab the todo id from the url
    let id = req.params.id
   
    TodoModel.findById(id)
        .then((todo) => {
            res.render('todo-detail.hbs', {todo})
        })
        .catch(() => {
            console.log('Something went wrong while getting a todo')
        })

})

//handle delete requests 
router.get('/todos/:id/delete', (req, res) => {
    let id = req.params.id
    TodoModel.findByIdAndDelete(id)
        .then(() => {
            // when deleted successfully
            // redirect the user to the /todos page

            res.redirect('/todos')
        })
        .catch(() => {
            console.log('Delete failed!')
        })
})

// handle /todos/:id/edit => show an edit form
// handle edit requests
router.get('/todos/:id/edit', (req, res) => {
    let id = req.params.id

    // get all the todo info to show on the edit form
    TodoModel.findById(id)
        .then((todo) => {
            res.render('edit-form.hbs', {todo})
        })
        .catch(() => {
            console.log('Edit fetch failed!')
        })

})

// handle edit post requests 

router.post('/todos/:id/edit', (req, res) => {
    let id = req.params.id
    const {myTodo, myDescription} = req.body

    let editedTodo = {
        name: myTodo,
        description: myDescription
    }

    TodoModel.findByIdAndUpdate(id, editedTodo )
        .then(() => {
            //redirect to home page
            res.redirect('/todos')
        })
        .catch(() => {
            console.log('Edit failed')
        })
})


module.exports = router