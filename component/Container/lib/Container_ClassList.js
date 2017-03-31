/**
 * [description]
 * @Author   liyang
 * @mail     ly20479293@gmail.com
 * @DateTime 2017-03-31T12:00:48+0800
 * @example
 * add:
 * ClassList.add(testElem, 'name1')
 * 
 * contains:
 * ClassList.contains(testElem, 'name1')
 *
 * rmove:
 * ClassList.remove(testElem, 'name1');
 */
;Container.set('ClassList', function(){
    return{
        add: addClass,
        remove: removeClass,
        contains: containsClass
    }
    function containsClass(elem, className){
        if (!elem) { return 'there is no elem'; }

        var classList = getClassList(elem);
        if (contains(classList, className) < 0) {
            return false
        }
        return true;
    }
    function addClass(elem, className){
        if (!elem) { return 'there is no elem'; }

        var classList = getClassList(elem);
        if (contains(classList, className) < 0) {
            classList.push(className)
        }
        setClassList(elem, classList)
        return elem;
    }
    function removeClass(elem, className){
        if (!elem) { return 'there is no elem'; }
        
        var classList = getClassList(elem);
        var index = contains(classList, className);
        if (index >= 0) {
            classList.splice(index, 1);
            setClassList(elem, classList);
        }
        return elem;
    }
    function contains(classList, className){
        for (var i = 0, len = classList.length; i < len; i++) {
            if (classList[i] == className) {
                return i;                
            }
        }
        return -1;
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
        elem.className = classList.join(' ');
    }
});