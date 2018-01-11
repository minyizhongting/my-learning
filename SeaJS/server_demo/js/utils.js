define('jsstatic/utils',function(require,exports,module){
	var bUtils = {};
	bUtils.show = function(){
		console.log('show');
	};

	bUtils.hide = function(){
		console.log('hide');
	}

	module.exports = bUtils;
})