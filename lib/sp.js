sp = exports.sp = {
	getDom : function(url, callback) {
		try {
			var Spooky = require('spooky');
		} catch (e) {
			var Spooky = require('../lib/spooky');
		}

		var spooky = new Spooky({
			child : {
				transport : 'http'
			},
			casper : {
				logLevel : 'debug',
				verbose : true
			}
		}, function(err) {
			if (err) {
				e = new Error('Failed to initialize SpookyJS');
				e.details = err;
				throw e;
			}

			spooky.start(url);
			spooky.then(function() {
				this.scrollToBottom();
				this.wait(10000, function() {
					this.capture('debug1.png');
					this.emit('dom', this.evaluate(function() {
						return document.documentElement.outerHTML;
					}));
				});
			});
			spooky.run();
		});

		spooky.on('error', function(e, stack) {
			console.error(e);

			if (stack) {
				console.log(stack);
			}
			callback(e, null);
		});

		spooky.on('dom', function(dom) {
			console.log(dom);
			callback(null, dom);
		});

		spooky.on('log', function(log) {
			if (log.space === 'remote') {
				console.log(log.message.replace(/ \- .*/, ''));
			}
		});
	},

	getNextPage : function(url, pageno, callback) {
		try {
			var Spooky = require('spooky');
		} catch (e) {
			var Spooky = require('../lib/spooky');
		}

		var spooky = new Spooky({
			child : {
				transport : 'http'
			},
			casper : {
				logLevel : 'debug',
				verbose : true
			}
		}, function(err) {
			if (err) {
				e = new Error('Failed to initialize SpookyJS');
				e.details = err;
				throw e;
			}

			spooky.start(url);
		    spooky.thenEvaluate(function(pageno) {
				document.querySelector('.extra .num').setAttribute('value',
						pageno);
			}, 'CasperJS');
			spooky.then(function() {
				this.clickLabel('确定','div span');
//				this.click('a.J_Ajax.btn.next');
				// this.click(".inner .icon");
			});
			spooky.then(function() {
				this.emit('url', this.getCurrentUrl());
			});
			spooky.run();
		});

		spooky.on('error', function(e, stack) {
			console.error(e);

			if (stack) {
				console.log(stack);
			}
			callback(e, null);
		});

		spooky.on('url', function(url) {
			console.log(url);
			callback(null, url);
		});

		spooky.on('log', function(log) {
			if (log.space === 'remote') {
				console.log(log.message.replace(/ \- .*/, ''));
			}
		});
	}

}