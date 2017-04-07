Container.set("_$", function(){
	return function(selector, elem) {
	    return elem ? elem.querySelector(selector) : document.querySelector(selector) 
	}
});
Container.set("_$s", function(){
	return function(selector, elem) {
	    return elem ? elem.querySelectorAll(selector) : document.querySelectorAll(selector) 
	}
});