var Twit = require('twit')

var T = new Twit({
    consumer_key:         'myK2mQaPzJFsyYL9uIyCTGCRW'
  , consumer_secret:      'XGNDCkzXHhG3UeeINNaxArJEEjqU5wRO07bLeGWQx3vgmsY2Ar'
  , access_token:         '19595921-FDS6pzJdoB4p1DxXx4DxwvDeBTQhYixa9H3zzmXe5'
  , access_token_secret:  'VieqG0OJXAxprVtxbtKy81pXQcZYGCJ5Ypb3B1apTtYWT'
})

var sentiment = require('sentiment');

T.get('search/tweets', { q: 'topgear', count: 100 }, function(err, data, response) {

  var jsonString = JSON.stringify(data, null, 4);
  var jsonObj = JSON.parse(jsonString);
	
    for ( var i = 0; i < jsonObj.statuses.length; i++ ) {
  		console.log(jsonObj.statuses[i].text);
      var r1 = sentiment(jsonObj.statuses[i].text);
      console.dir(r1);        // Score: -2, Comparative: -0.666 
	}
	console.log(jsonObj.statuses.length + " Results")

  if (err) {
  	  console.log(err);
  	};
})

