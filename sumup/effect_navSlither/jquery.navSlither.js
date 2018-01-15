$.fn.NavSlither = function () {
	var $_NavDiv = $(this),
		$_NavUl = $('ul', $_NavDiv),
		$_NavLi = $('li', $_NavUl),
		$_NavA = $('a',$_NavA),
		$_NavHua = $('.border', $_NavDiv),
		$_NavMHK = $('span', $_NavHua),
		dnum = $_NavLi.index($_NavDiv.find(' ul li.active')),
		$Ac_li = $_NavLi.eq(dnum).children('a'),
		widthA = $Ac_li.width(),
		leftA = $Ac_li.position().left;
	$_NavMHK.css({ width: widthA, left: leftA+30 });
	$_NavLi.hover(function () {
		var index = $_NavLi.index(this),
			widthB = $_NavLi.eq(index).children('a').width(),
			leftB = $_NavLi.eq(index).children('a').position().left;
		$_NavMHK.stop().animate({ width: widthB, left: leftB+30 }, 200);
	}, function () {
		$_NavMHK.stop().animate({ width: widthA, left: leftA+30 }, 200);
	});
}
$(function(){
	$('#page-tab').NavSlither();
	$(window).resize(function() {
	  $('#page-tab').NavSlither();
	});
});
