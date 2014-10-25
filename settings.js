var fs = require('fs');
module.exports.settings =  {
	plugin_home: __dirname + "/plugins",
	tmp: __dirname + "/tmp",
	with_auth:false,
	mongo : {
		host:"127.0.0.1",
		port: 27017,
		dbname: "e_scout",
		serveropt: {
			'auto_reconnect':true,
			 poolSize:5
		},

		dbopt : {
			w:-1
		}
	}
}