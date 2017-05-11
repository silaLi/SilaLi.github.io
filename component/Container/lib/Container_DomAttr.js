Container.set('Attr', function () {
    return function(elem){
        return{
            get: get,
            set: set,
            remove: remove
        }
        function get(name){
            return elem.getAttribute(name);
        }
        function set(name, value){
            elem.setAttribute(name, value);
            return this;
        }
        function remove(name){
            elem.removeAttribute(name);
            return this;
        }
    }
});