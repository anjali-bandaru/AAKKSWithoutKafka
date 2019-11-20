var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema
TweetSchema = new Schema({
  tweetText:{
      type: String,
      default :""
  },
  media:[],
  userId: {
    type: String,
    default: ''
  },
  retweets:[],
  replies:[],
  likes:[],
  createdAt : {
      type: String,
      default :""
  },
  views : {
      type :String,
      default : 0
  }
});

module.exports = mongoose.model('tweets', TweetSchema);