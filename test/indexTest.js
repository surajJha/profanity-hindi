/**
 * Created by surajkumar on 16/12/16.
 */

var chai = require("chai");
var expect = chai.expect;
var index = require("../index");

describe("test for bad words filter", function () {

    it("test isMessageDirty function with correct input", function () {
        var dirtyMessage = "Hi asshole you have been invited for a show";
       var isDirty = index.isMessageDirty(dirtyMessage);
       expect(isDirty).to.be.true;
    });

    it("test isMessageDirty function with wrong input", function () {
        var dirtyMessage = 45;
       expect(index.isMessageDirty.bind(index,dirtyMessage)).to.throw(('message passed to the function must be a string'));
    });

    it("test maskWords function", function () {
        var dirtyMessage = "Hi asshole you have been invited for a show";
       var cleanedMessage  = index.maskBadWords(dirtyMessage, "%");
       expect(cleanedMessage).to.equal("Hi %%%%%%% you have been invited for a show");
    });

    it("test maskWords function with incorrect input", function () {
        var dirtyMessage = [1,2,3,4,5];
       expect(index.maskBadWords.bind(index, dirtyMessage)).to.throw(('message passed to the function must be a string'));
    });

    it("test addWords function with array input", function () {
        var newWords = ["this", "dumbness"];
        var badWordsDictionary = index.addWords(newWords);
        expect(badWordsDictionary).to.haveOwnProperty("dumbness");
        expect(badWordsDictionary).to.haveOwnProperty("this");
        expect(badWordsDictionary).to.haveOwnProperty("whore");
    });

    it("test addWords function with string input", function () {
        var newWords = "solomon";
        var badWordsDictionary = index.addWords(newWords);
        expect(badWordsDictionary).to.haveOwnProperty("solomon");
    });

    it("test addWords function with incorrect numeric input", function () {
        var newWords = 3;
        var badWordsDictionary = index.addWords(newWords);
        expect(badWordsDictionary).not.to.haveOwnProperty(3);
    });

    it("test removeWords function with correct input", function () {
        var newWords = "solomon";
        var badWordsDictionary = index.removeWords(newWords);
        expect(badWordsDictionary).not.to.haveOwnProperty("solomon");
    });

    it("test removeWords function with correct input", function () {
        var newWord = ["this","dumbness"];
        index.addWords(newWord)
        var badWordsDictionary = index.removeWords(newWord);
        expect(badWordsDictionary).not.to.haveOwnProperty("dumbness");
    });

});

