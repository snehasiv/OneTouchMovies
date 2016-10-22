var env = require('../env');
var request = require('request-promise');

module.exports.sendViaConveyor = function(data)
{
	
	console.log('info','SMS_VENDOR initiated.');
    console.log('debug','Data obtained:' + JSON.stringify(data));
    return request({
     	uri:  env.imdb_vendor,
        qs: {
            t: data
        },
        json: true
     }).then(function(response){
        console.log('info: '+'Successfully returning from conveyor');
        console.log('debug: '+ 'response to be returned: ' + JSON.stringify(response));
        return response;
     }).catch(function(err) {
        console.log('crit: '+'sendViaConveyor: response err '+JSON.stringify(err));
     });
}