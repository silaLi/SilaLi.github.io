
(function(){
    if ( !window.Container ) {
        window.Container=(function(){var objs_Container={};function get(name){return objs_Container[name]}function set(name,obj,forcibly){var forcibly=forcibly===true?true:false;if(forcibly||get(name)===undefined){objs_Container[name]=obj}else{throw name+" already exists! you can't cover "+name+" name: "+get(name)}}return function(name,obj,forcibly){if(obj===undefined){return get(name)}else{set(name,obj,forcibly)}}})();
    }
}());
Container('$', $)
Container('Hammer', Hammer)
Container("_$", function(selector, elem) {
    return elem ? elem.querySelector(selector) : document.querySelector(selector) 
});
Container("_$s", function(selector, elem) {
    return elem ? elem.querySelectorAll(selector) : document.querySelectorAll(selector) 
});
Container('ElementNodeCreator', function(htmlTemplate, elemSelector){
    var _$ = Container('_$');
    var elem = document.createElement('div');
    elem.innerHTML = htmlTemplate;
    return _$(elemSelector, elem);
});
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
Container('CreatId', (function(){
    var i = 0;
    var base_id = new Date().getTime();
    return function(){
        i++;
        return 'creatid__id__' + base_id + i;
    }
}()));
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
        if (typeof elem.length === 'number') {
            for (var i = elem.length - 1; i >= 0; i--) {
                bind(elem[i], eventType, next, useCapture);
            }
        } else {
            bind(elem, eventType, next, useCapture)
        }

        function bind(elem, eventType, next, useCapture) {
            $(elem).on(eventType, next);
            return 'jquery ready';

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
        if (typeof elem.length === 'number') {
            for (var i = elem.length - 1; i >= 0; i--) {
                unbind(elem[i], eventType, next, useCapture);
            }
        } else {
            unbind(elem, eventType, next, useCapture)
        }

        function unbind(elem, eventType, next, useCapture) {
            $(elem).off(eventType, next);
            return 'jquery ready';

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
Container('window_event_ctrl', (function(){
    var $ = Container('$');
    var creatId = Container('CreatId');

    var EventSet = {}
    return {
        register: function(eventName){
            if (!EventSet[eventName]) {
                EventSet[eventName] = {
                    eventName: eventName,
                    ctrl: eventCtrl(eventName)
                }
            }
            return EventSet[eventName].ctrl;
        }
    }
    function eventCtrl(eventName){
        var handlerObjSet = {};
        var handlerIdArr = []
        $(window).on(eventName, function(){
            for (var i = 0, len = handlerIdArr.length; i < len; i++) {
                typeof handlerObjSet[handlerIdArr[i]].handler === 'function' && handlerObjSet[handlerIdArr[i]].handler();
            }
        })
        return {
            push: on,
            remove: off
        }


        function on(handler){
            var id = creatId();


            var handlerObj = {
                id: id,
                handler: handler,
                index: handlerIdArr.length
            }
            handlerObjSet[id] = handlerObj;
            handlerIdArr.push(id);
            return id;
        }
        function off(id){
            var handlerObj = handlerObjSet[id];
        }
    }
}()));
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
Container('PreventDefault', function(e) {
    e.preventDefault()
    e.stopPropagation()
    return false
});
/** can make hostory not record the link, and instead of the hostory top link */
Container('fnUrlReplace', function(){
    if (!eleLink) {
        return;
    }
    var href = eleLink.href;
    if (href && /^#|javasc/.test(href) === false) {
        if (history.replaceState) {
            history.replaceState(null, document.title, href.split('#')[0] + '#');
            location.replace('');
        } else {
             location.replace(href);
        }
    }
});
Container('AutoprefixerCssStyle', (function(){
    var style_transition = '-webkit-transition: @{{value}};\
                               -moz-transition: @{{value}};\
                               -mos-transition: @{{value}};\
                                 -o-transition: @{{value}};\
                                    transition: @{{value}};';

    var transition_duration = '-webkit-transition-duration: @{{value}};\
                                  -moz-transition-duration: @{{value}};\
                                  -mos-transition-duration: @{{value}};\
                                    -o-transition-duration: @{{value}};\
                                       transition-duration: @{{value}};';

    var style_transform = '-webkit-transform: @{{value}};\
                              -moz-transform: @{{value}};\
                              -mos-transform: @{{value}};\
                                -o-transform: @{{value}};\
                                   transform: @{{value}};';
    var style = {
        'transition': style_transition,
        'transition-duration': transition_duration,
        'transform': style_transform
    }

    return function(cssName, value){
        return style[cssName].replace(/\s/g, '').replace(/@\{\{value\}\}/g, value);
    }
}()));
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
Container('Swiper', function(elem, opt){
    opt = opt || {};
    var $ = Container('$');
    var _$ = Container('_$');
    var _$s = Container('_$s');
    var Attr = Container('Attr');
    var Event = Container('Event');
    var Hammer = Container('Hammer');
    var creatId =Container('CreatId');
    var ClassList = Container('ClassList');
    var preventDefault = Container('PreventDefault');
    var autoprefixer = Container('AutoprefixerCssStyle');
    var waitResources = Container('WaitResources');

    var Swiper_id = creatId();
    var static_ClassName = {
        swiper_button_disabled: 'swiper-button-disabled',
        auto_width_mode: 'auto_width'
    }
    container = typeof elem === 'string'? _$(elem) : elem;
    if ( !container ) {
        return 'has no the elem';
    }
    nextButton = typeof opt.nextButton === 'string'? _$(opt.nextButton): opt.nextButton;
    prevButton = typeof opt.prevButton === 'string'? _$(opt.prevButton): opt.prevButton;
    var attr = Attr(container)
    var elem_id = attr.get('swiper-id');
    if ( elem_id ) {
        return Container(elem_id).CacheAPI;
    }else{
        attr.set('swiper-id', Swiper_id);
    }
    var Cache = {
        id: Swiper_id,
        container: container,
        wrapper: _$('[swiper-id='+Swiper_id+'] > .swiper-wrapper'),
        slides: _$s('[swiper-id='+Swiper_id+'] > .swiper-wrapper > .swiper-slide'),
        offsetLeftList: [],
        nextButton: nextButton,
        prevButton: prevButton
    }
    
    Cache.wrapperWidth = Cache.wrapper.clientWidth;
    Cache.slidesLength = Cache.slides.length;
    Cache.activeIndex = 0;
    Cache.activeOffsetLeft = 0;
    Cache.activeOffsetLeftMin = 0;
    Cache.activeOffsetLeftMax = getWrapperSlideWidth() - Cache.wrapperWidth;
    Cache.duration = 300;
    Cache.transition_timer = null;
    arguBind(opt);
    wholeWidth(opt.wholeWidth);

    initializate_interface(opt, opt.loop === true ? loop_initializate : initializate);
    
    action(opt);

    var CacheAPI = {
        loop_updateOffsetLeftList: function(){
            if ( !opt.loop ) {
                return 'not loop'
            }
            loop_setOffsetLeftList();

            /** slidesLength */
            var sl = Cache.slidesLength;
            if (sl == 1) {
                Cache.wrapperSlideWidthNum = Cache.slides[0].clientWidth;
            }else{
                Cache.wrapperSlideWidthNum = Cache.offsetLeftList[1] + Cache.offsetLeftList[sl - 1];
            }
            for (var i = 0, len = Cache.slides.length; i < len; i++) {
                /** offsetLeft of swiper-slide    */
                Cache.offsetLeftList[i + sl * 1] = Cache.offsetLeftList[i] + Cache.wrapperSlideWidthNum * 1;
                /** offsetLeft of substitute_next */
                Cache.offsetLeftList[i + sl * 2] = Cache.offsetLeftList[i] + Cache.wrapperSlideWidthNum * 2;
            }
            Cache.activeOffsetLeft = Cache.wrapperSlideWidthNum;
        }
    }
    return CacheAPI;
    function wholeWidth(wholeWidth){
        /** wholeWidth can not use with auto_width */
        if (wholeWidth === true && opt.auto_width !== true) {
            /** only word when wrapperSlideWidth < wrapperWidth */
            var wrapperSlideWidth = getWrapperSlideWidth();
            if (wrapperSlideWidth > Cache.wrapperWidth) {
                return;
            }
            var slideWidth = Math.ceil(Cache.wrapperWidth / Cache.slidesLength);
            for (var i = Cache.slides.length - 1; i >= 0; i--) {
                Cache.slides[i].style.width = slideWidth + 'px';
            }
        }
    }
    function arguBind(opt){
        var auto_width = opt.auto_width || false;
        if (auto_width === true) {
            ClassList.add( Cache.container, static_ClassName.auto_width_mode )
        }

        Cache.duration = opt.duration || Cache.duration
    }
    /** it can known i need use initializate or loop_initializate */
    function initializate_interface(opt, initializateHandler){
        var waitResourcesObj = waitResources(waitResourcesEachComplete);
        if ( opt.auto_width ) {
            waitResourcesObj.setLoadhandler(waitResourcesEachComplete);
        }else{
            initializateHandler(opt)
        }
        waitResourcesObj.push(_$s('img', Cache.wrapper))
        waitResourcesObj.complete()

        function waitResourcesEachComplete(){
            initializateHandler(opt)
        }
    }
    function loop_initializate( opt ){
        loop_setOffsetLeftList()
        
        loop_supplement();
        loop_updateLoad();
    }
    function loop_supplement(){
        if ( !opt.loop ) {
            return 'not loop'
        }
        Cache.has_loop_supplement = true;
        /** slidesLength */
        var sl = Cache.slidesLength;
        if (sl == 1) {
            Cache.wrapperSlideWidthNum = Cache.slides[0].clientWidth;
        }else{
            Cache.wrapperSlideWidthNum = Cache.offsetLeftList[1] + Cache.offsetLeftList[sl - 1];    
        }
        Cache.wrapper.style.display = 'none';
        $(Cache.wrapper).find('.substitute_prev').remove();
        $(Cache.wrapper).find('.substitute_next').remove();
        Cache.substitute_prev_slides = [];
        for (var i = 0, len = Cache.slides.length; i < len; i++) {
            /** insert elem before */
            var slideNode = Cache.slides[i].cloneNode(true);
            ClassList.add(slideNode, 'substitute_prev');
            Cache.wrapper.insertBefore(slideNode, Cache.slides[0]);
            Cache.substitute_prev_slides.push(slideNode);

            /** insert elem after */
            var slideNode = Cache.slides[i].cloneNode(true);
            ClassList.add(slideNode, 'substitute_next');
            Cache.wrapper.appendChild(slideNode);


            /** offsetLeft of swiper-slide    */
            Cache.offsetLeftList[i + sl * 1] = Cache.offsetLeftList[i] + Cache.wrapperSlideWidthNum * 1;
            /** offsetLeft of substitute_next */
            Cache.offsetLeftList[i + sl * 2] = Cache.offsetLeftList[i] + Cache.wrapperSlideWidthNum * 2;
        }
        Cache.wrapper.style.display = '';

        Cache.activeIndex = sl;
        Cache.activeOffsetLeft = Cache.wrapperSlideWidthNum;
        Cache.activeOffsetLeftMin = 0;
        Cache.activeOffsetLeftMax = Infinity;
    }
    function initializate(opt){
        setOffsetLeftList()
        updateLoad()
    }
    function action(opt){
        setBtnClick();
        var parentNodeHasSwipe = false
        var parentNode = Cache.container
        while(parentNode){
            if (parentNode.tagName !== 'HTML') {
                if (ClassList.contains(parentNode, 'hammer-swipe-event')) {
                    parentNodeHasSwipe = true;
                }
                parentNode = parentNode.parentNode;
            }else{
                parentNode = null
            }
        }
        if (!parentNodeHasSwipe) {
            new Hammer( Cache.container, {
              domEvents: true
            } );
        }
        ClassList.add(Cache.container, 'hammer-swipe-event');

        Event.bind(Cache.container, 'swipeleft', function(e){
            go_next();
            return preventDefault(e);
        })
        Event.bind(Cache.container, 'swiperight', function(e){
            go_prev();
            return preventDefault(e);
        })

        Event.bind(Cache.container, 'mouseenter', function(e){
            stopAutoPlay();
            return preventDefault(e);
        })
        Event.bind(Cache.container, 'mouseleave', function(e){
            startAutoPlay();
            return preventDefault(e);
        })

        Container('window_event_ctrl').register('resize').push(function(){
            CacheAPI.loop_updateOffsetLeftList()
            updateLoad_interface()
        })
        setPagination();
        updateWrapper_after();
        autoplay_handler(opt.autoplay)
    }

    function autoplay_handler(autoplay){
        if (typeof autoplay !== 'number' || autoplay <= 0) {
            return 'not has autoplay'
        }
        startAutoPlay(autoplay)
    }
    function startAutoPlay(autoplay){
        autoplay = autoplay || opt.autoplay;
        if (typeof autoplay !== 'number' || autoplay <= 0) {
            return 'not has autoplay'
        }
        Cache.autoplayTimer = setInterval(function(){
            go_next();
        }, autoplay)
    }
    function stopAutoPlay(){
        clearInterval(Cache.autoplayTimer);
    }

    function loop_setOffsetLeftList(){
        // Cache.offsetLeftList = [0];
        // for (var i = 1, len =  Cache.substitute_prev_slides.length; i < len; i++) {
        //     Cache.offsetLeftList.push(Cache.substitute_prev_slides[i].offsetLeft);
        // }

        var offsetLeftList = [0];
        for (var i = 0, len =  Cache.slides.length; i < len; i++) {
            offsetLeftList[i] = Cache.slides[i].offsetLeft - offsetLeftList[0];
        }
        offsetLeftList[0] = 0;
        Cache.offsetLeftList_real = offsetLeftList;
        Cache.offsetLeftList = offsetLeftList;
    }
    function setOffsetLeftList(){
        Cache.offsetLeftList = [0];
        for (var i = 1, len =  Cache.slides.length; i < len; i++) {
            Cache.offsetLeftList.push(Cache.slides[i].offsetLeft);
        }
        Cache.offsetLeftList_real = Cache.offsetLeftList
    }
    function updateLoad_interface(){
        opt.loop === true? loop_updateLoad(): updateLoad();
    }
    function loop_updateLoad(){
        Cache.wrapperWidth = Cache.wrapper.clientWidth;

        setOffsetLeftValue(null, true)

        updateWrapper_after()
        if (Cache.wrapperSlideWidthNum < Cache.wrapperWidth) {
            Cache.state = 'stop';
            ClassList.add(Cache.wrapper, 'slides-lack')
            $(Cache.prevButton).addClass(static_ClassName.swiper_button_disabled)
            Cache.prevButton && setTimeout(function(){ ClassList.add(Cache.prevButton, static_ClassName.swiper_button_disabled) });
            Cache.nextButton && setTimeout(function(){ ClassList.add(Cache.nextButton, static_ClassName.swiper_button_disabled) });
        }else{
            Cache.state = 'run';
            ClassList.remove(Cache.wrapper, 'slides-lack')
            Cache.prevButton && setTimeout(function(){ ClassList.remove(Cache.prevButton, static_ClassName.swiper_button_disabled) });
            Cache.nextButton && setTimeout(function(){ ClassList.remove(Cache.nextButton, static_ClassName.swiper_button_disabled) });
        }
    }
    function updateLoad(){
        Cache.wrapperWidth = Cache.wrapper.clientWidth;
        Cache.activeOffsetLeftMax = getWrapperSlideWidth() - Cache.wrapperWidth;
        
        setOffsetLeftValue(null, true)
        updateWrapper_after()
    }

    function setOffsetLeftValue(offsetLeftValue, direct){
        offsetLeftValue = offsetLeftValue == undefined ? Cache.activeOffsetLeft : offsetLeftValue; 
        Cache.activeOffsetLeft = getOffsetLeftMax( offsetLeftValue );
        Cache.activeOffsetLeft = getOffsetLeftMin( Cache.activeOffsetLeft );
        Cache.wrapper.style = autoprefixer('transition-duration', direct ? 0 :( Cache.duration / 1000 ) + 's') + autoprefixer('transform', 'translate(-'+Cache.activeOffsetLeft+'px)')
    }

    function go_next(){
        if (Cache.state === 'stop') {
            return
        }

        if (Cache.activeOffsetLeft >= Cache.activeOffsetLeftMax) {
            return
        }

        for (var i = 0, len = Cache.offsetLeftList.length; Cache.offsetLeftList[i] <= Cache.activeOffsetLeft && i < len; i++) { }
        Cache.activeIndex = i;
        setOffsetLeftValue( Cache.offsetLeftList[i] );

        typeof opt.onSlideStart === 'function' && opt.onSlideStart(Cache)
        
        Cache.transition_timer = setTimeout(updateWrapper_after, Cache.duration);
    }

    function go_prev(){
        if (Cache.state === 'stop') {
            return
        }
        if (Cache.activeOffsetLeft <= Cache.activeOffsetLeftMin) {
            return
        }

        for (var i = Cache.offsetLeftList.length - 1; Cache.offsetLeftList[i] >= Cache.activeOffsetLeft && i >= 0; i--) { }
        Cache.activeIndex = i;

        setOffsetLeftValue( Cache.offsetLeftList[i] );

        typeof opt.onSlideStart === 'function' && opt.onSlideStart(Cache)

        
        Cache.transition_timer = setTimeout(updateWrapper_after, Cache.duration);
    }

    function getOffsetLeftMax(offsetLeft){
        if (offsetLeft >= Cache.activeOffsetLeftMax) {
            return Cache.activeOffsetLeftMax
        }
        return offsetLeft
    }
    function getOffsetLeftMin(offsetLeft){
        if (offsetLeft <= Cache.activeOffsetLeftMin) {
            return Cache.activeOffsetLeftMin
        }
        return offsetLeft
    }

    function updateWrapper_after(){
        if ( Cache.activeOffsetLeft <= Cache.activeOffsetLeftMin ) {
            Cache.prevButton && ClassList.add(Cache.prevButton, static_ClassName.swiper_button_disabled)
        }else{
            Cache.prevButton && ClassList.remove(Cache.prevButton, static_ClassName.swiper_button_disabled)
        }

        if ( Cache.activeOffsetLeft >= Cache.activeOffsetLeftMax ) {
            Cache.nextButton && ClassList.add(Cache.nextButton, static_ClassName.swiper_button_disabled)
        }else{
            Cache.nextButton && ClassList.remove(Cache.nextButton, static_ClassName.swiper_button_disabled)
        }

        updatePagination();
        loop_resetActive();

        typeof opt.onSlideEnd === 'function' && opt.onSlideEnd(Cache)
    }

    function loop_resetActive(){
        if (opt.loop !== true) {
            return 'is not loop swiper, does not need resetActive'
        }
        var activeIndex = (Cache.activeIndex + Cache.slidesLength) % Cache.slidesLength + Cache.slidesLength;
        Cache.activeIndex = activeIndex;
        setOffsetLeftValue(Cache.offsetLeftList[activeIndex], true)
    }

    function setBtnClick(){
        if (opt.nextButton) {
            Event.bind(Cache.nextButton, 'click', function(e){
                go_next();
                return preventDefault(e);
            })
        }
        
        if (opt.prevButton) {
            Event.bind(Cache.prevButton, 'click', function(e){
                go_prev();

                return preventDefault(e);
            })
        }
        
    }

    function setPagination(){
        if (!opt.pagination) {
            return
        }
        Cache.pagination = _$(opt.pagination);
        ClassList.add(Cache.pagination, 'swiper-pagination-bullets')

        var pagination_li_HTML = '';
        for (var i = 0, len = Cache.slides.length; i < len; i++) {
            if (opt.paginationTemplate_handler) {
                pagination_li_HTML += opt.paginationTemplate_handler(i, 'swiper-pagination-bullet', 'swiper-pagination-index');
            }else{
                pagination_li_HTML += '<span swiper-pagination-index="'+i+'" class="swiper-pagination-bullet"></span>'
            }
        }
        Cache.pagination.innerHTML = pagination_li_HTML;
        Cache.paginationBullets = _$s('.swiper-pagination-bullet', Cache.pagination)

        pagination_click_event();
    }

    function pagination_click_event(){
        var pagination_event_handler = opt.loop === true ? loop_pagination_click_handler: pagination_click_handler
        Event.bind(Cache.paginationBullets, 'click', function(e){

            var index = Attr(this).get('swiper-pagination-index');
            Cache.activeIndex = index - 0;
            pagination_event_handler( Cache.activeIndex );
            
            return preventDefault(e);
        })
    }
    function  pagination_click_handler(index) {
        
        setOffsetLeftValue( Cache.offsetLeftList[index] );
        typeof opt.onSlideStart === 'function' && opt.onSlideStart(Cache)
        Cache.transition_timer = setTimeout(updateWrapper_after, Cache.duration);
    }
    function loop_pagination_click_handler(index) {
        var index = ( index - 0 + Cache.slidesLength ) % Cache.slidesLength + Cache.slidesLength;

        setOffsetLeftValue( Cache.offsetLeftList[index] );
        typeof opt.onSlideStart === 'function' && opt.onSlideStart(Cache)
        Cache.transition_timer = setTimeout(updateWrapper_after, Cache.duration);
    }

    function updatePagination(){
        if (!opt.pagination) {
            return
        }

        Cache.activePaginationBullet && ClassList.remove(Cache.activePaginationBullet, 'swiper-pagination-bullet-active')
        if (Cache.paginationBullets) {
            var activeIndex = ( Cache.activeIndex + Cache.slidesLength ) % Cache.slidesLength
            ClassList.add(Cache.paginationBullets[activeIndex], 'swiper-pagination-bullet-active')
            Cache.activePaginationBullet = Cache.paginationBullets[activeIndex]
        }
    }

    function getWrapperSlideWidth(){
        var div = document.createElement('div')
        div.style.cssText = 'display: inline-block';
        Cache.wrapper.appendChild(div);
        var width = div.offsetLeft;
        Cache.wrapper.removeChild(div)
        return width;
    }
});