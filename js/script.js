var xmlhttp = new XMLHttpRequest();

var pagetype;

function setPageType(type) {
	pagetype = type;
}

xmlhttp.onreadystatechange = function() {
	//if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		var myArr = JSON.parse(xmlhttp.responseText);
	
		loadHomeworkList(myArr);
	//}
}

function loadHomeworkList(myArr) {
	var output = '<ul id="sideList">';
	
	if(pagetype == "student")
	{
		for(var i = 0; i < myArr.length; i++) {
			output += '<li class="expandable">' + myArr[i].topic + '<ul>';
			for(var j = 0; j < myArr[i].subtopics.length; j++) {
				output += '<li><span onclick="loadPage(\'' + myArr[i].subtopics[j].ref + '\', event); return false;">' + myArr[i].subtopics[j].name + '</span></li>';
			}
			output += '</ul></li>';
		}
	}
	
	if(pagetype == "teacher")
	{
		for(var i = 0; i < myArr.length; i++) {
			output += '<li class="expandable">' + myArr[i].topic + '<img src="img/edit2.png" alt="edit2" class="editButton" onclick="wysiwyg('+"'pages/histogram.html');'"+'><ul>';
			for(var j = 0; j < myArr[i].subtopics.length; j++) {
				output += '<li><img src="img/edit2.png" alt="edit2" class="editButton"><span onclick="loadPage(\'' + myArr[i].subtopics[j].ref + '\', event); return false;">' + myArr[i].subtopics[j].name + '</span></li>';
			}
			output += '</ul></li>';
		}
	}
	
	output += '</ul>';
	
	var sideList = document.getElementById("sideListContainer");

	sideList.innerHTML = output;
	
	prepareSideList();
}

function getHomeworkList(val)
{
	var filename = "json/homework_" + val + ".json";
	xmlhttp.open("GET", filename, true);
	xmlhttp.send();
}

function loadPage(url, ev) {
	var list = document.querySelectorAll("#sideListContainer li, span");
	for(var i = 0; i < list.length; i++)
	{
		list[i].style.color = "rgb(36,93,144)";
	}

	if(ev != null){
		ev.target.style.color = "rgb(124,175,222)";
	}
	document.getElementById("main_frame").src = url;


	if(url === "pages/main.html")
	{
		document.getElementById("backButton").style.visibility = "hidden";
		document.getElementById("sendFeedback").style.visibility = "hidden";
	}
	else if(url === "pages/searchResults.html"){
		document.getElementById("backButton").style.visibility = "visible";
		document.getElementById("sendFeedback").style.visibility = "hidden";
	}
	else
	{
		document.getElementById("backButton").style.visibility = "visible";
		document.getElementById("sendFeedback").style.visibility = "visible";
	}
}

function prepareSideList() {					//Add event listeners to all items of class "expandable" so when you click they execute the "expand" function
	var list = document.querySelectorAll("#sideListContainer .expandable");
	for (var i = 0; i < list.length; i++)
	{
		list[i].dataset.isExpanded = "false";
		list[i].addEventListener("click", function(event) { expand(event);}, false);
			
		var child = list[i].children;
		
		for(var k = 0; k < child.length; k++)
		{
			if(child[k].nodeType === 1 && child[k].tagName === "UL") {
				child[k].style.display = "none";
			}
		}
		list[i].style.backgroundImage = "url(img/collapsedSm.png)";
	}
}

function prepareSearchTrends() {				//Add event listeners to all items of class "expandable" so when you click they execute the "expand" function
	var list = document.querySelectorAll("#listContainer .expandable");
		
	for (var i = 0; i < list.length; i++)
	{
		list[i].dataset.isExpanded = "false";
		list[i].addEventListener("click", function(event) { expand(event);}, false);
			
		var child = list[i].children;
		
		for(var k = 0; k < child.length; k++)
		{
			if(child[k].nodeType === 1 && child[k].tagName === "UL") {
				child[k].style.display = "none";
			}
		}
		list[i].style.backgroundImage = "url(img/collapsedSm.png)";
	}
}

