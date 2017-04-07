/**
 * [description]
 * @Author   liyang
 * @mail     ly20479293@gmail.com
 * @DateTime 2017-03-31T11:48:45+0800
 * 
 * @requires [AjaxPostData]
 * @example
 * Container.inject(function(AjaxPost) {
        AjaxPost({
            url: 'http://127.0.0.1:3000/hello',
            type: 'post',
            data: data,
            succuss: function(txt){
                ajax_txt = txt;
                done();
            }
        });
    });
 */
;Container.set('AjaxPost', function(AjaxPostData) {
    var AjaxCache = [];
    AjaxCache.get = get;
    AjaxCache.set = set;
    function set(url, data){
        return {
            url: url,
            data: data
        }
    }
    function get(url){
        for (var i = AjaxCache.length - 1; i >= 0; i--) {
            if (AjaxCache[i].url === url) {
                return AjaxCache[i].data;
            }
        }
    }
    return function(options) {
        
        var Cache = {};
        Cache.url = options.url;
        Cache.data = options.data || {};
        Cache.async = options.async === false ? false : true;
        Cache.type = options.type || 'POST';
        Cache.type = Cache.type.toUpperCase();
        Cache.dataType = options.dataType || '';
        Cache.dataType = Cache.dataType.toUpperCase();

        Cache.success = typeof options.success === 'function' ? options.success : empty;
        Cache.error = typeof options.error === 'function' ? options.error : empty;
        Cache.complete = typeof options.complete === 'function' ? options.complete : empty;

        Constructor();

        var CacheAPI = {};
        CacheAPI.setSuccess = setSuccess;
        CacheAPI.setError = setError;
        CacheAPI.setComplete = setComplete;

        return CacheAPI;
        function AJAX_Success(JSONP_Data){
            Cache.success(JSONP_Data);
            Cache.complete();
        }
        function AJAX_Error(){
            Cache.error();
            Cache.complete();
        }
        function AJAX_Complete(){
            _$('body').removeChild(script);
            window[Cache.data[Cache.CallBackName]] = null;
        }
        function setSuccess(success){
            Cache.success = success;
            return CacheAPI;
        }
        function setError(error){
            Cache.error = error;
            return CacheAPI;
        }
        function setComplete(complete){
            Cache.complete = complete;
            return CacheAPI;
        }

        function Constructor(){
            if (window.XMLHttpRequest) {
                Cache.xmlhttp = new window.XMLHttpRequest();
            } else {
                Cache.xmlhttp = new ActiveXObject("Microsoft.Cache.XMLHTTP");
            }
            if (!Cache.xmlhttp) {
                return 'not support ajax';
            }
            Cache.data = AjaxPostData(Cache.data);

            Cache.xmlhttp.onreadystatechange = readystatechange

            if (Cache.type === 'POST') {
                Cache.reqURL = Cache.url;
                Cache.reqData = Cache.data;   
            } else if (Cache.type === 'GET') {
                Cache.reqURL = Cache.url + '?' + Cache.data;
                Cache.reqData = undefined;
            }
            Cache.xmlhttp.open(Cache.type, Cache.reqURL, Cache.async);
            Cache.xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            Cache.xmlhttp.send(Cache.reqData);
        }

        function empty() {}

        function readystatechange() {
            if (Cache.xmlhttp.readyState == 4) {
                if (Cache.xmlhttp.status == 200) {
                    Cache.res = window.decodeURIComponent(Cache.xmlhttp.responseText);

                    // get 请求缓冲
                    // close
                    // if (Cache.type === 'GET') {
                    //     AjaxCache.set(Cache.reqURL, Cache.res);
                    // }
                    // 
                    if (Cache.dataType === 'JSON') {
                        Cache.res = eval('('+Cache.res+')');
                    }

                    AJAX_Success(Cache.res)
                }else if (Cache.xmlhttp.status == 304) {
                    Cache.res = window.decodeURIComponent(Cache.xmlhttp.responseText);

                    // 获取get请求缓冲
                    // close
                    // Cache.res = AjaxCache.get(Cache.reqURL)
                    // 
                    if (Cache.dataType === 'JSON') {
                        Cache.res = eval('('+Cache.res+')');
                    }
                    AJAX_Success(Cache.res)
                }else{
                    AJAX_Error();
                }
            }
        }
    }
});

Container.set('JSONP', function(_$, AjaxPostData, CreateId, DomReadyComplete){

    return function(option){
        var Cache = {};
        Cache.id = CreateId();

        Cache.success = function(){};
        Cache.error = function(){};
        Cache.complete = function(){};

        Cache.url = option.url;
        Cache.CallBackName = option.CallBackName || 'jsonp';
        Cache.data = option.data || {};

        function Constructor(){
            Cache.data[Cache.CallBackName] = 'jsonp_'+Cache.id;
            var data = AjaxPostData(Cache.data);

            window[Cache.data[Cache.CallBackName]] = JSONP_Success;

            var script = document.createElement('script');
                script.setAttribute("type","text/javascript");
                script.src = Cache.url + '?' + data;
                script.onerror = JSONP_Error;
            Cache.script = script;

            _$('body').appendChild(script);
        }
        Constructor();
        
        var CacheAPI = {};
        CacheAPI.setSuccess = setSuccess;
        CacheAPI.setError = setError;
        CacheAPI.setComplete = setComplete;

        return CacheAPI;
        function JSONP_Success(JSONP_Data){
            Cache.success(JSONP_Data);
            Cache.complete();
        }
        function JSONP_Error(){
            Cache.error();
            Cache.complete();
        }
        function JSONP_Complete(){
            _$('body').removeChild(script);
            window[Cache.data[Cache.CallBackName]] = null;
        }
        function setSuccess(success){
            Cache.success = success;
            return CacheAPI;
        }
        function setError(error){
            Cache.error = error;
            return CacheAPI;
        }
        function setComplete(complete){
            Cache.complete = complete;
            return CacheAPI;
        }
    }
});
/**
 * [description]
 * @Author   liyang
 * @mail     ly20479293@gmail.com
 * @DateTime 2017-03-31T11:48:45+0800
 * 
 * @example
 * AjaxPostData({liyang: 'god'})
 */
;Container.set('AjaxPostData', function() {
    return function(data) {
        var dataArr = [];
        for (var key in data) {
            dataArr.push(key + '=' + data[key]);
        }
        return dataArr.join('&');
    }
});
