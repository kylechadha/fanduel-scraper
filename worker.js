var http = require('http');

http.get("http://fd-scraper.herokuapp.com/scrape", function(res) {
    console.log('Worker ran and FanDuel has been scraped.');
    return;
});
