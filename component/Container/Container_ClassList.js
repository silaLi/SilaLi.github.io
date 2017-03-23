Container('ClassList', (function(){
    return{
        add: addClass,
        remove: removeClass,
        contains: containsClass
    }
    function containsClass(elem, className){
        var classList = getClassList(elem);
        if (contains(classList, className) < 0) {
            return false
        }
        return true;
    }
    function contains(classList, className){
        for (var i = 0, len = classList.length; i < len; i++) {
            if (classList[i] == className) {
                return i;                
            }
        }
        return -1;
    }
    function addClass(elem, className){
        var classList = getClassList(elem);
        if (contains(classList, className) < 0) {
            classList.push(className)
        }
        setClassList(elem, classList)
        return elem;
    }
    function removeClass(elem, className){
        var classList = getClassList(elem);
        var index = contains(classList, className);
        if (index >= 0) {
            classList.splice(index, 1);
            setClassList(elem, classList);
        }
        return elem;
    }

    function getClassList(elem){
        var classList = (elem.className || '').split(' ')
        for (var i = classList.length - 1; i >= 0; i--) {
            if (classList[i] === '') {
                classList.splice(i, 1);
            }
        }
        return classList;
    }
    function setClassList(elem, classList){
        console.log(elem.className, classList)
        elem.className = classList.join(' ');
    }
}()));