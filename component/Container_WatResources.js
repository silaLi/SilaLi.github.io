Container('WaitResources', function (completehandler, loadhandler){
    var count = 0;
    var isComplete = false;
    var Event = Container('Event')
    return { push: pushArr, complete: complete, setLoadhandler: setLoadhandler }

    function setLoadhandler(_loadhandler){
        loadhandler = _loadhandler;
    }
    function pushArr(resources){
        if ( typeof resources.length === 'number' && resources.length > 0 ) {
            for (var i = resources.length - 1; i >= 0; i--) {
                push(resources[i])
            }
        }
        return this;
    }
    function push(resources){
        if (resources.complete !== true) {
            count++;
            Event.bind(resources, 'load', onload)
        }
    }

    function complete(){
        isComplete = true
        if ( count === 0 ) {
            completehandler && completehandler();
        }
        return this;
    }

    function onload(e){
        loadhandler && loadhandler(e, this)
        count--;
        if ( count === 0 ) {
            isComplete && completehandler && completehandler();
        }
    }
});