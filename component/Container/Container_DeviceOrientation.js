/**
 * 手机水平仪监听
 * 实现手机游戏的摇摆操作
 */
Container('RegisterDeciceBalancer', (function(){
    var CreateId = Container('CreateId');
    var nextAry = [];
    var Cache = {
        _lastGamma: undefined
    }
    setTimeout(registerDecice, 100)

    function registerDecice(){
        window.addEventListener('deviceorientation', orientationListener, false);
        window.addEventListener('MozOrientation', orientationListener, false);
        window.addEventListener('devicemotion', orientationListener, false);    
    }
    function orientationListener(evt){
        nextRun(evt)
    }
    function orientationFiter(evt, next){
        if (isNaN(evt.gamma)) {
            return 'gamma is right value'
        }
        // For FF3.6+
        if (!evt.gamma && !evt.beta) {
            // angle=radian*180.0/PI 在firefox中x和y是弧度值,
            evt.gamma = (evt.x * (180 / Math.PI)); //转换成角度值,
            evt.beta = (evt.y * (180 / Math.PI)); //转换成角度值
            evt.alpha = (evt.z * (180 / Math.PI)); //转换成角度值
        }
        /* beta:  -180..180 (rotation around x axis) */
        /* gamma:  -90..90  (rotation around y axis) */
        /* alpha:    0..360 (rotation around z axis) (-180..180) */

        var gamma = evt.gamma
        var beta = evt.beta
        var alpha = evt.alpha

        if (evt.accelerationIncludingGravity) {
            // window.removeEventListener('deviceorientation', this.orientationListener, false);
            gamma = event.accelerationIncludingGravity.x * 10
            beta = -event.accelerationIncludingGravity.y * 10
            alpha = event.accelerationIncludingGravity.z * 10
        }

        if (Cache._lastGamma != gamma || Cache._lastBeta != beta) {
            next({
                x: gamma || 0,
                y: beta || 0
            })

            Cache._lastGamma = gamma;
            Cache._lastBeta = beta;
        }
    }
    function nextRun(evt){
        for (var i = 0, len = nextAry.length; i < len; i++) {
            var handlerObj = Container(nextAry[i]);
            handlerObj.handler && orientationFiter(evt, handlerObj.handler);
        }
    }
    return function(next){
        var handlerObj = {
            id: CreateId(),
            handler: next
        }
        nextAry.push(handlerObj.id);
    }
}()));
