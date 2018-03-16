import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import logger from 'morgan'
import mongoose from 'mongoose'
import bb from 'express-busboy'
import SourceMapSupport from 'source-map-support'

// import routes
import routes from './routes/users.server.route'

// set up app with express
const app = express()

// express-busboy to parse multipart/form-data
bb.extend(app)

// allow cross-origin resource sharing
app.use ((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin", "X-Requested-With, Content-Type, Accept")
    next()
})

// configure app
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))
app.use(express.static(path.join(__dirname, 'public')))

// set the port
const port = process.env.PORT || 3001

// connect to database
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/mern-app')

// add source map support
SourceMapSupport.install()

app.use('/api', routes)

app.get('/', (req, res) => {
    return res.end('Api working')
})

// catch 404
app.use((req, res, next) => {
    res.status(404).send('<h2 align=center>page not found?</h2>')
})

// start the server
app.listen(port, () => {
    console.log(`app server listening at ${port}`);
    
})