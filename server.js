const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3000
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todoDb'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

    app.set('view engine', 'ejs')
    app.use(express.static('public'))
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    app.listen(process.env.PORT || PORT, ()=>{
        console.log(`this server is running on port ${PORT}`);
    })  


    app.get('/',async (req, res)=>{
        const todoItems = await db.collection('todos').find().toArray()
        res.render('index.ejs', { todoItem: todoItems})
        })


        app.put('/markDone', (req, res) => {
            db.collection('todos').updateOne({todoInput: req.body.todoInput},{
                $set: {
                    completed: true
                  }
                },{
                    upsert: false    
            })
            .then(result => {
                console.log('Marked as done')
                res.json('Marked as done')
            })
            .catch(error => console.error(error))
        })
  


        app.put('/unComplete', (req, res) => {
            db.collection('todos').updateOne({todoInput: req.body.todoInput},{
                $set: {
                    completed: false
                  }
            },{
                upsert: false
            })
            .then(result => {
                console.log('Marked UnComplete')
                res.json('Marked Complete')
            })
            .catch(error => console.error(error))
        
        })

        app.post('/addTodo', (req, res) => {
            db.collection('todos').insertOne({todoInput: req.body.todoInput, completed: false})
            .then(res => {
                console.log('Todo Added')
            })
            .catch(error => console.error(error))
        })

        app.delete('/deleteItem', (req, res) => {
            db.collection('todos').deleteOne({todoInput: request.body.todoInput})
            .then(result => {
                console.log('Todo Deleed')
                res.json('Todo Deleted')
            })
            .catch(error => console.log(error))
        })


   
