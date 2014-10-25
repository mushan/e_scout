var html = require('./lib/html').html;

var parser = exports.parser = {
	parse : function(dom, url) {
		var result = {
			"name" : "",
			"price" : "",
			"promotion" : "",
			"sales_qty" : "",
			"sales_closed" : "",
			"views" : "",
			"star" : "",
			"review_count" : "",
			"channel" : "",
			"url" : url,
			"id" : "",
			"merchant" : ""
		};
		if (url.indexOf("taobao") > -1) {
			result.name = html.text(dom, "#detail .tb-detail-hd h");
			result.price = html.text(dom, "#J_StrPrice .tb-rmb-num");
			result.promotion = html.text(dom, "#J_PromoPrice .tb-rmb-num").replace("¥","");
			result.merchant = html.text(dom, "#J_TSignBoard .shop-name a");
			result.sales_qty = html.text(dom, ".tb-sold-out .J_TDealCount");
			result.sales_closed = html.text(dom,
					".tb-sold-out .J_OrdersClosed");
			result.views = html.text(dom, "#J_EmItemViews");
			result.star = html.text(dom, ".tb-r-score strong");
			result.review_count = html.text(dom, "#J_ReviewCount");
			result.channel = "tb";

			if (result.name === null || result.name === "") {
				result.name = html.text(dom, "#detail .tb-item-info h3");
			}
            var suburl=url.split("?")[1];
			var reg = new RegExp("(^|&)" + "id" + "=([^&]*)(&|$)", "i");
            var tmp = suburl.substr(0).match(reg);
            if (tmp != null) 
              result.id=unescape(tmp[2]);
			return result;
		}
		if (url.indexOf("tmall") > -1) {
			result.name = html.text(dom, '#detail .tb-detail-hd a');
			result.price = html.text(dom, '#J_StrPriceModBox .tm-price');
			result.promotion = html.text(dom, '#J_PromoPrice .tm-promo-price .tm-price');
			result.sales_qty = html.text(dom, '.tm-ind-panel .tm-count');
			result.merchant = html.text(dom, '#side-shop-info a');
			result.star = html.text(dom, '.rate-score');
			result.review_count = html.text(dom, '#J_ItemRates .tm-count');
			result.channel = "tmall";

			if (result.name === null || result.name === "") {
				result.name = html.text(dom, "#detail .tb-item-info h3");
			}
			if(result.name===null||result.name===""){
				result.name=html.text(dom, ".tb-detail-hd h3");
			}

			var suburl=url.split("?")[1];
			var reg = new RegExp("(^|&)" + "id" + "=([^&]*)(&|$)", "i");
			var tmp = suburl.substr(0).match(reg);
			if (tmp !== null)
				result.id = unescape(tmp[2]);
			return result;
		}
		if (url.indexOf("jd") > -1) {
			result.name = html.text(dom, '#name h1');
			result.price = html.text(dom, '#jd-price');
			result.promotion = html.text(dom, '#product-promotions .hl_red');
			result.star = html.text(dom, '#evaluate a');
			result.merchant = html.text(dom, '#seller a');
			result.channel = "jd";

			var tmp = url.split("/");
			result.id = tmp[1].replace(".html", "");
			return result;
		}
		if (url.indexOf("yhd") > -1) {
			result.name = html.text(dom, '#productMainName');
			result.price = html.text(dom, '#current_price');
			result.sales_qty = html.text(dom, '#mod_salesvolume strong');
			result.merchant = html.text(dom, '#mod_inshop_box strong');
			result.channel = "yhd";

			var tmp = url.split("/");
			result.id = tmp[2];
			return result;
		}
	}
}