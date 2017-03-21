Container('WindowSize.GapChange', (function(){
    var handlerObjArr = []
    var current_window_width = window.innerWidth;
    setTimeout(initializate, 200);
    return {
        register: registerHandler
    }
    function resizeHandler(){
        current_window_width = window.innerWidth;

        for (var i = 0, len = handlerObjArr.length; i < len; i++) {
            setGap(handlerObjArr[i], current_window_width);
        }
    }
    function registerHandler(handlerArr, dividValArr){
        dividValArr.push(Infinity)
        var obj = {
            handlerArr: handlerArr,
            dividValArr: dividValArr,
            this_gap: null
        }

        setGap(obj, current_window_width)
        handlerObjArr.push(obj);
    }

    function setGap(obj, current_window_width){
        var gap = obj.this_gap;
        for (var i = 0, len = obj.dividValArr.length; i < len; i++) {
            if ( current_window_width <= obj.dividValArr[i] ) {
                obj.this_gap = i;
                break;
            }
        }
        if ( gap !== obj.this_gap ) {
            typeof obj.handlerArr[obj.this_gap] === 'function' && obj.handlerArr[obj.this_gap]()
        }
    }

    function initializate(){
        Container('window_event_ctrl').register('resize').push(function(){
            resizeHandler()
        });
    }
}()));