function expand(ev) {
	ev.stopPropagation();

	//alert("expand");
	
	//var hideList = ev.target.querySelectorAll(':scope > ul');
	
	var hideList = [];
	
	var children = ev.target.childNodes;
	for(var i = 0, l=children.length; i<l; ++i) {
		var child = children[i];
		if(child.nodeType === 1 && child.tagName === "UL") {
			hideList.push(child);
		}
	}
	
	//alert(hideList.length);
	
	if(ev.target.dataset.isExpanded == "true")	//Collapse a list topic
	{
		//alert("trying to collapse");
		ev.target.dataset.isExpanded = "false";
		//ev.target.style.backgroundColor = "red";
		ev.target.style.backgroundImage = "url(img/collapsedSm.png)";
		for ( var i = 0; i < hideList.length; i++)
		{
			hideList[i].style.display = "none";
		}
	}
	else if(ev.target.dataset.isExpanded == "false")	//can't just say "else" because sub menus have isExpanded == undefined
	{
		//alert("trying to expand");
		ev.target.dataset.isExpanded = "true";	//Expand a list topic
		//ev.target.style.backgroundColor = "blue";
		ev.target.style.backgroundImage = "url(img/expandedSm.png)";
		for ( var i = 0; i < hideList.length; i++)
		{
			hideList[i].style.display = "initial";
		}
	}

}

/*----Google Search----*/

/*---In order for the search to execute properly it requires
 * that the referrer url be associated with the API key.
 * This code will not execute if it is not hosted on a server,
 * and the domain isn't registered with the API key.
 * /
 
/*--executes search--*/
function searchFor(searchTerm){
	var query = searchTerm.replace(" ","+");
	
	console.log("Search term: " + searchTerm);
	 
	var xmlHttp = null;
	xmlHttp = new XMLHttpRequest();
	
	var cx = '014170545056911956546:khinlequpe4';
    var key = 'AIzaSyDDWWkXSEtV6C61SHdCQZoWaF6llsNr1R4';
    var callback = 'hndlr';
    var url = 'https://www.googleapis.com/customsearch/v1?key=' + key 
				+ '&cx=' + cx + '&q=' + query 
				+ '&callback=' + callback;
	console.log(url);
	
	xmlHttp.onreadystatechange
	xmlHttp.open("GET", url, true);
	xmlHttp.send(null);
	xmlHttp.onreadystatechange = hndlr;
}

/*--handles response from google search--*/
/*--will display gibbs results if error--*/
 function hndlr() {
	 if(this.readyState == 4 && this.status == 200){
		 var responseText = this.responseText;
		 var JSONresponse = responseText.substr(22,responseText.length - 25);
		 //console.log(JSONresponse);
		 var response = JSON.parse(JSONresponse);
		 console.log(responseText);
		 if(response.items != null){
			var html = "data:text/html;charset=utf-8,"+ encodeURI("<head><base href='http://students.cs.byu.edu/~RPFrame/thundercatz/Stats-Project/' target='_top' /><link rel='stylesheet' type='text/css' href='css/gibbsStyle.css'></head>");/*document.getElementByTag("body").innerHTML = "";*/
			for (var i = 0; i < response.items.length; i++) {
				var item = response.items[i];
				console.log(responseText);
				var temphtml = "";
				temphtml = "<br>" +'<li class="b_algo"><h2><a target="_top" '+'href="search.html?a='+encodeURIComponent(item.link)+'">'+ item.htmlTitle + "</a></h2>" 
																	+"<cite>" + item.htmlFormattedUrl + "</cite><br>"
																	+ item.htmlSnippet + "<br>";
				html += encodeURI(temphtml);
				}
			document.getElementById("main_frame").src = html;
		 }else{
			alert("Search Error");
			/*loadPage('pages/gibbs_results.html');*/
		 } 
	 }  
 }
 /*----end google search----*/
 
 //toggles modal overlay display
 function overlay() {
	el = document.getElementById("overlay");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	document.getElementById("feedbackTextarea").value = "";
}

function searchEnter(ev) {
	if(ev.which == 13)
	{
		search();
	}
}

function search(){
	var searchBox = document.getElementById("searchBar");
	var searchTerm = searchBox.value;
	doSearch(searchTerm);
	searchBox.value="";
	document.getElementById("backButton").style.visibility = "visible";
	document.getElementById("sendFeedback").style.visibility = "hidden";
}

function doSearch(searchTerm){
	/*loadPage("pages/searchResults.html?a="+encodeURIComponent(searchTerm));*/
	searchFor(searchTerm);
}

//called when back button is pressed
function backButton(){
	loadPage("pages/main.html", null);
}

//gets query value from url
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//sets page to page in url and sizes iframe height
function parsePageQuery(){	
	var body = document.body,
    html = document.documentElement;
	var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
	document.getElementById("search_frame").style.height = height-170;
	/*document.getElementsByTagName("body").style.height = height-200;*/
	
	document.getElementById("search_frame").src = getParameterByName("a");
}

//loads wysiwyg for specified url. url="" means new page
function wysiwyg(url = ""){
	if(url === "")
	{
		
	}
	else
	{
		loadPage(url,null);
		var x = document.getElementById("main_frame").contentWindow.document.getElementByTag("body");
        myNicEditor = new nicEditor();
        myNicEditor.setPanel('Panel');
        myNicEditor.addInstance(x);
	}
}

