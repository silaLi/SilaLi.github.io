Container("_$", function(selector, elem) {
    return elem ? elem.querySelector(selector) : document.querySelector(selector) 
});
Container("_$s", function(selector, elem) {
    return elem ? elem.querySelectorAll(selector) : document.querySelectorAll(selector) 
});