Container('ElementNodeCreator', function(htmlTemplate, elemSelector){
    var _$ = Container('_$');
    var elem = document.createElement('div');
    elem.innerHTML = htmlTemplate;
    return _$(elemSelector, elem);
});
Container('FastRender', function(str){
    var div = document.createElement('div');
    div.innerHTML = str;

    var childElements = [];
    for (var i = 0, len = div.childNodes.length - 1; i <= len; i++) {
        if (div.childNodes[i].nodeType == 1) {
            childElements.push(div.childNodes[i]);
        }
    }
    return childElements;
});