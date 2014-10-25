var fs=require('fs');
var parser=require('../parser').parser;

var dom=fs.readFileSync('aa.txt','utf-8');

var url="http://chaoshi.detail.tmall.com/item.htm?&spm=a230r.1.14.1.EWqsCE&ad_id=&am_id=&cm_id=140105335569ed55e27b&pm_id=&userBucket=18&id=12428472473";

var result=parser.parse(dom, url)
console.log(result);
