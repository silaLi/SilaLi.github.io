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
    return function(options) {
        
        var Cache = {};
        Cache.url = options.url;
        Cache.data = options.data || {};
        Cache.succuss = typeof options.succuss === 'function' ? options.succuss : empty;;
        Cache.async = options.async === true ? true : false;
        Cache.type = options.type || 'POST';
        Cache.type = Cache.type.toUpperCase();
        Cache.dataType = options.dataType || '';

        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        if (!xmlhttp) {
            return 'not support ajax';
        }
        Cache.data = AjaxPostData(Cache.data);

        xmlhttp.onreadystatechange = readystatechange

        if (Cache.type === 'POST') {
            xmlhttp.open(Cache.type, Cache.url, Cache.async);
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlhttp.send(Cache.data);
        }

        function empty() {}

        function readystatechange() {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    requesttxt = window.decodeURIComponent(xmlhttp.responseText)
                    if (Cache.dataType === 'JSON') {
                        requesttxt = eval('('+requesttxt+')');
                    }
                    Cache.succuss(requesttxt)
                }
            }
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
