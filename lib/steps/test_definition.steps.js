'use strict';

const _ = require('lodash');
const assert = require('assert');
var expect = require('chai').expect;

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

  this.When(/^I navigate to "([^"]*)"$/, function (GitUrl) {         
          this.driver.get(GitUrl);          
  });

  this.When(/^I click on "([^"]*)"$/, function (signup) {
        this.driver.element(by.Xpath("//a[text() = 'Sign Up']")).click();
       });

this.When(/^I type UserName as "([^"]*)"$/, function (dummy) {
        this.driver.findElement(By.id("user_login")).sendKeys(dummy);
    });

this.Then(/^The error message says "([^"]*)"$/, function (msg, callback) {
        var element = this.driver.findElement(By.css('#signup-form > dl.form-group.errored > dd.error'));
        var text = element.getText();
        assert.equal(text, msg);
       });

this.When(/^I again type Username as "([^"]*)"$/, function(realname) {
    this.driver.findElement(By.id("user_login")).sendKeys(realname);
})

this.Then(/^I see no error$/, function(next){
   this.driver.findElement(By.classname("is-autocheck-successful")).then(function(items){
       expect(items).to.have.length.above(0);
   });

})
};

