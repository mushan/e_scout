var async = require('async');
var html = require('./lib/html').html;
var settings = require('./settings').settings;
var parser = require('./parser').parser;
var entry = require('./entry').entry;

var detail_url=require('./db/list').detail_url;
var out = require('./db/out').out;


var urls=["http://list.taobao.com/itemlist/default.htm?cat=50002634&isprepay=1&as=0&viewIndex=1&atype=b"];
var crawler = exports.crawler = {
	run : function(urls) {
		async.each(urls,function(url){
			entry.getPageCount(url, function(err, pagecount) {
				if (err !== null && err !== undefined) {
                    console.log("pagecount_err:"+err);
				}else{
					console.log(">>>>>>>pagecount:" + pagecount);
					var tmp=[];
					for(var i=1;i<=pagecount;i++){
						tmp.push(i);
					}
					async.each(tmp,function(index){
						entry.getPageItems(url, index, function(err, entries) {
							if(err!==null&&err!==undefined){
								console.log("entries_err:"+err);
							}else{
								async.each(entries,function(suburl){
									html.getDom(suburl, function(err, dom) {
										var result = parser.parse(dom, suburl);
										console.log(">>>>>>>closed_url:"+suburl);
										detail_url.add({"url":suburl},function(err,r){
											if(err!==null&&err!==undefined){
												console.log("add_detail_url_err:"+err);
											}
										});
										console.log(">>>>>>>out:" + result);
										out.add(result, function(err, r) {
											if(err!==null&&err!==undefined){
												console.log("add_out_err:"+err);
											}
										});
									});
								});
							}
						});
					})
				}
			});
		});
	}
};
