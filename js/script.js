function loadPage(url) {
/*alert(url);*/
/*var req = new XMLHttpRequest();
req.open("GET", url, false);
req.send(null);
var page = req.responseText;*/
document.getElementById("main_frame").src = url;
/*var cssLink = document.createElement("link") 
cssLink.href = "css/pages.css";
cssLink .rel = "stylesheet"; 
cssLink .type = "text/css"; 
frames['main_frame'].document.body.appendChild(cssLink);*/
/*document.getElementById("main_frame").contentWindow.location.reload(true);*/
}

/* Sidebar */
/*function prepareSideList() {
	var list = document.getElementById("sideList");
	var topicList = list.querySelectorAll(".topic");
	for ( var i = 0 i < topics.length; i++) {
		topics[i] = topicList[i];
	}
	
		
}
End Sidebar*/

function prepareList() {
	alert("yay!");
	//$('#expList')
	var sideList = document.querySelectorAll('.expandable');
	alert(sideList);
	for ( var i = 0; i < sideList.length; i++)
	{
		alert(sideList[i].innerHTML + " " + i);
		sideList[i].addEventListener('click', function(event) {
			if (this == event.target) {
				
			}
		{
	}
	lis.push("gay");
	alert(lis);
}
	/*
  .find('li:has(ul)')
  	.click( function(event) {
  		if (this == event.target) {
  			$(this).toggleClass('expanded');
  			$(this).children('ul').toggle('medium');
  		}
  		return false;
  	})
  	.addClass('collapsed')
  	.children('ul').hide();
  };
 
  $(document).ready( function() {
      prepareList();
  });*/