define(function(require,exports,module){
	// var $ = require('jquery');	//preload配置时不写此行
	var Utils = require('jsstatic/utils');

	$('h1').click(function(){
		Utils.showWelcome();
	});

	$('.btn').click(function(){
		Utils.showMsg($(this).html());
	});

});





