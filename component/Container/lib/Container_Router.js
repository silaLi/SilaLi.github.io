/**
 * [description]
 * @Author   liyang
 * @mail     ly20479293@gmail.com
 * @DateTime 2017-04-10T19:43:03+0800
 *
 * Router
 * * 路由触发
 * * 路由监听
 *
 * todo
 * * 动态路由地址，支持变量和正则表达式
 * 
 */
;Container.set('Router', function(Signal, HashPath, CreateId, HashchangeHandlers) {
	var id = CreateId();
	var Prefix = '#!';

	Signal.publish(id + HashPath.getHash());
	function setHash(path, record){
		record = record === false ? false : true;
		
		var wholeHash = Prefix + path;
		if (record) {
			location.hash = wholeHash
		}else{
			var href = loaction.origin + loaction.pathname + loaction.search + wholeHash
			if (history.replaceState) {
                // 兼容处理，仅仅只是location.replace，会在ios chrame失效
                history.replaceState(null, document.title, href);
                location.replace(href);
            } else {
                location.replace(href);
            }
		}
		HashPath.update();
	}

	var CacheAPI = {
		getHash: HashPath.getHash,
		register: function(path, handler){
			Signal.register(id + path, handler)
		},
		go: function(path, record){
			if (path == CacheAPI.getHash()) {
				return 'Router not change'
			}
			setHash(path, record)
			Signal.publish(id + path);
		}
	}
	return CacheAPI;
});
Container.set('HashPath', function(){
	var __hash__ = null
	var __hash__List = null;

	setHash();

	return {
		getHash: function(){
			return __hash__;
		},
		resolve: resolve,
		update: setHash
	}
	function setHash(hash){
		hash = hash || location.hash;
		__hash__ = ('/' + hash.replace(/^#/, '').replace(/^!\//, '\/'))
					.replace(/\/{2,}/g, '\/')
					;

		__hash__List = path2List(__hash__)
	}

	function resolve(){
		var paths = [].slice.call(arguments)
		var pathList = null;
		if (/^\//.test(paths[0])) {
			pathList = [];
		}else{
			pathList = __hash__List;
		}
		while(paths.length != 0 ){
			var thePath = paths.shift();
			pathList = pathList.concat(path2List(thePath));
			pathList = dealPath(pathList);
		}
		return path2String(pathList);
	}
	function dealPath(pathList){
		for (var i = 0, len = pathList.length; i < len; i++) {
			if (pathList[i] == '.') {
				pathList.splice(i, 1);
			}
			if (pathList[i] == '..') {
				pathList.splice(--i, 2);
				--i;
			}
		}
		return pathList;
	}

	function path2String(pathList){
		return '/' + pathList.join('/')
	}
	function path2List(path){
		return pathDeleteSpace(path.split('\/'))
	}
	function pathDeleteSpace(pathList){
		pathList = pathList || __hash__List;
		for (var i = pathList.length - 1; i >= 0; i--) {
			if ( pathList[i] == '') {
				pathList.splice(i, 1);
			}
		}
		return pathList;
	}
});
Container.set('HashchangeHandlers', function(Event){
	var hasChangeSupport = window.hasOwnProperty('onhashchange');
	return function(handler){
		Event.bind(window, 'hashchange', function(){
			handler();
		})
	}
});

