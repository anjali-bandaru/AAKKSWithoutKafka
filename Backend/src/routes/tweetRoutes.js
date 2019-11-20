const express = require('express');
const router = express.Router();

var tweet = require('../models/TweetSchema');
//imports
//var config = require('../../config/settings');
//var kafka = require('../kafka/client');
//var jwt = require('jsonwebtoken');
//const passport = require('../../config/passport');
//var requireAuth = passport.authenticate('jwt', { session: false });

//var tweetAccess = require('../dbAccess/tweetAccess');
var {redisClient} = require('../../redisClient.js');

router.post('/getUserTweets', function(req, res){
  let {userId} = req.body;
  console.log("in getUserTweets");
  console.log(req.body);
  //tweetAccess.getUserTweets(userId);
  try {
    let redisKey = "tweets_" + userId;
    redisClient.get(redisKey, async function(err, tweets) {
      if(err){
        console.log(err);
        res.status(400).json({status:400, message : "Error at server side!"});
      } else if(tweets){
        console.log("tweets cached in redis!!");
        res.status(200).json({message: tweets});
      } else {
        tweet.find({userId}, (err, result)=>{
          if(err){
            res.status(500).json({ message: 'Database is not responding!!!' });
          } else if(result){

            var responseObj = {
              status : false,
              message :""
            };
            let status = 200;
            redisClient.set(redisKey, JSON.stringify(result), function(error, response){
              if(error){
                console.log(error);
                status = 400;
                responseObj.message = "Redis Error";
              } else if(response){
                responseObj.status = true;
                responseObj.message = result.message;
                console.log("tweets set to cache in redis!!");
                redisClient.expire(redisKey, 100);
              } else{
                responseObj.status = false;
                responseObj.message = result.message;
              }
              res.status(status).json(responseObj);
            });
          } else {
            res.status(200).json({ message: "Tweets cannot be returned!" });
          }
        });
      }
    });
  } catch(e){
    console.log(e);
    res.status(500).json({ message: 'Error at server side!!!' });
  }
  
  
  /*try {
    let redisKey = "tweets_" + userId;
    redisClient.get(redisKey, async function(err, tweets) {
      if(err){
        console.log(err);
        res.status(400).json({status:400, message : "Error at server side!"});
      } else if(tweets){
        console.log("tweets cached in redis!!");
        res.status(200).json({message: tweets});
      } else {
        console.log("tweets not cached in redis!!");
        kafka.make_request('tweetTopics',{'path':'getUserTweets', userId}, function(err,result){
          var responseObj = {
            status : false,
            message :""
          };
          let status = 200;
          if (err) {
            console.log(err);
            res.status(500).json({ message: 'Database is not responding!!!' });
          }
          else if (result.status === 200)
          {
            //console.log('tweets returned!');
            redisClient.set(redisKey, JSON.stringify(result), function(error, response){
              if(error){
                console.log(error);
                status = 400;
              } else if(response){
                responseObj.status = true;
                responseObj.message = result.message;
                console.log("tweets set to cache in redis!!");
                redisClient.expire(redisKey, 100);
              } else{
                responseObj.status = false;
                responseObj.message = result.message;
              }
              res.status(status).json(responseObj);
            });
          } else if (result.status === 401){
            console.log('tweets cannot be returned!');
            responseObj.status = false;
            responseObj.message = 'tweet cannot be added!!';
            res.status(200).json(responseObj);
          }
        });

      }
    });
  } catch(e){
    console.log(e);
    res.status(500).json({ message: 'Error at server side!!!' });
  }*/
});



module.exports = router;