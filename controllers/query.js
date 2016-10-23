var env = require('../env');
var imdb_vendor = require('../libraries/imdb_vendor');
var tk_vendor = require('../libraries/tk_vendor');
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
					result.tomatoRating = response.tomatoRating;
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
	},

	listTK: function(data){
		return new Promise(function(fulfill,reject){
			tk_vendor.getViaConveyor(data).then(function(response){
				console.log('conveyor ended');
				//console.log(JSON.stringify(response));
				var result = {};
				var similarMovies = [];
				if(response.hasOwnProperty('Similar')){
					result.Name = response.Similar.Info[0].Name;
					for(var i=0;i<6;i++)
					{
						similarMovies.push(response.Similar.Results[i].Name);
					}
					result.SimilarMovies=similarMovies;
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