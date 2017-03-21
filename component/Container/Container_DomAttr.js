Container('Attr', function(elem){
    return{
        get: get,
        set: set
    }
    function get(name){
        return elem.getAttribute(name);
    }
    function set(name, value){
        elem.setAttribute(name, value);
    }
});