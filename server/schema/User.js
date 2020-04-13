var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = {
    user_id : Schema.Types.ObjectId,
    email: String,
    password: String,
    auth_token: String,
    pushed: {type : Date, default: Date.now},
    quiz_results : {
        taken : {type: Boolean, default: false},
        results: {type: [Number], default: [0,0,0,0,0]}
    }
}

var User = mongoose.model("User", userSchema);

module.exports = User;