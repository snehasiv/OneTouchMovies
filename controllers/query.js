var env = require('../env');
var imdb_vendor = require('../libraries/imdb_vendor');
module.exports = {
	listResult: function(data){

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