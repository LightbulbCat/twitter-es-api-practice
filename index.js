'use strict';

// load configs

const jsonfile = require('jsonfile');
const config = jsonfile.readFileSync('config.json');

// set clients

const Twitter = require('twitter');
const tw_client = new Twitter(config.twitter);

// send queries

// before this, elasticsearch should be have a index 'twitter'.
// to make it, ex) curl -XPUT localhost:9200/twitter/

const params = {screen_name: 'LightbulbCat'};
tw_client.get('statuses/user_timeline', params, function(error, tweets, response){

  console.log('tw_client error:', error);
  console.log('tw_client tweets:', tweets);

  // "response" contains so much, if you wont to be shown, comment out!
  //console.log('tw_client response:', response);

});
