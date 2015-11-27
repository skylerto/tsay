#! /usr/bin/env node


var program = require('commander');
var Twitter = require('twitter');
var keys = require('./keys.json');
var secrets = require('./secrets.json');

var client = new Twitter({
  consumer_key: keys.consumer_key,
  consumer_secret: secrets.consumer_secret,
  access_token_key: keys.access_token_key,
  access_token_secret: secrets.access_token_secret
});


program
  .version('0.0.1')
  .option('-a, --auth [username]', 'Sign into Twitter with username')
  .option('-t, --tweet [message]', 'Tweet the message you would like')
  .option('-s, --show', 'show')
  .parse(process.argv);




if (program.auth) {
  if (program.auth.length > 0) {
    console.log('%s', program.auth);
  } else {
    console.log("Please provide a user name!");
  }
}

if (program.show) {
  client.get('favorites/list', function(error, tweets, response) {
    if (error) throw error;
    console.log(tweets[1].text);
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
        console.log(tweet); // Tweet body.
        //console.log(response); // Raw response object.
      }
    });
    console.log('%s', program.tweet);
  }
}
