var Twit = require('twit')
var sentiment = require('sentiment');

var T = new Twit({
    consumer_key:         'myK2mQaPzJFsyYL9uIyCTGCRW'
  , consumer_secret:      'XGNDCkzXHhG3UeeINNaxArJEEjqU5wRO07bLeGWQx3vgmsY2Ar'
  , access_token:         '19595921-FDS6pzJdoB4p1DxXx4DxwvDeBTQhYixa9H3zzmXe5'
  , access_token_secret:  'VieqG0OJXAxprVtxbtKy81pXQcZYGCJ5Ypb3B1apTtYWT'
})


var outputString;

function searchAndAnalyseTweets(searchTerm,callback) {

  T.get('search/tweets', { q: searchTerm, count: 1000 }, function(err, data, response) {

    var jsonString = JSON.stringify(data, null, 4);
    var jsonObj = JSON.parse(jsonString);
    var totalScore = 0;
    var negativeScore = 0;
    var positiveScore = 0;
    var counter = 0;
  	
      for ( var i = 0; i < jsonObj.statuses.length; i++ ) {
    		// console.log(jsonObj.statuses[i].text);
        var statusSentiment = sentiment(jsonObj.statuses[i].text);
        // console.log(statusSentiment);
        //ignore retweets
        if (statusSentiment.tokens[0] != "rt") {
          counter++;
          // console.log(jsonObj.statuses[i].text);
          // console.log(statusSentiment.score);

          if (statusSentiment.score > 0) {
            positiveScore++;
          } 
          else if (statusSentiment.score < 0) {
            negativeScore++;
          }

        };
  	}

    if (err) {
      console.log(err);
    };

    totalScore = positiveScore - negativeScore;

    var resultsJson = {
      'searchTerm' : searchTerm,
      'totalResults' : counter,
      'neutralScore' : counter - (negativeScore + positiveScore),
      'positiveScore' : positiveScore,
      'negativeScore' : negativeScore,
      'totalScore' : totalScore
    }

    outputString = resultsJson;
    callback();
    return resultsJson;
  })
}


function logOutputString() {
  console.log(outputString);
};

// searchAndAnalyseTweets("#motd #manutd", logOutputString);
// searchAndAnalyseTweets("#topgear clarkson", logOutputString);

var hashtags = ["#bbc", "#motd", "#topgear"];

for ( var i = 0; i < hashtags.length; i++ ) {
  searchAndAnalyseTweets(hashtags[i], logOutputString);
}


