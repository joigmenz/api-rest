const express = require('express')
const bodyParser = require('body-parser')

const apiRouter = require('./routes/api');

const app = express();
const port = 4000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRouter)

app.listen(port, () => {
    console.log(`App listening on port ${ port }`)
})