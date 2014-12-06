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
prepareSideList();
}

function prepareSideList() {					//Add event listeners to all items of class "expandable" so when you click they execute the "expand" function
	var list = document.querySelectorAll(".expandable");
	for (var i = 0; i < list.length; i++)
	{
		list[i].dataset.isExpanded = "true";
		list[i].addEventListener("mousedown", function() { expand(event);});
	}
}

  function expand(ev) {
		
		var hideList = ev.target.querySelectorAll('ul');
		
		if(ev.target.dataset.isExpanded == "true")	//Collapse a list topic
		{
			ev.target.dataset.isExpanded = "false";
			for ( var i = 0; i < hideList.length; i++)
			{
				hideList[i].style.display = "none";
			}
		}
		else
		{
			ev.target.dataset.isExpanded = "true";	//Expand a list topic
			for ( var i = 0; i < hideList.length; i++)
			{
				hideList[i].style.display = "initial";
			}
		}

  }
