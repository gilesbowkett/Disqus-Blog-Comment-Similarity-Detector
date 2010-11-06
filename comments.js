var sys = require("sys"),
    utils = require("utils"),
    _ = require("./vendor/underscore/underscore.js")._;

// actual sample data pulled directly from the Disqus code on the MetaOptimize blog post

// many tweets are identical in their content, except for using a distinct shortened URL, including several instances
// where the url-shortener is the same service.

var DsqLocal = {
  'trackbacks': [
    {
    'author_name':  "Alexandre Passos",
    'author_url':  "http:\/\/twitter.com\/atpassos_ml\/status\/719219356344321",
    'date':    "11\/06\/2010 01:20 AM",
    'excerpt':  "RT @turian: NLP Challenge: Find semantically related terms over a large vocabulary (&gt;1M)? http:\/\/bit.ly\/cGOkKf ",
    'type':    "trackback"    }
,    {
    'author_name':  "Hacker News",
    'author_url':  "http:\/\/twitter.com\/hntweets\/status\/721546804985856",
    'date':    "11\/06\/2010 01:30 AM",
    'excerpt':  "NLP Challenge: Find semantically related terms over a large vocabulary (1M): http:\/\/bit.ly\/daFNyD Comments: http:\/\/bit.ly\/9H94uY ",
    'type':    "trackback"    }
,    {
    'author_name':  "Joseph Turian",
    'author_url':  "http:\/\/twitter.com\/turian\/status\/723941857427456",
    'date':    "11\/06\/2010 01:39 AM",
    'excerpt':  "NLP Challenge: Find semantically related terms over a large vocabulary (&gt;1M)? http:\/\/bit.ly\/cGOkKf ",
    'type':    "trackback"    }
,    {
    'author_name':  "Albert Zeyer",
    'author_url':  "http:\/\/twitter.com\/albertzeyer\/status\/724911685373953",
    'date':    "11\/06\/2010 01:43 AM",
    'excerpt':  "MetaOptimize NLP Challenge: Find semantically related terms over a large vocabulary (1M) http:\/\/goo.gl\/RDvcw ",
    'type':    "trackback"    }
,    {
    'author_name':  "news.yc Popular",
    'author_url':  "http:\/\/twitter.com\/newsycombinator\/status\/729094182404096",
    'date':    "11\/06\/2010 02:00 AM",
    'excerpt':  "NLP Challenge: Find semantically related terms over a large vocabulary (1M)? http:\/\/j.mp\/aVT6ah ",
    'type':    "trackback"    }
,    {
    'author_name':  "Régis Gaidot",
    'author_url':  "http:\/\/twitter.com\/rgaidot\/status\/729543262343168",
    'date':    "11\/06\/2010 02:01 AM",
    'excerpt':  "NLP Challenge: Find semantically related terms over a large vocabulary (&gt;1M)? http:\/\/t.co\/XrP1KJa #nlp ",
    'type':    "trackback"    }
,    {
    'author_name':  "Tech & Freak Feeds",
    'author_url':  "http:\/\/twitter.com\/frikifeeds\/status\/729960083886080",
    'date':    "11\/06\/2010 02:03 AM",
    'excerpt':  "NLP Challenge: Find semantically related terms over a large vocabulary (1M)? http:\/\/dlvr.it\/85fZK ",
    'type':    "trackback"    }
,    {
    'author_name':  "Emiliano Kargieman",
    'author_url':  "http:\/\/twitter.com\/earlkman\/status\/730446237274112",
    'date':    "11\/06\/2010 02:05 AM",
    'excerpt':  "RT @newsycombinator: NLP Challenge: Find semantically related terms over a large vocabulary (1M)? http:\/\/j.mp\/aVT6ah ",
    'type':    "trackback"    }
,    {
    'author_name':  "Hacker News YC",
    'author_url':  "http:\/\/twitter.com\/hackernewsyc\/status\/731183423946752",
    'date':    "11\/06\/2010 02:08 AM",
    'excerpt':  "NLP Challenge: Find semantically related terms over a large vocabulary (1M)? http:\/\/goo.gl\/fb\/OOFfe ",
    'type':    "trackback"    }
,    {
    'author_name':  "m.y.ikegami_bot",
    'author_url':  "http:\/\/twitter.com\/myikegami_bot\/status\/731392270925825",
    'date':    "11\/06\/2010 02:09 AM",
    'excerpt':  "NLP Challenge: Find semantically related terms over a large vocabulary (1M)? http:\/\/goo.gl\/fb\/sJKNx ",
    'type':    "trackback"    }
,    {
    'author_name':  "Spencer Tipping",
    'author_url':  "http:\/\/twitter.com\/spencertipping\/status\/731786137051136",
    'date':    "11\/06\/2010 02:10 AM",
    'excerpt':  "RT @rgaidot: NLP Challenge: Find semantically related terms over a large vocabulary (&gt;1M)? http:\/\/t.co\/XrP1KJa #nlp ",
    'type':    "trackback"    }
,    {
    'author_name':  "hackernews",
    'author_url':  "http:\/\/twitter.com\/hackernws\/status\/734141196795904",
    'date':    "11\/06\/2010 02:20 AM",
    'excerpt':  "NLP Challenge: Find semantically related terms over a large vocabulary (1M)? http:\/\/bit.ly\/bqvIPw ",
    'type':    "trackback"    }
,    {
    'author_name':  "Joe",
    'author_url':  "http:\/\/twitter.com\/josephjay\/status\/734141192601601",
    'date':    "11\/06\/2010 02:20 AM",
    'excerpt':  "NLP Challenge: Find semantically related terms over a large vocabulary (1M)? http:\/\/bit.ly\/cyj8SG ",
    'type':    "trackback"    }
,    {
    'author_name':  "Joe",
    'author_url':  "http:\/\/twitter.com\/josephjay\/status\/734141192601601",
    'date':    "11\/06\/2010 02:20 AM",
    'excerpt':  "NLP Challenge: Find semantically related terms over a large vocabulary (1M)? http:\/\/bit.ly\/cyj8SG ",
    'type':    "trackback"    }
,    {
    'author_name':  "Spencer Tipping",
    'author_url':  "http:\/\/twitter.com\/spencertipping\/status\/734347149713408",
    'date':    "11\/06\/2010 02:20 AM",
    'excerpt':  "@dbrock http:\/\/metaoptimize.com\/blog\/2010\/11\/05\/nlp-challenge-find-semantically-related-terms-over-a-large-vocabulary-1m\/ ",
    'type':    "trackback"    }]
};

