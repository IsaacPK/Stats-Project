function loadPage(url) {
alert(url);
/*var req = new XMLHttpRequest();
req.open("GET", url, false);
req.send(null);
var page = req.responseText;*/
document.getElementById("main_frame").src = url;
/*document.getElementById("main_frame").reload(true);*/
}