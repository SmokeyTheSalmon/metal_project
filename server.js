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
      json = JSON.parse(json);

      console.log(json.iTotalRecords);
      rounds = Math.ceil(json.iTotalRecords / 500);
      console.log(rounds);
    }
  })

  var i = 0;
  while(i < rounds){
    var page = i * 500;

    function scrape(page) {
      url = "http://www.metal-archives.com/browse/ajax-country/c/" + country + "/json/1?sEcho=1&iDisplayStart=" + page.toString();

      request(url, function(error, response, html) {
        if(!error) {
          var $ = cheerio.load(html);
          var json = $('body').prevObject.text()
          json = JSON.parse(json);

          console.log(page);
          i++;
          // fs.writeFile('data/' + country + '.json', JSON.stringify(json, null, 2), function(err) {
          //   console.log("Mission succesful");
          // })
        }
      })
    }
    scrape(page);
  }
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;

// courtesy of https://scotch.io/tutorials/scraping-the-web-with-node-js