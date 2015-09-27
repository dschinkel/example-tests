// in this file, code written in: node.js, supertest.js, mocha.js, chai.js, ECMAScript 6, co.js

// The real DB code that this hits is a PostgresSQL database

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
