// in this file, code written in: node.js, supertest.js, mocha.js, chai.js, ECMAScript 6, co.js

// Purpose of These Tests:  these are integreation tests to exercise the service running over a 
// real node koa.js service against a real DB.

// The real DB code that this hits is a PostgresSQL database and these tests varify that my REST endpoints work
// ---with out having to pop open a browser or any other tool to verify that calls work from the outside --- 
// Note: if you find yourself ALWAYS opening a browser to verify calls you might wanna ask yourself or your collegues  
// why?  why not just get into a habit of writing a quick integration test such as the below instead, must faster and can be automted

// With these tests, I know that when I deploy to dev, qa, or whatever,
// that I'm pretty confident things should just work from a user calling the API running in the context of a real
// node web service and real DB.  The only time these might fail is if QA messes up something on their end 
// (DB or network issues, or whatever) or there is some environmental change that affect my tests

// NOTE: co-wrap here is necessary for ES6 mocha.js generator functions to work.

'use strict';

var co = require('co'),
    chai = require('chai'),
    should = chai.should(),
    app = require('../../app'),
    sharedTests = require('../unit/shared/api-service-test');

describe('Countries Endpoint - Integration Test', function(){
    sharedTests.shouldHaveAWorkingService();

    var request = require('supertest-koa-agent')(app.koaApp);

    it('should find no countries for invalid country id', co.wrap(function *(){

        var uri = '/countries/5555555555555';
        var response = yield request.get(uri);

        response.body.should.deep.equal({});
        response.status.should.equal(204);
    }));

    it('should find a country for valid country id', co.wrap(function *(){

        var uri = '/countries/366899';
        var response = yield request.get(uri);

        should.exist(response.body);
        response.body.should.have.length(1);
        response.status.should.equal(200);
    }));

    it('should find all countries when no id is specified', co.wrap(function *(){

        var uri = '/countries';
        var response = yield request.get(uri);

        should.exist(response.body);
        response.status.should.equal(200);
    }));

});
