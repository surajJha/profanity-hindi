/**
 * Created by surajkumar on 16/12/16.
 */
var _ = require("lodash");
var hindiBadWords = require("./data/hindi-bad-words");
var englishBadWords = require("./data/english-bad-words");
var badWordsDictionary = {};
var userDefinedWords = {};

var profanity = {};

profanity.maskBadWords = function (message, maskWith) {
    if(!message || typeof message !== "string") {
        throw new Error("message passed to the function must be a string");
    }
    var cleanedMessage = message.split(" ").map(function (word) {
        if(profanity.isMessageDirty(word)) {
            if(maskWith && maskWith !== null && typeof maskWith === "string") {
                return word.replace(/./g, maskWith)
            }
            return word.replace(/./g, "*")
        }
        return word;
    }).join(" ");
    return cleanedMessage;
};

profanity.isMessageDirty = function (message) {
    if(!message || typeof message !== "string") {
        throw new Error("message passed to the function must be a string");
    }
    var messageWords = message.split(" ");
    badWordsDictionary = _.merge(hindiBadWords, englishBadWords, userDefinedWords);
    badWordsDictionary = _.transform(badWordsDictionary, function (result, val, key) {
        result[key.toLowerCase()] = val;
    });
    var flag = false;
    for(var i = 0; i < messageWords.length; i++) {
        if(badWordsDictionary.hasOwnProperty(messageWords[i].trim().toLowerCase())) {
            flag = true;
            break;
        }
    }
    return flag;
};

var alreadyExists = function (word, wordList) {
    if(!word || !wordList) return false;
    return !!(wordList.hasOwnProperty(word))
};

profanity.addWords = function (wordList) {
    if(!wordList)return badWordsDictionary;
    if(typeof wordList === "string" && !alreadyExists(wordList, badWordsDictionary)) {
        userDefinedWords[wordList.trim()] = 1;
    }
    if(wordList.constructor === Array ) {
        wordList.map(function (word) {
            if(typeof word === "string" && !(alreadyExists(word, badWordsDictionary))) {
                userDefinedWords[word.trim()] = 1;
            }
        });
    }
    badWordsDictionary = _.merge(badWordsDictionary, userDefinedWords);
    return badWordsDictionary;
};

profanity.removeWords = function (wordList) {
    if(!wordList)return badWordsDictionary;
    if(typeof wordList === "string" && alreadyExists(wordList, badWordsDictionary))
        delete badWordsDictionary[wordList.trim()];
    if(wordList.constructor === Array) {
        wordList.map(function (word) {
            if(typeof word === "string" && alreadyExists(word, badWordsDictionary))
                delete badWordsDictionary[word.trim()];
        });
    }
    return badWordsDictionary;
};




module.exports = profanity;