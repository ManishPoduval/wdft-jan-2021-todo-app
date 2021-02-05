const mongoose = require('mongoose')

// first check if our db is connected
require('../config/db.config.js')

// require the model

let TodoModel = require('../models/Todo.model.js')

// insert into the model
// inserting many documents
TodoModel.insertMany( [ 
    {name: 'Groceries', description: 'Get groceries for today' } , 
    {name: 'Module2', description: 'Teach Express, Handlebars' }
])
    .then(() => {
        console.log('Data seeded')
        // always close the connection after seeding
        // please make sure you require mongoose at the top of the file
        mongoose.connection.close()
    })
    .catch((error) => {
        console.log('Data seeding went wrong!', error)
    })
