
$("#prodBtn").click(prodLogin);
$("#sandBtn").click(sandLogin);

var apiVersion = 'v37.0',
    clientId = '3MVG9HxRZv05HarR6hEBmResOSDNQ8hxeeVCWsFd8VSq4CN.HOyNwSj.mx5aFxT4l4viX.gplw1dR1EQ8TCgi',
    loginUrl = 'https://login.salesforce.com/',
    redirectURI = "https://test-lightning-out.herokuapp.com/oauthcallback.html",
    proxyURL = 'https://test-lightning-out.herokuapp.com/proxy/';
 

function prodLogin()
{
	loginUrl = 'https://login.salesforce.com/'; 
    login();
}

function sandLogin()
{
    loginUrl = 'https://login.salesforce.com/';
    /*login();*/
	oauthAutoConnect();
}
function login() {
    var url = loginUrl + 'services/oauth2/authorize?display=popup&response_type=token' +
        '&client_id=' + encodeURIComponent(clientId) +
        '&redirect_uri=' + encodeURIComponent(redirectURI);
    popupCenter(url, 'login', 700, 600);
}

function oauthCallback(response) {
    if (response && response.access_token) { 
        console.log(response);
        $.cookie("AccToken",response.access_token ) ;
        $.cookie("APIVer", apiVersion) ;
        $.cookie("InstURL",  response.instance_url) ; 
        $.cookie("idURL",  response.id) ;
        
		strngBrks = response.id.split('/');
		$.cookie("LoggeduserId",  strngBrks[strngBrks.length - 1]) ;
		
        oauthAutoConnect();
    } else {
        alert("AuthenticationError: No Token");
    }
}

function oauthCallback2(response) {
    if (response && response.access_token) { 
        console.log(response);
        $.cookie("AccToken2",response.access_token ) ;
        $.cookie("APIVer2", apiVersion) ;
        $.cookie("InstURL2",  response.instance_url) ; 
        $.cookie("idURL2",  response.id) ;
        
		strngBrks = response.id.split('/');
		$.cookie("LoggeduserId2",  strngBrks[strngBrks.length - 1]) ;
		
        window.location = 'Main';
    } else {
        alert("AuthenticationError: No Token");
    }
}

function popupCenter(url, title, w, h) {
    // Handles dual monitor setups
    var parentLeft = window.screenLeft ? window.screenLeft : window.screenX;
    var parentTop = window.screenTop ? window.screenTop : window.screenY;
    var left = parentLeft + (window.innerWidth / 2) - (w / 2);
    var top = parentTop + (window.innerHeight / 2) - (h / 2);
    return window.open(url, title, 'width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}

function oauthAutoConnect(){
	
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://test-lightning-out.herokuapp.com/getToken');
	xhr.send();
	
	xhr.addEventListener('readystatechange', function() {
  		if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
			oauthCallback2(JSON.parse(xhr.responseText));
  		}
  	});
}
