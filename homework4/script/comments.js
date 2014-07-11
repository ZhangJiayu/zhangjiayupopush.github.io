var templatePosition = $("div.commentBody script");
var template = templatePosition[0].innerHTML;
var templateInnerPosition = templatePosition[0].parentNode;
var currentPage = 0;
var totalPage = 3;

function getComment(pageNumber){
	$.ajax({
		url: ["commentRecord", String(pageNumber) + ".json"].join('/'),
		success: processData
	});
	
}

function processData(data){
	totalPage = data['totalPage'];
	templateInnerPosition.innerHTML = ejs.render(template, data);
console.log(data);
}
$("a.firstPage").live('click', function(){
	getComment(0);
});
$("a.previous").live('click', function(){
	if(currentPage > 0){
		currentPage--;
		getComment(currentPage);
	}
});
$("a.next").live('click', function(){
	if(currentPage < totalPage - 1){
		currentPage++;
		getComment(currentPage);
	}
});
$("a.end").live('click', function(){
	getComment(totalPage - 1);
});
getComment(0);