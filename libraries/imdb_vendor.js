var env = require('../env');
var request = require('request-promise');

module.exports.getViaConveyor = function(data)
{
	
	console.log('info','VENDOR initiated.');
	console.log('debug','Data obtained:' + data);
	return request({
		uri:  env.imdb_vendor,
		qs: {
			t: data
		},
		json: true
	 }).then(function(response){
		console.log('info: '+'Successfully returning from conveyor');
		//console.log('debug: '+ 'response to be returned: ' + JSON.stringify(response));
		return response;
	 }).catch(function(err) {
		console.log('crit: '+'sendViaConveyor: response err '+JSON.stringify(err));
	 });
}