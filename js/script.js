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