var sys = require('sys');
var colors = require("colors");
var format = require('util').format;
var mongo = require('../common/db').mongo;
var objectid = require('mongodb').ObjectID;
var settings = require('../settings').settings;

var USER_COLLECTION = "list";
var list = exports.list = {
	add : function(attr, callback) {
		mongo.exec(function(err, db) {
			if (err !== null) {
				callback(err, null);
			} else {
				var records = db.collection(USER_COLLECTION);
				records.insert(attr, {
					w : 1
				}, callback);
			}
		});
	},
	get:function(attr,callback){
		mongo.exec(function(err,db){
			if(err!==null){
				callback(err,null);
			}else{
				var records=db.collection(USER_COLLECTION);
				records.find(attr,callback);
			}
		});
	}
};