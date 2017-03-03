'use strict';

const _ = require('lodash');
const http = require('request-promise');
var webdriver = require('selenium-webdriver');


function World() {
    const self = this;

    this.httpGet = function (uri) {    
        return _httpRequest({ method: 'GET', 'headers': {'User-Agent': "tannyb"}, uri: uri });
    };

    this.getValue = function(path){
        return _.get(self.actualResponse, path);
    };    

    this.PrintError = function(actualValue, expectedValue){
        return `\r\nExpected: ${expectedValue}\r\nActual: ${actualValue}\r\nResponse Status Code: ${self.statusCode}`;
    };    
   
    function _httpRequest(options){
        
        return http({
            method: options.method,
            uri: options.uri,
            headers: options.headers,
            body: self.requestBody,
            json: true,
            resolveWithFullResponse: true
        }).then(function(response) {
            
            //if(process.env.DEBUG){
               // console.log(response);
           // }
            
            self.actualResponse = response.body;
            self.statusCode = response.statusCode;
        }, function(response){
            
            const bodyString = response.message.slice(6);
            const body = JSON.parse(bodyString); 

            self.actualResponse = body;
            self.statusCode = response.statusCode;
        });
    }
}

module.exports = function () {
    this.World = World;
};

