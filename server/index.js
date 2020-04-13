const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const bodyParser= require('body-parser');

const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const uuid = require('node-uuid');

const Users = require('./schema/User')

mongoose.connect('mongodb://localhost/hacktxattendees', {useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error: "));
db.once('open', () => {
  console.log("MongoDB database connection established successfully");
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`listening on port ${ port }`);  
});

app.post('/register', (req, res) => {
    console.log(req.body);
    let email = req.body.email;
    let rawPass = req.body.password;
    if(email && rawPass) {
        bcrypt.hash(rawPass, null, null, (err, hash) => {
            if(err) console.log(err);
            Users.create({user_id: new mongoose.Types.ObjectId, email, password : hash, auth_token: uuid.v4(), pushed: new Date()});
            res.json({"code": 200, "status": "success"});
        });
    }
});

app.post('/login', (req, res)=>{
    Users.find({'email' : req.body.email}, (err, users) => {
      if(err) console.log(err);    
      if(users.length === 0)
      {      
        res.json({"code": 401, "message" : "Failed to log in"});
        return;
      }
      else
      {
        var user = users[0];
        bcrypt.compare(req.body.password, user.password, (err, match) => {
            if(match)
            {
              res.json({"code": 200, "message" : "success", "authToken": user.auth_token, "email" : user.email});
            }
            else
            {
              res.json({"code": 401, "message" : "Failed to log in"});
            }
        })
      }
    })
  });

  app.post('/push-results', (req, res) => {
      console.log(req.body)
      Users.find({'email': req.body.email}, (err, users) => {
          if(err) console.log(err);
          if(users.length === 0) {
              res.json({"code": 401, "message" : "User not found"})
              return;
          }
          else {
              const user = users[0];
              if(req.body.authToken !== user.auth_token) {
                res.json({"code": 401, "message" : "Invalid auth token"})
                return;
              }
              else {
                console.log("made it to end")
                let payload = {taken: true, results: req.body.results};
                Users.updateOne({email: req.body.email}, {"$set" : {quiz_results : payload}});
                res.json({"code": 200, "message": "Successfully pushed results"})
              }
          }
      })
  })