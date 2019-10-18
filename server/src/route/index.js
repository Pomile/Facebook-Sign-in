import express from 'express';
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
  '/auth/facebook/failure',
  (req, res) => {
    res.status(401).json({ status: 401, msg: 'facebook auth failure' }).end();
  },
);
routes.get(
  '/auth/facebook',
  passport.authenticate('facebook'),
);
routes.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/auth/facebook/failure' }),
  Facebook.signIn,
);


export default routes;
