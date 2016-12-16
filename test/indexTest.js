/**
 * Created by surajkumar on 16/12/16.
 */

var chai = require("chai");
var expect = chai.expect;
var index = require("../index");

describe("test for bad words filter", function () {

    it("test isMessageDirty function", function () {
        var dirtyMessage = "Hi asshole you have been invited for a show";
       var isDirty = index.isMessageDirty(dirtyMessage);
       expect(isDirty).to.be.true;
    });

    it("test maskWords function", function () {
        var dirtyMessage = "Hi asshole you have been invited for a show";
       var cleanedMessage  = index.maskBadWords(dirtyMessage, "%");
       expect(cleanedMessage).to.equal("Hi %%%%%%% you have been invited for a show");
    });
});

