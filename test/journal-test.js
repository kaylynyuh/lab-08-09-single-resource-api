'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('testing journal rotues', function(){
  var journal = null;

  describe('testing POST /api/journal', function(){
    it('should return a journal', function(done){
      request.post('localhost:3000/api/journal')
      .send({headline: 'hello', article: 'good bye'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.headline).to.equal('hello');
        expect(res.body.article).to.equal('good bye');
        journal = res.body;
        done();
      });
    });
  });

  describe('testing GET /api/journal', function(){
    it('should return a journal', function(done){
      request.get(`localhost:3000/api/journal?id=${journal.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.headline).to.equal('hello');
        expect(res.body.article).to.equal('good bye');
        done();
      });
    });
  });
});