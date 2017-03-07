function pc(){
        browserRedirect(function(){ $('.red-envelopes-float').addClass('phone'); })
        function browserRedirect(phoneCallBack, pcCallBack) {
            var sUserAgent = navigator.userAgent.toLowerCase();
            var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
            var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
            var bIsMidp = sUserAgent.match(/midp/i) == "midp";
            var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
            var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
            var bIsAndroid = sUserAgent.match(/android/i) == "android";
            var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
            var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
            if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
                typeof phoneCallBack === 'function' && phoneCallBack()
            } else {
                typeof pcCallBack === 'function' && pcCallBack()
            }
        }
    }/**
 * Container: it should be in header, and it should be first run in all of javascript
 * @param  {Object} ){var objs_Container [description]
 * @return {[type]}        [description]
 */
var Container=(function(){var objs_Container={};function get(name){return objs_Container[name]}function set(name,obj,forcibly){var forcibly=forcibly===true?true:false;if(forcibly||get(name)===undefined){objs_Container[name]=obj}else{throw name+" already exists! you can't cover "+name+" name: "+get(name)}}return function(name,obj,forcibly){if(obj===undefined){return get(name)}else{set(name,obj,forcibly)}}})();

/**
 * 判断 ua
 */
Container('userAgentCheck', function browserRedirect(phoneCallBack, pcCallBack) {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        typeof phoneCallBack === 'function' && phoneCallBack()
    } else {
        typeof pcCallBack === 'function' && pcCallBack()
    }
});
