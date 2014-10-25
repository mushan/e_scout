var html = require('./lib/html').html;

var entry = exports.entry = {
	getPageCount : function(url, callback) {
		var count = 0;
		html.getDom(url, function(err, dom) {
			if (url.indexOf("taobao") > -1) {
				count= html.attribute(dom, "input.num", "data-total");
			}
			if (url.indexOf("tmall") > -1) {
				var a = html.text(dom, ".ui-page-s .ui-page-s-len");
				count = a.split('/')[1];
			}
			if (url.indexOf("jd") > -1) {
				var a = html.text(dom, "#top_pagi .text");
				count = a.split('/')[1];
			}
			if (url.indexOf("yhd") > -1) {
				count = html.attribute(dom, "#pageCountPage","value");
			}
			callback(null,count);
		})
	},

	
	getPageItems : function(url, pageNo, callback) {
		var list = [];
		if (url.indexOf("taobao") > -1) {
			if (url.indexOf("&s=") > -1) {
				var tmp1 = url.split("&s=");
				var tmp2 = tmp1[1].split("&style=grid");
				url = tmp1[0] + "&style=grid" + tmp2[1];
			}
			var newurl = url + "&s=" + 60 * (pageNo - 1);
			html.getDom(newurl, function(err, dom) {
				var _list = html.html(dom, ".title a.J_AtpLog");
				for (var i = 0; i < _list.length; i++) {
						list.push(_list[i].href);
				}
				console.log("current_page_url:"+newurl);
				console.log("detail_count:"+list.length);
				callback(err, list);
			});
		}
		if (url.indexOf("tmall") > -1) {
			if (url.indexOf("&s=") > -1) {
				var tmp1 = url.split("&s=");
				var tmp2 = tmp1[1].split("&q=");
				url = tmp1[0] + "&q=" + tmp2[1];
			}
			var newurl = url + "&s=" + 60 * (pageNo - 1);
			html.getDom(newurl, function(err, dom) {
				var _list = html.html(dom, ".info .title a");
				for (var i = 0; i < _list.length; i++) {
					if (_list[i].className === "J_AtpLog") {
						list.push(_list[i].href);
					}
				}
				callback(err, list);
			});
		}
		if (url.indexOf("jd") > -1) {
			if (url.indexOf("&page=")) {
				var tmp = url.split("&page=");
				url = tmp[0];
			}
			var newurl = url + "&page=" + pageNo;
			html.getDom(newurl, function(err, dom) {
				var _list = html.html(dom, "#plist .p-name a");
				for (var i = 0; i < _list.length; i++) {
					if (_list[i].target === "_blank") {
						list.push(_list[i].href);
					}
				}
				callback(err, list);
			});
		}
		if (url.indexOf("yhd") > -1) {
			if (url.indexOf("#page=")) {
				var tmp = url.split("#page");
				url = tmp[0];
			}
			var newurl = url + "#page=" + pageNo + "&sort=1";
			html.getDom(newurl, function(err, dom) {
				var _list = html.html(dom, ".search_item .search_item_box a");
				for (var i = 0; i < _list.length; i++) {
					if (_list[i].className === "search_prod_img") {
						list.push(_list[i].href);
					}
				}
				callback(err, list);
			});

		}

	}
};
