require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')

const app = express()

const userRoutes = require('./routes/authRoutes')
const postRoutes = require('./routes/postRoutes')

//middlewares
app.use(express.json())
app.use(cors()) 

//request check
app.use((req,res,next) => {
    console.log(req.path , req.method)
    next()
})

//routes
app.use('/api/v1/user' , userRoutes)
app.use('/api/v1/posts' , postRoutes)

// Responding to errors
// app.use((err, req, res) => {
//     return res.status(400).json(err.message)
// })

//connect database MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Database connected')

        app.listen(process.env.PORT, () => {
            console.log(`Server is listening on port  ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })