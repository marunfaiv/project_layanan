const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 5050
const dbConfig = require('./config/db_config')
const cors = require('cors')

mongoose.connect(dbConfig.mongoURL, {
        useNewUrlParser: true,
    }).then(() => console.log("connect mongodb"))
    .catch(err => console.log(err))

app.use(cors())

app.use(bodyParser.json({
    extended: true,
    limit: '50mb'
}))

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}))

app.use('/user', require('./routes/user_routes'))

app.get('/', function(request, response) {
    response.sendFile('index.html')
})

app.listen(port, function() {
    console.log("Server running on port " + port)
})