var tweets = _.pluck(DsqLocal.trackbacks, "excerpt");
// are there duplicates?
// sys.puts(_.isEqual(tweets, _.uniq(tweets)));

var tokenized = [];
_.map(_.uniq(tweets), function(tweet) { tokenized.push(tweet.split(" ")) });
// sys.puts(utils.inspect(tokenized));

_.each(tokenized, function(tweetAsArray1) {
  _.each(tokenized, function(tweetAsArray2) {
    if (tweetAsArray1 != tweetAsArray2) {
      sys.puts("\n") ;
      sys.puts("comparing: ");
      sys.puts(tweetAsArray1);
      sys.puts(" to: ");
      sys.puts(tweetAsArray2);
      sys.puts("\n") ;
      var intersection = _.intersect(tweetAsArray1, tweetAsArray2);
      if (intersection) {
        sys.puts("intersect: " + intersection);
        sys.puts("intersect length: " + intersection.length);
        sys.puts("tweet 1 length: " + tweetAsArray1.length) ;
        sys.puts("percentage of tweet 1 intersected: " + Math.round(intersection.length / tweetAsArray1.length * 100));
        sys.puts("tweet 2 length: " + tweetAsArray2.length) ;
        sys.puts("percentage of tweet 2 intersected: " + Math.round(intersection.length / tweetAsArray2.length * 100));
      }
    }
  });
});
