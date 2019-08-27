import '@babel/polyfill';
import passport from 'passport';
import facebookPassport from 'passport-facebook';
import dotenv from 'dotenv';

dotenv.config();

class Facebook {
  static async signIn(req, res) {
    return res.status(200).send(req.user);
  }
}

export default Facebook;
