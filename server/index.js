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

  app.post('/results/', (req, res) => {
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
                console.log(user);
                Users.updateOne({_id: user._id}, {$set : {"quiz_results.taken" : true, "quiz_results.results" : req.body.results}}, (err, user) => {
                    res.json({"code": 200, "message": "Successfully pushed results"});
                });

              }
          }
      })
  })

  app.get('/results', (req, res) => {
    console.log(req.body)
    
    const computeScore = (a, b) => {
        let diffSum = 0;
    }

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
              console.log(user);
              Users.find({'email' : {$ne : req.body.email}}, (err, users) => {
                  users.map((user, index) => {
                      return {email: user.email}
                  })
                  console.log(users);
                  res.json({"code": 200, "message" : "Results found", "results" : users})
              })
            }
        }
    })
  })
