'use strict';

// load configs

const jsonfile = require('jsonfile');
const config = jsonfile.readFileSync('config.json');

// set clients

const Twitter = require('twitter');
const tw_client = new Twitter(config.twitter);

const promised_getTweet = function (params) {
  return new Promise( function(resolve, reject) {
    tw_client.get('statuses/user_timeline', params, function(error, tweets, response){
      if (error) reject (error);
      resolve(tweets);
    });
  });
};

const elasticsearch = require('elasticsearch');
const es_client = elasticsearch.Client(config.elasticsearch);

// co for async process

const co = require('co');

// send queries

// before this, elasticsearch should be have a index 'twitter'.
// to make it, ex) curl -XPUT localhost:9200/twitter/

co (function *() {

  const params = {screen_name: 'LightbulbCat'};
  const tweets = yield promised_getTweet(params)

    .catch( function(error) {
      console.log('tw_client error:', error);
      return;
    })

  console.log(tweets);

  for (let tweet of tweets) {
    const result = yield es_client.index({
      index: 'twitter',
      type: 'defalut',
      id: tweet.id,
      body: tweet,
    })

    console.log(result);
  }
}); // end of co
