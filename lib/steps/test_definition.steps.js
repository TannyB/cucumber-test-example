'use strict';

require('selenium-webdriver/lib/until.js');
const _ = require('lodash');
const assert = require('assert');
var expect = require('chai').expect;
var webdriver = require('selenium-webdriver');
var until = webdriver.until;

var path = require('path'),browser;
process.env.PATH += ';' + path.dirname(require('chromedriver').path);

var browser = new webdriver.Builder().forBrowser('chrome').build();

 var getDriver = function() {
          return browser;
      }

// function waitForElement(locator, timeout) {
//     return this.wait(until.elementLocated(locator), timeout);
// }

module.exports = function () {

//Rest API step definitions

    this.When(/^I make a GET request to "(.*)"$/i, function (uri) {
        return this.httpGet(uri);
    });

    this.Then(/^The response property "(.*)" should be "(.*)"$/i, function (path, expectedValue, callback) {
        const actualValue = this.getValue(path);
        assert.equal(actualValue, expectedValue, this.PrintError(actualValue, expectedValue));
        callback();
    });

    this.Then(/^also The response property "(.*)" should be "(.*)"$/i, function (path, expectedValue, callback) {
        const actualValue = this.getValue(path);
        assert.equal(actualValue, expectedValue, this.PrintError(actualValue, expectedValue));
        callback();
    });

//UI step definitions

  this.When(/^I navigate to "([^"]*)"$/, function (GitUrl, callback) {         
        browser.get(GitUrl).then(callback);          
  });

  this.When(/^I click on "(.*)"$/, function (signup,callback) {
        var element = browser.findElement(webdriver.By.xpath("/html/body/div[1]/header/div/div/div/a[2]"));
        element.click().then(callback);
       });

 this.When(/^I type UserName as "([^"]*)"$/, function (dummy,callback) {
        var element = browser.findElement(webdriver.By.id("user_login"));
        element.sendKeys(dummy).then(callback);
     });

this.Then(/^The error message says "([^"]*)"$/, function (msg, callback) {
      browser.wait(until.elementLocated(webdriver.By.className('is-autocheck-errored')),20000,"unable to locate");
      browser.findElement(webdriver.By.className("is-autocheck-errored")).then(function(items){
      expect(items).to.exist;
      callback();
   })
});   

this.When(/^I again type random Username as "([^"]*)"$/, function(realname,callback) {
    var element = browser.findElement(webdriver.By.id("user_login"));
    element.sendKeys(realname).then(callback);
});

this.Then(/^I see no error$/, function(next){
    browser.wait(until.elementLocated(webdriver.By.className('is-autocheck-successful')),20000,"unable to locate");
    browser.findElement(webdriver.By.className("is-autocheck-successful")).then(function(items){
       expect(items).to.exist;
       next();
   });

})
};

