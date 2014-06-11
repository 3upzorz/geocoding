/**
 * Used to interact with the geocoder.ca API
 */
var geocoder = {

	/**
	 * Interacts with the free geocoder.ca API
	 * @param {String} address - the street address + city or country or postal code
	 * @param {Function} callback - first param must be an error, second is json obj
	 */
	geocodeFree: function(address,callback){
		var http = require('http');
		var qs = require('querystring');
		var parseString = require('xml2js').parseString;

		var options = {
			hostname: 	'geocoder.ca',
			path	: 	qs.stringify({
							locate: 	address,
							geoit : 	'XML'
						})
		}

		callback = function(response){

			var data = '';

			response.on('data',function(chunk){
				data += chunk;
			});
			response.on('end',function(){
				parseString(data,function(err,result){
					callback(null,result);
				});
			});
		}

		var req = http.request(options,callback);

		req.on('error',callback(e,null));

		req.end();
	},
};

exports.geocoder = geocoder;