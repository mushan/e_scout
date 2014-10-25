var async = require('async');
var html = require('../lib/html').html;

var aa=[];
aa.push("http://item.taobao.com/item.htm?id=37154005608&scm=1029.newlist-0.bts4.50002634&ppath=&sku=&ug=");
aa.push("http://detail.tmall.com/item.htm?id=22596128436&scm=1029.newlist-0.1.50002634&ppath=&sku=&ug=");
aa.push("http://item.taobao.com/item.htm?id=8502279157&scm=1029.newlist-0.bts5.50002634&ppath=&sku=&ug=");
aa.push("http://detail.tmall.com/item.htm?id=36256698208&scm=1029.newlist-0.bts3.50002634&ppath=&sku=&ug=");
async.each(aa,function(item){
	html.getDom(item, function(err,result){
		console.log(">>>>>"+item);
		console.log("<<<<<"+result.substr(0,10));
	})
	
})
