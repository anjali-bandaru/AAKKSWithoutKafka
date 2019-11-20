var tweet = require('../models/TweetSchema');

let getUserTweets = async (userId => {
    let userId = message.userId;
    tweet.find({userId}, (err, result)=>{
        
        /*if(err){
            console.log("unable to find in database", err);
            callback(err, "Database Error");
       } else if(result) {
           console.log("result is..");
           console.log(result);
           callback(null, { status: 200,  message:result });
       } else {
        console.log("result is..");
        console.log(result);
        callback(null, { status: 200,  message:"Tweets cannot be returned!" });
       }*/
    });
};

module.exports = {
    getUserTweets
};