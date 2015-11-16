/* in this file, code written in: node.js, supertest.js, mocha.js, chai.js, ECMAScript 6, co.js

   Purpose of These Tests:  1-2 integreation tests per API endpoint contract to exercise the service running over a 
   real node koa.js service against a real DB.

   The real DB code that this hits is a PostgresSQL database and these tests varify that my REST endpoints work
   --- with out having to pop open a browser or any other tool to verify that calls work from the outside --- 
*/

'use strict';

var co = require('co'),
    chai = require('chai'),
    should = chai.should(),
    app = require('../../app'),
    sharedTests = require('../unit/shared/api-service-test'),
    request = require('supertest-koa-agent')(app.koaApp);
    
describe('Countries Endpoint - Integration Test', () => {

    it('should find no countries for invalid country id', co.wrap(function *(){

        var uri = '/countries/5555555555555';
        var response = get(uri);

        response.body.should.deep.equal({});
        response.status.should.equal(204);
    }));

    it('should find a country for valid country id', co.wrap(function *(){

        var uri = '/countries/366899';
        var response = get(uri);

        should.exist(response.body);
        response.body.should.have.length(1);
        response.status.should.equal(200);
    }));

    it('should find all countries when no id is specified', co.wrap(function *(){

        var uri = '/countries';
        var response = get(uri);

        should.exist(response.body);
        response.status.should.equal(200);
    }));
});

describe.skip('Cities Endpoint - Integration Test', () => {
   
   it('should find no cities for invalid city id', co.wrap(function *(){
        var uri = '/cities/1';
        cityGet.gateway(null);
        var response = get(uri);

        should.exist(response.body);
        response.status.should.equal(204);
    }));
    
    it('should find a city for valid city id', co.wrap(function *(){
        var uri = '/cities/307538';
        cityGet.gateway(null);
        var response = get(uri);

        response.body.should.have.length(1);
        response.status.should.equal(200);
        response.body[0].id.should.equal(307538);
        should.exist(response.body[0].name.full);
        should.exist(response.body[0].name.urlFriendlyName);
    }));
});

function *get(uri){
   return yield request.get(uri);
}
