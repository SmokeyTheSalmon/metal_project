var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var json    = {};

function scrape(link) {
  var $ = cheerio.load(link);
  var scrapedtext = $('body').prevObject.text();
  res.send(scrapedtext)
  json += scrapedtext;  
}

function parseAndWrite() {
  json = JSON.parse(json);
  console.log(json);
  fs.writeFile('data/' + country + '.json', JSON.stringify(json, null, 2), function(err) {
    console.log("Mission succesful");
  })
}

app.get('/scrape', function(req, res){

  url = "http://www.metal-archives.com/browse/ajax-country/c/NL/json/1?sEcho=1&iDisplayStart=0";

  request(url, function(error, response, html) {
    

    if(!error){
      scrape(html);

      parseAndWrite();

      // process.exit(0);
    }
  })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;

// courtesy of https://scotch.io/tutorials/scraping-the-web-with-node-js