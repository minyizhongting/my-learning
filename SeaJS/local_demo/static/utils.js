define('jsstatic/utils',function(require,exports,module){
	var Utils = {};
	
	Utils.showMsg = function(msg){
		console.log('======'+msg+'======');
	};

	Utils.showWelcome = function(){
		console.log('Welcome!');
	}

	module.exports = Utils;

});





