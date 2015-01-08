var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

  var country = "NL";
  var data = {};
  var rounds = 1;

  url = "http://www.metal-archives.com/browse/ajax-country/c/" + country + "/json/1?sEcho=1&iDisplayStart=0";

  request(url, function(error, response, html) {  
    if(!error){
      var $ = cheerio.load(html);
      var json = $('body').prevObject.text();
      res.send("Scraped " + country + "!");

      json = JSON.parse(json);
      console.log(json.iTotalRecords);
      round = Math.ceil(json.iTotalRecords / 500);
      console.log(round);
      // process.exit(0);
    }
  })

  for(var i = 0; i < rounds; i++){
    var page = i * 500;
    url = "http://www.metal-archives.com/browse/ajax-country/c/" + country + "/json/1?sEcho=1&iDisplayStart=" + page.toString();
        // console.log(json);
        fs.writeFile('data/' + country + '.json', JSON.stringify(json, null, 2), function(err) {
          console.log("Mission succesful");
        })
  }
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;

// courtesy of https://scotch.io/tutorials/scraping-the-web-with-node-js