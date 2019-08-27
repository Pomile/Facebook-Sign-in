import express from 'express';
// import controllers and helpers and use it in your route handlers
import Facebook from '../controller/facebook';
import passport from '../helpers/passport';

const routes = express.Router();

routes.get(
  '/test',
  (req, res) => {
    res.status(200).json({ status: 200, msg: 'Route module is working perfectly' }).end();
  },
);

routes.get(
  '/auth/failure',
  (req, res) => {
    res.status(401).json({ status: 401, msg: 'faceboo auth failure' }).end();
  },
);
routes.get(
  '/auth/facebook',
  passport.authenticate('facebook'),
);

routes.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/auth/failure' }),
  Facebook.signIn
);


export default routes;
