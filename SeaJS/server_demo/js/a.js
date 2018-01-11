define(function(require,exports,module){
	var $ = require('jquery');		//preload配置时不写此行

	var utils = require('jsstatic/utils');

	utils.show();

	$('.btn').click(function(){
		console.log('haha');
	});

});





