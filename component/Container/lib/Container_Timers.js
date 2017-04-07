/** can make hostory not record the link, and instead of the hostory top link */
;Container.set('UrlReplace_#', function(){
    return function(eleLink){
        if (!eleLink) {
            return;
        }
        var href = eleLink.href;
        if (href && /^#|javasc/.test(href) === false) {
            if (history.replaceState) {
                // 兼容处理，仅仅只是location.replace，会在ios chrame失效
                history.replaceState(null, document.title, href);
                location.replace(href);
            } else {
                location.replace(href);
            }
        }
    }
});
Container.set('UrlReplace', function(){
    return function(eleLink){
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
    }
});