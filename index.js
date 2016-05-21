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

// send queries

// before this, elasticsearch should be have a index 'twitter'.
// to make it, ex) curl -XPUT localhost:9200/twitter/

const params = {screen_name: 'LightbulbCat'};
promised_getTweet(params)

  .then( function(tweets) {
    console.log(tweets);

    for(let tweet of tweets) {
      es_client.index({
        index: 'twitter',
        type: 'defalut',
        id: tweet.id,
        body: tweet,
      });
    }
  })

  .catch( function(error) {
    console.log('tw_client error:', error);
    return;
  })
