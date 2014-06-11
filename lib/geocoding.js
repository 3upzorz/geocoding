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
			host	: 	'geocoder.ca',
			path	: 	'?' + qs.stringify({
							locate: 	address,
							geoit : 	'XML'
						})
		}

		var cb = function(response){

			var data = '';

			response.on('data',function(chunk){
				data += chunk;
			});
			response.on('end',function(){
				parseString(data,function(err,result){
					//TODO handle parsing error
					callback(null,result);
				});
			});
		}

		var req = http.request(options,cb);

		req.on('error',function(e){

			callback(e,null);
		});

		req.end();
	},
};

exports.geocoder = geocoder;