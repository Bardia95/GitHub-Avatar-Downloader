var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

var token = require('./secrets.js')


function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': token
    }
  };



  request(options, function(err, res, body) {
    cb(err, body);

  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  var obj = JSON.parse(result);
  for (var i = 0; i < obj.length; i++) {
    console.log(obj[i]['avatar_url']);
  }
  // }
});