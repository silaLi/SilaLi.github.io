/**
 * [browserRedirect description] 判断ua
 * @AuthorHTL liyang
 * @mail      ly20479293@gmail.com
 * @DateTime  2017-03-22T10:34:20+0800
 */
;Container.set('UserAgentCheck', function() {
    return function (phoneCallBack, pcCallBack) {
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
});