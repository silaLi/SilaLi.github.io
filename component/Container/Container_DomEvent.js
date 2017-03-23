Container('Event', (function() {
    return {
        bind: bindEvent,
        unbind: unbindEvent
    }

    function bindEvent(elem, eventType, next, useCapture) {
        useCapture = useCapture ? true : false;
        if (!elem) {
            return 'has no element in bindEvent'
        }
        if (elem != window && typeof elem.length === 'number') {
            for (var i = elem.length - 1; i >= 0; i--) {
                bind(elem[i], eventType, next, useCapture);
            }
        } else {
            bind(elem, eventType, next, useCapture)
        }

        function bind(elem, eventType, next, useCapture) {

            if (elem.addEventListener) {
                elem.addEventListener(eventType, next, useCapture);
            }else if (elem.detachEvent) {
                elem.detachEvent('on' + eventType, next);
            } else {
                elem['on' + eventType] = next;
            }
        }
    }

    function unbindEvent(elem, eventType, next, useCapture) {
        useCapture = useCapture || false;
        
        if (!elem) {
            return 'has no element in bindEvent'
        }
        if (elem != window && typeof elem.length === 'number') {
            for (var i = elem.length - 1; i >= 0; i--) {
                unbind(elem[i], eventType, next, useCapture);
            }
        } else {
            unbind(elem, eventType, next, useCapture)
        }

        function unbind(elem, eventType, next, useCapture) {

            if (elem.removeEventListener) {
                elem.removeEventListener(eventType, next, useCapture);
            } else if (elem.detachEvent) {
                elem.detachEvent('on' + eventType, next);
            } else {
                elem['on' + eventType] = null;
            }
        }
    }
}()));