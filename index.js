#! /usr/bin/env node

var program = require('commander');
var Twitter = require('twitter');
var keys = require('./keys.json');

var client = new Twitter({
  consumer_key: keys.consumer_key,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: keys.access_token_key,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


program
  .version('0.0.1')
  .option('-a, --all', 'Show entire last tweet')
  .option('-t, --tweet [message]', 'Tweet the message you would like')
  .option('-s, --show', 'show')
  .parse(process.argv);

if (program.all) {
  var user = {
    screen_name: process.env.TWITTER_USERNAME
  }
  client.get('statuses/user_timeline', user, function(error, tweets, response) {
    if (error) {
      console.log(error);
    } else {
      console.log('Last Tweet: ' + tweets[0].text);
    }
  });
}

if (program.show) {
  var user = {
    screen_name: process.env.TWITTER_USERNAME
  }
  client.get('statuses/user_timeline', user, function(error, tweets, response) {
    if (error) {
      console.log(error);
    } else {
      console.log('"' + tweets[0].text.substring(0, 20) + '..."');
    }
  });
}

if (program.tweet) {
  if (program.tweet.length > 0) {
    var tweet = {
      status: program.tweet
    };
    client.post('statuses/update', tweet, function(error, tweet, response) {
      if (error) {
        console.log(error);
      } else {
        console.log(tweet.text);
      }
    });
  }
}
