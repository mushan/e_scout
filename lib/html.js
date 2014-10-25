var phantom = require('node-phantom-simple');
var jsdom = require("jsdom");
var $=require("jquery")(jsdom.jsdom().createWindow());
var sys = require('sys');
var settings = require('../settings').settings;

var html = exports.html = {
		
	jobs : [],
	count: 0,
	
    getDom : function(url, callback) {
    	if(this.jobs.length == 0 && this.count < 2){
    		this._process(url, callback);
    	}else{
    		this.jobs.push({url:url,callback:callback});
    	}
    },
    
    _next:function(){
    	if(this.jobs.length > 0){
    		var j = this.jobs.pop();
    		this._process(j.url, j.callback);
    	}
    },
    
    _process: function(url,callback){
    	  var self = this;
    	  self.count++;
    	  phantom.create(function(err, ph) {
              ph.createPage(function(err, page) {
              	page.set('settings.loadImages',false);
              	page.viewportSize = {
              		  width: 1024,
              		  height: 20000
              		};
                  page.open(url, function(err, status) {
                      console.log("opened site? "+status);
                      page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js",function(err){
                    	  setTimeout(function(){
                             return  page.evaluate(function(){
                                  return {
                                      dom:document.documentElement.outerHTML
                                  };
                              },function(err,result){
                            	  self.count--;
                                  callback(err,result.dom);
                                  ph.exit();
                                  self._next();
                              });
                          },5000);
                      });
                  });
              });
          });
    },
    
    text:function(dom,field){
    	 var $doc=$(dom);
         var result=$doc.find(field).text();
         return result;
    },
    
    html:function(dom,field){
    	 var $doc=$(dom);
         var result=$doc.find(field);
         return result;
    },
    node:function(dom,field){
    	
    },
    attribute:function(dom,field1,field2){
    	var $doc=$(dom);
        var result=$doc.find(field1).attr(field2);
        return result;
    },
};