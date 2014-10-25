var entry=require("../entry").entry;


entry.getPageItems("http://list.taobao.com/itemlist/default.htm?cat=50002634&isprepay=1&viewIndex=1&as=0&atype=b&style=list&same_info=1&isnew=2&tid=0&_input_charset=utf-8", 1, function(err,result){
	console.log(result);
});