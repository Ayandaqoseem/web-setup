(function (global) {

	// set up a namespace for our utility
	var ajaxUtils = {};


	// returns an HTTP request object
	function getRequestObject () {
		if (window.XMLHttpRequest) {
			return (new XMLHttpRequest);
		}
		else if (window.ActiveXOject) {
			// for very old IE browser (optional)
			return (new ActiveXOject("Microsoft.XMLHTTP"));
		}
		else {
			global.alert("Ajax not sopported");
			return(null);
		}
	}

	// make an ajax GET request to 'requestUrl'
	ajaxUtils.sendGetRequest = 
		function(requestUrl, responseHandler, isJsonResponse) {
			var request = getRequestObject();
			request.onreadystatechange =
				function() {
					handleResponse(request,
									responseHandler,
									isJsonResponse);
				};
			request.open("GET", requestUrl, true);
			request.send(null); //for POST only
		};


		// Only calls user provided 'responseHandler'
		// fuunction if response is ready 
		// and not an error
		function handleResponse (request, responseHandler, isJsonResponse) {
			if ((request.readyState == 4) &&
				(request.status == 200)) {

					//Default to isJsonResponse = true
				if (isJsonResponse == undefined) {
					isJsonResponse = true;
				}
				if (isJsonResponse) {
					responseHandler(JSON.parse(request.responseText));
				}
				else {
					responseHandler(request.responseText);
				}
			}
		}

// Expose utility to the global object
global.$ajaxUtils = ajaxUtils;
})(window);