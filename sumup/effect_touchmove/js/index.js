(function(){
var sumup = 3;
var now = 1, last = 0;	//now当前页，last上一页
var towards = { up:1, right:2, down:3, left:4};
var isAnimating = false;

document.addEventListener('touchmove',function(event){
	event.preventDefault();
},false);

$(document).swipeUp(function(){
	if (isAnimating) return;
	last = now;
	if (last != sumup) { 
		now = last + 1;
		pageMove(towards.up);
	}
	// else{	//循环 最后一页->上翻到第一页
	// 	now = 1;
	// 	last = sumup;
	// 	pageMove(towards.up);
	// }
});

$(document).swipeDown(function(){
	if (isAnimating) return;
	last = now;
	if (last != 1) {
		now = last - 1;
		pageMove(towards.down);
	}
	// else{	//循环 第一页->下翻到最后一页
	// 	now = sumup;
	// 	last = 1;
	// 	pageMove(towards.down);
	// }
});

$(document).swipeLeft(function(){
	if (isAnimating) return;
	last = now;
	if (last != sumup) {
		now = last+1;
		pageMove(towards.left);
	}	
	// else{	//循环 最后一页->左翻到第一页 
	// 	now = 1;
	// 	last = sumup;
	// 	pageMove(towards.left);
	// }
});

$(document).swipeRight(function(){
	if (isAnimating) return;
	last = now;
	if (last != 1) {
		now = last-1;
		pageMove(towards.right);
	}	
	// else{	//循环 第一页->右翻到最后一页
	// 	now = sumup;
	// 	last = 1;
	// 	pageMove(towards.right);
	// }
});

function pageMove(tw){
	var lastPage = ".page-" + last,
		nowPage = ".page-" + now;
	
	switch(tw) {
		case towards.up:
			outClass = 'pt-page-moveToTop';
			inClass = 'pt-page-moveFromBottom';
			break;
		case towards.right:
			outClass = 'pt-page-moveToRight';
			inClass = 'pt-page-moveFromLeft';
			break;
		case towards.down:
			outClass = 'pt-page-moveToBottom';
			inClass = 'pt-page-moveFromTop';
			break;
		case towards.left:
			outClass = 'pt-page-moveToLeft';
			inClass = 'pt-page-moveFromRight';
			break;
	}
	isAnimating = true;
	$(nowPage).removeClass("hide");
	
	$(lastPage).addClass(outClass);
	$(nowPage).addClass(inClass);
	
	setTimeout(function(){
		$(lastPage).removeClass('page-current');
		$(lastPage).removeClass(outClass);
		$(lastPage).addClass("hide");
		$(lastPage).find("img").addClass("hide");
		
		$(nowPage).addClass('page-current');
		$(nowPage).removeClass(inClass);
		$(nowPage).find("img").removeClass("hide");
		
		isAnimating = false;
	},600);
}
})();
