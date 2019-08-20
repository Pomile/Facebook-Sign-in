import express from 'express';
// import controllers and helpers and use it in your route handlers
import Facebook from '../controller/facebook';

const routes = express.Router();

routes.get(
  '/test',
  (req, res) => {
    res.status(200).json({ status: 200, msg: 'Route module is working perfectly' }).end();
  },
);

routes.get(
  '/auth/facebook',
  Facebook.signIn,
);


export default routes;
