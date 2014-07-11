function getNews(){
	$.ajax({
		url: "newsRecord/news.json",
		success: processNews
	});
}
function processNews(data){
	var templatePosition = document.querySelector('#news > .imgNews > .imgNewsContent > .slideImageContainer > .imageList > script');
	templatePosition.parentNode.innerHTML = ejs.render(templatePosition.innerHTML, data);


	$(document).ready(function(){
		var cw = $("div.ratio1to1").width();
		$("div.ratio1to1").css({"height": cw / 2 + 'px'});
		var allImage = $("img[id^=\"newsImage\"]");

		allImage.each(function(index, element){
			var indexOfElement = parseInt(element.id.substring(9));
			var newsWidth = $('div.slideImageContainer').width();
			$(element).css('-webkit-transform', 'translateX(' + String((indexOfElement - 1) * newsWidth) + 'px)');
		});

		var slideBarMouseIsDown = false;
		var setIntervalVar;
		$(".slideBar").mousedown(function(event){
			slideBarMouseIsDown = true;
			moveImage(event);
			setIntervalVar = setInterval(function(){moveImage(event);}, 500);
		}).mouseup(function(){slideBarMouseIsDown = false;clearInterval(setIntervalVar);})


		function moveImage(mousedownEvent){
			if(!slideBarMouseIsDown){
				return;
			}
			var X = mousedownEvent.offsetX;
			var speed = X / cw - 0.5;
			if(speed > 0){
				var translateXValue = -cw;
				if($('body>style').length > 0){
					$('body>style').remove();
				}
				var image = $(".imageList img");

				var tempNode = $(image[0]).clone(true);
				tempNode.css({'-webkit-transform': 'translateX(' + String((image.length - 1) * cw) + "px)"});
				tempNode.insertAfter(image.last());
				image = $(".imageList img");
				$(image[0]).remove();

				image.each(function(index, item){
					var tempMatrix = new WebKitCSSMatrix(window.getComputedStyle(item).webkitTransform);
					var offset = tempMatrix.m41;
					$(item).css({'transition': '-webkit-transform 0.45s ease-in-out', '-webkit-transform': 'translateX(' + String(offset + translateXValue) + 'px)'});
				});

			}
			else{
				var translateXValue = cw;
				if($('body>style').length > 0){
					$('body>style').remove();
				}
				
				$('<style id = \'tempStyle\'>.animationright{transition: -webkit-transform 0.5s ease-in-out; -webkit-transform: translateX(' + String(translateXValue) + 'px);}</style>').appendTo('body');
				var image = $(".imageList img");

				var tempNode = $(image[image.length - 1]).clone(true);
				tempNode.css({'-webkit-transform': 'translateX(' + String((-2) * cw) + "px)"});
				tempNode.insertBefore(image.first());
				image = $(".imageList img");
				$(image[image.length - 1]).remove();

				image.each(function(index, item){
					var tempMatrix = new WebKitCSSMatrix(window.getComputedStyle(item).webkitTransform);
					var offset = tempMatrix.m41;
					$(item).css({'transition': '-webkit-transform 0.45s ease-in-out', '-webkit-transform': 'translateX(' + String(offset + translateXValue) + 'px)'});
				});
			}
		}
	});

}

getNews();