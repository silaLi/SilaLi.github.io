/**
 * liyang
 * 2017-03-21 15:33
 * 用于高分辨率的显示屏显示高清图片
 * 规则是当这个图片加载完成后1s，去加载高清图片，加载成功久替换，没有加载成功就不变
 * 为什么是这张图片加载完成后1s，因为这个高清图片不需要及时加载，做完预处理了后，等待页面1s去加载页面其他第一次下载的图片
 * @AuthorHTL liyang
 * @mail      ly20479293@gmail.com
 * @DateTime  2017-03-22T10:43:18+0800
 *
 * @method [name]
 * filter 图片地址过滤器添加高清图片
 */
Container.set('FitDevicePixelRatio', function(Image, Attr){
    var devicePixelRatio = window.devicePixelRatio || 1;
    if (!devicePixelRatio) {
        // return function(){
        //     console.error('has no the attribute');
        // }
    }else{
        if ( devicePixelRatio <=1 ) {
            devicePixelRatio = 1
        }else if( devicePixelRatio <=2 ){
            devicePixelRatio = 2
        }else if( devicePixelRatio <=3 ){
            devicePixelRatio = 3
        }else{
            devicePixelRatio = 3
        }
    }
    if (devicePixelRatio == 1) {
        // return function(){
        //     console.error('there is no need to fit');
        // }
    }
    function getAllRatioImg(){
        return document.querySelectorAll('[data-pixelratio]');
    }
    function imgComplete(img, immediateHandler, handler){
        if(img.complete){
            immediateHandler()
            setTimeout(handler, 1000)
        }else{
            var imgRatio = new Image();
            imgRatio.onload = function(){
                immediateHandler();
                setTimeout(handler, 1000)
            }
            imgRatio.src = img.src; 
        }
    }
    function loadRatioImg(img){
        var imgRatio = new Image();
        var imgAttr = Attr(img);
        if (devicePixelRatio > 1) {
            var suffix = imgAttr.get('data-pixelratio') || '@{[ratio]}';
            imgAttr.set('data-pixelratio', suffix.replace('{[ratio]}', devicePixelRatio));
            var imgRatioSrc = getRatioImgSrc(img.src, suffix);
        }else{
            imgAttr.set('data-pixelratio', '');
            var imgRatioSrc = img.src;
        }
        

        imgRatio.onload = function(){
            img.src = imgRatioSrc;
            complete();
        }
        imgRatio.onerror = function(){
            complete();
        }
        // 当图片加载完成后再访问新图片
        imgComplete(img, function(){
            // 设置宽度需要及时性
            img.width = img.naturalWidth;
        }, function(){
            // 显示大图不需要及时性
            imgRatio.src = imgRatioSrc;
        })
        function complete(){
            imgRatio.onload = null;
            imgRatio.onerror = null;
            imgRatio = null;
        }
    }
    function getRatioImgSrc(src, ratioSuffix){
        if (devicePixelRatio == 1) {
            return src;
        }
        var regSuffix = '.*(@[1-9])$'.replace('@[1-9]', ratioSuffix.replace('{[ratio]}', '[1-9]'))
        var PixelRatioValGet = new RegExp(regSuffix, 'g');

        var hashArr = src.split('?');
        var img_path = hashArr[0]
        var hash = hashArr[1]? ('?' + hashArr[1]) : '';
        
        var PathArr = img_path.split('/');
        var img_fileName = PathArr.pop();
        var path = PathArr.join('/')
        
        var img_nameArr = img_fileName.split('.');
        var img_name = img_nameArr[0];
        var suffix = img_nameArr[1] ? ('.' + img_nameArr[1]) : '';

        var imgRatio_src = img_name
        
        if (PixelRatioValGet.test(imgRatio_src)) {
            imgRatio_src = imgRatio_src.slice(0, -1) + devicePixelRatio;
        }else{
            imgRatio_src = imgRatio_src + ratioSuffix.replace('{[ratio]}', devicePixelRatio);
        }
        return path + '/' + imgRatio_src + suffix + hash;
    }
    var imgs = getAllRatioImg();
    for (var i = 0, len = imgs.length; i < len; i++) {
        loadRatioImg(imgs[i])
    }

    return function (img){
        return {
            filter: function(src){
                var imgAttr = Attr(img);
                var suffix = imgAttr.get('data-pixelratio') || '@{[ratio]}';
                suffix = suffix.replace(/\d/g, '{[ratio]}');
                return getRatioImgSrc(src, suffix);
            }
        }
    };
});

