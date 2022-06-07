const express = require('express');
const { appendFile } = require('fs');
const colors = require ('colors')
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const  port = process.env.PORT || 5000

 connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended:false }))

app.use('/api/goals', require('./routes/goalsRoutes'))
//app.use(errorHandler)


app.listen(port, ()=> console.log(`Server started on port ${port}`));


