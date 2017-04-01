Container.set('FullSwiper', function(CreateId, Hammer, _$, _$s, FastRender, Event, ClassList, Attr, PreventDefault) {
    return function(elemSelector, option) {
    	var OPTION_data = option.data || [];
    	var OPTION_curIndex = option.curIndex || 0;
    	var OPTION_slideTemplateSeletor = option.slideTemplate || null;
    	var OPTION_pagination = option.pagination || null;
    	var OPTION_paginationType = option.paginationType || 'fraction';
    	var OPTION_paginationTemplate = option.paginationTemplate || null;
    	var OPTION_loop = option.loop || false;
    	var OPTION_onbeforeRenderSlide = option.onbeforeRenderSlide || function(){};
    	var OPTION_onafterRenderSlide = option.onafterRenderSlide || function(){};
    	var OPTION_pervCtrl = option.pervCtrl;
    	var OPTION_nextCtrl = option.nextCtrl;

    	var Cache = {}
    	Cache.id = CreateId();
    	Cache.data = OPTION_data;
    	Cache.swiper = _$(elemSelector);
    	Cache.wrapper = _$(elemSelector + ' .fullswiper_wrapper');
    	Cache.curIndex = OPTION_curIndex;
    	Cache.slideLength = OPTION_data.length;
    	Cache.loop = OPTION_loop;
    	Cache.slideTemplate = _$(OPTION_slideTemplateSeletor).innerHTML;
    	Cache.onbeforeRenderSlide = OPTION_onbeforeRenderSlide;
    	Cache.onafterRenderSlide = OPTION_onafterRenderSlide;
    	Cache.eventHandler = {
    		nextHandler: nextHandler,
    		prevHandler: prevHandler
    	};
    	Cache.state = '';
    	Cache.pagination = _$(OPTION_pagination);
    	Cache.paginationType = OPTION_paginationType;
    	Cache.paginationHandler = {
    		fraction: paginationFraction
    	}
    	Cache.btnCtrlPrev = _$(OPTION_pervCtrl);
    	Cache.btnCtrlNext = _$(OPTION_nextCtrl);

    	var CacheAPI = {};
    	


    	firstRender();

    	function firstRender(){
    		Attr(Cache.swiper).set('swiper-id', Cache.id);
    		bindEvent();
    		computeAfterAnimation(Cache.curIndex);
    	}
    	function computeAfterAnimation(index){
    		index = index || Cache.curIndex;
    		var threeBrothers = ( Cache.loop ? loop_getTheCurrentThreeBrothers : getTheCurrentThreeBrothers )(index)
    		afterAnimationRender(threeBrothers);
    	}
    	function computeBeforeAnimation(index){
    		index = index || Cache.curIndex;
    		var threeBrothers = ( Cache.loop ? loop_getTheCurrentThreeBrothers : getTheCurrentThreeBrothers )(index)
    		beforeAnimationRender(threeBrothers);
    	}

    	function getTheCurrentThreeBrothers(index){
    		var prevIndex = index - 1;
    		var currIndex = index;
    		var nextIndex = index + 1;
    		return {
    			prevIndex: prevIndex,
    			currIndex: currIndex,
    			nextIndex: nextIndex
    		}
    	}
    	function loop_getTheCurrentThreeBrothers(index){
    		var prevIndex = (index - 1 + Cache.slideLength) % Cache.slideLength;
    		var currIndex = index;
    		var nextIndex = (index + 1 + Cache.slideLength) % Cache.slideLength;
    		return {
    			prevIndex: prevIndex,
    			currIndex: currIndex,
    			nextIndex: nextIndex
    		}
    	}
    	function beforeAnimationRender(threeBrothers){
    		var prevSilde = getPrev();
    		var currSlide = getCurr();
    		var nextSlide = getNext();
    		render(getElemHTML(prevSilde) + getElemHTML(currSlide) + getElemHTML(nextSlide));
    		
    		function getPrev(){
    			var elem = FastRender(Cache.slideTemplate)[0];
    			var index = threeBrothers.prevIndex;
    			ClassList.add(elem, 'prev');
    			ClassList.add(elem, Cache.state);
    			Attr(elem).set('data-index', index)
    			Cache.onbeforeRenderSlide(elem, index);
    			return elem;
    		}
    		function getCurr(){
    			var elem = FastRender(Cache.slideTemplate)[0];
    			var index = threeBrothers.currIndex;
    			ClassList.add(elem, 'curr');
    			ClassList.add(elem, Cache.state);
    			Attr(elem).set('data-index', index)
    			Cache.onbeforeRenderSlide(elem, index);
    			return elem;
    		}
    		function getNext(){
    			var elem = FastRender(Cache.slideTemplate)[0];
    			var index = threeBrothers.nextIndex;
    			ClassList.add(elem, 'next');
    			ClassList.add(elem, Cache.state);
    			Attr(elem).set('data-index', index)
    			Cache.onbeforeRenderSlide(elem, index);
    			return elem;
    		}
    	}
    	function afterAnimationRender(threeBrothers){
    		var prevSilde = getPrev();
    		var currSlide = getCurr();
    		var nextSlide = getNext();
    		render(getElemHTML(prevSilde) + getElemHTML(currSlide) + getElemHTML(nextSlide));
    		
    		function getPrev(){
    			var elem = FastRender(Cache.slideTemplate)[0];
    			var index = threeBrothers.prevIndex;
    			ClassList.add(elem, 'prev');
    			Attr(elem).set('data-index', index)
    			Cache.onbeforeRenderSlide(elem, index);
    			return elem;
    		}
    		function getCurr(){
    			var elem = FastRender(Cache.slideTemplate)[0];
    			var index = threeBrothers.currIndex;
    			ClassList.add(elem, 'curr');
    			Attr(elem).set('data-index', index)
    			Cache.onbeforeRenderSlide(elem, index);
    			return elem;
    		}
    		function getNext(){
    			var elem = FastRender(Cache.slideTemplate)[0];
    			var index = threeBrothers.nextIndex;
    			ClassList.add(elem, 'next');
    			Attr(elem).set('data-index', index)
    			Cache.onbeforeRenderSlide(elem, index);
    			return elem;
    		}
    	}
    	function render(wrapperHTML){
    		Cache.wrapper.innerHTML = wrapperHTML;

    		var fullswiper_silde = _$s('.fullswiper_silde', Cache.wrapper);
    		paginationRender();
    		for (var i = fullswiper_silde.length - 1; i >= 0; i--) {

    			var index = Attr(fullswiper_silde[i]).get('data-index');
    			Cache.onafterRenderSlide(fullswiper_silde[i], index);
    		}
    		
    	}
    	function getElemHTML(elem){
    		var div = document.createElement('div');
    		div.appendChild(elem);
    		return div.innerHTML;
    	}

    	function bindEvent(){
    		var parentNodeHasSwipe = false
	        var parentNode = Cache.swiper;
	        var swiper = Cache.swiper;
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
	            new Hammer( swiper, {
	              domEvents: true
	            } );
	        }
	        ClassList.add(swiper, 'hammer-swipe-event');


	        Event.bind(swiper, 'swiperight', function(e){
	            prevHandler();
	            
	            return PreventDefault(e);
	        })
	        Event.bind(swiper, 'swipeleft', function(e){
	            nextHandler();

	            return PreventDefault(e);
	        })
	        

	        Event.bind(Cache.btnCtrlPrev, 'click', function(e){
	        	prevHandler();
	            
	            return PreventDefault(e);
	        })
	        Event.bind(Cache.btnCtrlNext, 'click', function(e){
	        	nextHandler();

	            return PreventDefault(e);
	        })
    	}

    	function prevHandler(){
    		Cache.state = 'prev_animating'

    		var curIndex = Cache.curIndex - 1;
    		if (Cache.loop) {
    			curIndex = (curIndex + Cache.slideLength) % Cache.slideLength;
    		}
    		Cache.curIndex = curIndex;

    		computeBeforeAnimation(Cache.curIndex);
    	}
    	function nextHandler(){
    		Cache.state = 'next_animating'
    		var curIndex = Cache.curIndex + 1;
    		if (Cache.loop) {
    			curIndex = (curIndex + Cache.slideLength) % Cache.slideLength;
    		}
    		Cache.curIndex = curIndex;

    		computeBeforeAnimation(Cache.curIndex);
    	}

    	function paginationRender(){
    		Cache.paginationHandler[Cache.paginationType] && Cache.paginationHandler[Cache.paginationType]();
    	}

    	function paginationFraction(){
    		Cache.pagination.innerHTML = '<span class="fullswiper_cur">'+(Cache.curIndex + 1)+'</span>\
    										/ <span class="fullswiper_length">'+Cache.slideLength+'</span>'
    	}

    	return CacheAPI;
    }
});
