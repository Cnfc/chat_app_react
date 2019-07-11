const admin = require("firebase-admin");
admin.initializeApp();

exports.onUserStatusChanged = require("./triggers/onUsersStatusChanged");

exports.onCleverBotMessage = require("./triggers/onCleverBotMessage");
