import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import methodOverride from 'method-override';
import routes from './src/route/index';

const { NODE_ENV } = process.env;
const app = express();
dotenv.config();
if (NODE_ENV === 'production' || NODE_ENV === 'development') {
  app.use(morgan('short'));
}
app.use(bodyParser.urlencoded({ extended: false, type: '*/x-www-form-urlencoded' }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.text({ type: 'text/plain' }));
app.use(bodyParser.raw({ type: '*/octet-stream' }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({ secret: 'supernova', saveUninitialized: true, resave: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.status(200).send('<h1 style="color: blue;">Express Server Setup!</h1><p>Welcome home!</p>'));
app.use('/api/v1/', routes);
app.listen(8000);
app.all('*', (req, res) => {
  res.status(404).json({ status: 404, msg: 'NOT FOUND' });
});
export default app;
