var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

  var country = "NL";
  url = "http://www.metal-archives.com/browse/ajax-country/c/" + country + "/json/1?sEcho=1&iDisplayStart=0";

  request(url, function(error, response, html) {
    
    if(!error){
      var $ = cheerio.load(html);
      var scrapedtext = $('body').prevObject.text();
      res.send(scrapedtext)
      var json = scrapedtext;

      json = JSON.parse(json);
      console.log(json);
      fs.writeFile('data/' + country + '.json', JSON.stringify(json, null, 2), function(err) {
        console.log("Mission succesful");
        process.exit(0);
      })

    }
  })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;

// courtesy of https://scotch.io/tutorials/scraping-the-web-with-node-js