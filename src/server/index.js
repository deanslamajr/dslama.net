import express from 'express'
import path from 'path';

import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'

import router from './routes'

const app = express()

// health check
// needs to be before https redirect
app.get('/health', (req, res) => {
	res.sendStatus(200);
})

// if in production envs
// only allow https connections
// http://blog.lookfar.com/blog/2017/07/19/how-to-https-all-the-things-in-node/
if (process.env.NODE_ENV === 'production') {
	app.enable('trust proxy');

	app.use(function(req, res, next){
		if (req.header('x-forwarded-proto') !== 'https') {
			res.redirect('https://' + req.header('host') + req.url);
		} else{
			next();
		}
	})
}

// helps secure Express with various HTTP headers
app.use(helmet())

app.use(cookieParser())

app.set('view engine', 'ejs')
app.set('views', __dirname)

app.set('port', (process.env.PORT || 1986))

app.use(express.static(__dirname))

app.use(bodyParser.json())

// define routes
app.use(router)

// start the server
app.listen(app.get('port'), () => {
  console.log('ready on port ' + app.get('port'))
})
