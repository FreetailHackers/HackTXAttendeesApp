var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = {
    user_id : Schema.Types.ObjectId,
    email: String,
    password: String,
    auth_token: String,
    pushed: {type : Date, default: Date.now}
}

var User = mongoose.model("User", userSchema);

module.exports = User;