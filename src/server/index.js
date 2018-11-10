import express from 'express'
import path from 'path';

import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'

import router from './routes'

const app = express()

// helps secure Express with various HTTP headers
app.use(helmet())

app.use(cookieParser())

app.set('view engine', 'ejs')
app.set('views', __dirname)

app.set('port', (process.env.PORT || 1986))

app.use(express.static(__dirname))

app.use(bodyParser.json())

// @todo remove this
// testing only
app.get('/ddi', (req, res) => {
  console.log('__dirname')
  console.dir(__dirname)
  res.sendFile(path.join(__dirname + '/../src/client/comic.html'))
})

// define routes
app.use(router)

// start the server
app.listen(app.get('port'), () => {
  console.log('ready on port ' + app.get('port'))
})
