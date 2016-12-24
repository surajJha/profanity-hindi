# profanity-hindi
### Author : Suraj Kumar Jha

This is a small nodejs module for dealing with profanity in english and hindi. This Module has functionalities for detecting bad words and cleaning them.
Technologies used : Nodejs

### Installation
just run - npm install profanity-hindi

### Requirements
It internally uses lodash , will be automatically installed

### Code Example

```javascript
function maskBadWords()
var profanity = require("profanity-hindi");
var message = "hi asshole you are a bitch chutiya";
var cleaned = profanity.maskBadWords(message);
console.log(cleaned); // hi ******* you are a ***** *******
```

```
function isMessageDirty()
var profanity = require("profanity-hindi");
var message = "hi asshole you are a bitch chutiya";
var isDirty = profanity.isMessageDirty(message);
console.log(isDirty);
// prints true

var message = "hi there. How are you";
var isDirty = profanity.isMessageDirty(message);
console.log(isDirty);
// prints false
```

```
function addWords()
var profanity = require("profanity-hindi");
 var newWords = ["this", "dumbness"];
 profanity.addWords(newWords); // this will add the new words 
 to the dictionary of bad words. This function optionally
 returns the entire dictionary of bad words.
```

```
function removeWords()
var profanity = require("profanity-hindi");
 var newWords = ["this", "dumbness"];
 profanity.removeWords(newWords); // this will remove the new words 
 from the dictionary of bad words. This function optionally
 returns the entire dictionary of bad words.
```
### Unit Tests
Run command : npm test

### Contributors
Suraj Kumar Jha

### License
MIT License