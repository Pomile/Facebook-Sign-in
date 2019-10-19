import request from 'supertest';
import chai from 'chai';
import dotEnv from 'dotenv';
import Browser from 'zombie';
import '@babel/polyfill';
import app from '../index';

dotEnv.config();
const { FACEBOOK_EMAIL, FACEBOOK_PASS } = process.env;
const { expect } = chai;
let server;

Browser.localhost('example.com', 8000);

describe('TEST SUITE', () => {
  describe('GET /test', async () => {
    const browser = new Browser();
    before(async () => {
      await browser.visit('/api/v1/auth/facebook');
    });
    it('should test route', (done) => {
      request(app)
        .get('/api/v1/test')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.msg).to.equal('Route module is working perfectly');
          done();
        });
    });
    it('should login with facebook', (done) => {
      browser.fill('email', FACEBOOK_EMAIL);
      browser.fill('pass', FACEBOOK_PASS);
      browser.pressButton('login', done);
    });
    it('should return 401 for authorize facebook login', (done) => {
      request(app)
        .get('/api/v1/auth/facebook/failure')
        .set('Accept', 'application/json')
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(401);
          expect(res.body.msg).to.equal('facebook auth failure');
          done();
        });
    });
  });
});
