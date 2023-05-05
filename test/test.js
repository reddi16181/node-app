var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where the program is running.

var server = supertest.agent("http://localhost:3000");

// UNIT test begin

describe("SAMPLE unit test",function(){

  // #1 should return home page
  it("respond with hello world",function(done){
    // calling home page
    server
    .get("/")
    .expect("Content-type",/text/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      done();
    });
  });

});


/**
const request = require('supertest')
const app = require('../index.js')

describe('GET /', function() {

 it('respond with hello world', function(done) {
 
 //navigate to root and check the the response is "hello world"
 request(app).get('/').expect('hello world', done)
 })
})


/**
const request = require('supertest');
const assert = require('assert');
const express = require('express');

const app = express();

app.get('/', function(req, res) {
  res.status(200).json({ name: 'john' });
});

request(app)
  .get('/')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });
  
  **/
