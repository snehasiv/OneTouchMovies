var env = require('../env');
var cheerio = require('cheerio');
var request = require('request');
var imdb_vendor = require('../libraries/imdb_vendor');

module.exports = {
    listResult: function(data){
        return new Promise(function(fulfill,reject){
            request("http://s1.bia2m.biz/Movies/India%20Movies/2000-2011/", function(error, response, body) 
            {
              if(error) {
                console.log("Error: " + error);
              }
              console.log("Status code: " + response.statusCode);
              var $ = cheerio.load(body);
              var str = data;
              var result = str.split(" ");
              var count = 0;
              var data1 = [];
              var result_url = {};
                $('table').each(function(i, tr){
                  var a = $(this);
                  var abc = a.find('td a');

                  $(abc).each(function(i, link){
                    var text = $(link).text();
                    for(var i=0;i<result.length;i++)
                    {
                      if(text.includes(result[i]))
                      {

                        count = count + 1;
                        if(count == result.length)
                        {
                          data1.push($(link).attr('href'));
                          count = 0;
                        }
                      }
                    }
                   });
                  var url_link = "http://s1.bia2m.biz/Movies/India%20Movies/2000-2011/" + data1;
                  result_url.a = url_link;
                  console.log(url_link);                         
                });
                
            });
        return fulfill(result_url); 
        });
    },
    
	listImdb: function(data){
		return new Promise(function(fulfill,reject){
			imdb_vendor.getViaConveyor(data).then(function(response){
				console.log('conveyor ended');
				//console.log(JSON.stringify(response));
				var result = {};
				if(response.hasOwnProperty('Year')){
					result.year = response.Year;
					result.released = response.Released;
					result.runtime = response.Runtime;
					result.poster = response.poster;
					result.imdb_rating = response.imdbRating;
					console.log('data to be pushed' + JSON.stringify(result));				
					return fulfill(result);	
				}else{
					result.code = "INPUT";
					result.msg = "No movie found, please check name."
					console.log('data to be pushed' + JSON.stringify(result));				
					return reject(result);
				}
			}).catch(function(err){
				return reject(err);
			});
		});
	}
}