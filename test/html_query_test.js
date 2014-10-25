var html=require('../lib/html').html;
var fs=require('fs');
var dom=fs.readFileSync('yhd.html','utf-8');

var list=[];
var _list=html.query(dom,".search_item .search_item_box a");
for(var i=0;i<_list.length;i++){
    if(_list[i].className=='search_prod_img'){
      list.push(_list[i].href);
    }
  }
console.log(list.join("\n"));
	
	
//var result=html.query(dom, "J_AtpLog");
//
//console.log(result);