
$("#prodBtn").click(prodLogin);
$("#sandBtn").click(sandLogin);

var apiVersion = 'v37.0',
    clientId = '3MVG9HxRZv05HarR6hEBmResOSDNQ8hxeeVCWsFd8VSq4CN.HOyNwSj.mx5aFxT4l4viX.gplw1dR1EQ8TCgi',
    loginUrl = 'https://login.salesforce.com/',
    redirectURI = "https://test-lightning-out.herokuapp.com/oauthcallback.html",
    proxyURL = 'https://test-lightning-out.herokuapp.com/proxy/',
    client_secret = '8382827325637032585',
    username = 'test-heroku@trailhead.com',
    password = 'testheroku2017',
    securityToken = 'XI4oaVedcpPXRKfV9d4o3B1xl';
 

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
	var body = 'grant_type=password'+
	    '&client_id='+clientId+
	    '&client_secret='+client_secret+
	    '&username='+username+
	    '&password='+password+securityToken;
	
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'https://login.salesforce.com/services/oauth2/token',true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.withCredentials = true;
	
	/*xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
	xhr.setRequestHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization,X-Authorization'); 
	xhr.setRequestHeader('Access-Control-Allow-Methods', '*');
	xhr.setRequestHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
	xhr.setRequestHeader('Access-Control-Max-Age', '1000');
	
	/*xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.setRequestHeader("Access-Control-Allow-Methods", "POST");
        xhr.setRequestHeader("Access-Control-Allow-Headers", "Content-Type, Content-Range, Content-Disposition, Content-Description");
	*/
	xhr.send(body);
	
	xhr.addEventListener('readystatechange', function() {
  		if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
  			console.log(xhr.responseText);
  		}
  	});
}
