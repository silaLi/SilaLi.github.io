Container('ClassList', (function(){
    var $ = Container('$');
    return{
        add: addClass,
        remove: removeClass,
        contains: containsClass
    }
    function containsClass(elem, className){
        return $(elem).hasClass(className);
    }
    function addClass(elem, className){
        $(elem).addClass(className);
    }
    function removeClass(elem, className){
        $(elem).removeClass(className);
    }
}()));