/**
 * Container: it should be in header, and it should be first run in all of javascript
 * @param  {Object} ){var objs_Container [description]
 * @return {[type]}        [description]
 */
var Container = (function() {
    var objs_Container = {};

    function get(name) {
        return objs_Container[name]
    }

    function set(name, obj, forcibly) {
        var forcibly = forcibly === true ? true : false;
        if (forcibly || get(name) === undefined) { objs_Container[name] = obj } else {
            throw name + " already exists! you can't cover " + name + " name: " + get(name)
        }
    }
    return function(name, obj, forcibly) {
        if (obj === undefined) {
            return get(name)
        } else { set(name, obj, forcibly) }
    }
})();
