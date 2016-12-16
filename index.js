/**
 * Created by surajkumar on 16/12/16.
 */
var _ = require("lodash");
var hindiBadWords = require("./data/hindi-bad-words");
var englishBadWords = require("./data/english-bad-words");

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
    var badWordsDictionary = _.merge(hindiBadWords, englishBadWords);
    var badWordsDictionary = _.transform(badWordsDictionary, function (result, val, key) {
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


module.exports = profanity;