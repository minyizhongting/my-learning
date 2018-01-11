seajs.config({
	//模块系统的基础路径即base的默认值，默认是sea.js所在目录
	base:'',
	paths:{
		'jspath':'sea',
		'jsstatic':'js'
	},
	alias:{
		'jquery':'jspath/jquery/jquery-1.7.1.min.js'
	}
	// ,preload:['jspath/jquery/jquery-1.7.1.min.js']
});