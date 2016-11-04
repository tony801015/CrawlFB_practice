var request = require('request');
var cheerio = require('cheerio');

var FanPage = '' + '/'; //want to crawl Fan Page id
var access_token = '';
var scope = 'message,created_time,link,id' + '&';
var url = 'https://graph.facebook.com/v2.7/';
var final_url = url + FanPage + 'feed?fields=' + scope + 'access_token=' + access_token;

var options = {
    url: final_url,
    json: true,
    header: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36'
    }
}
Crawl(options.url);


function Crawl(url) {
    options.url = url;

    function level1(callback) {
        request(options, (err, res, body) => {

            var allObj = body;
            var data = allObj.data; //save data
            var paging = allObj.paging; //previous or next
            // console.log(data);
            console.log(paging.next);
            callback(paging.next);
        });

    };
    //get next url
    level1((url) => {
        // Crawl(url);  //unlimited recursion 
    });

};