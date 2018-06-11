var request = require('request');
var fs = require('fs')

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

function downloadImagebyURL(url, filePath) {
  request.get(url)               // Note 1
       .on('error', function (err) {                                   // Note 2
         throw err;
       })
       .on('response', function (response) {                           // Note 3
         console.log('Response Status Code: ' + response.statusCode + '\n' + response.headers['content-type']);
       })
       .pipe(fs.createWriteStream(filePath));
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  var obj = JSON.parse(result);
  for (var i = 0; i < obj.length; i++) {
    downloadImagebyURL(obj[i]['avatar_url'], `./avatars/${obj[i]['login']}.jpg`);
  }
});