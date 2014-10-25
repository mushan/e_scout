var html=require('../lib/html').html;

var url="http://list.jd.com/list.html?cat=1319%2C1525%2C7057&brand=8067%2C%E5%A5%BD%E5%A5%87%EF%BC%88Huggies%EF%BC%89&page=1";

html._process(url,function(err,result){
	console.log("aaaa"+result);
});