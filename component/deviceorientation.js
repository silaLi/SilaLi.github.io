/**
 * 手机水平仪监听
 * 实现手机游戏的摇摆操作
 */
function deciceRegister(next) {

    function Orientation(selector) {

    }

    Orientation.prototype.init = function() {
        window.addEventListener('deviceorientation', this.orientationListener, false);
        window.addEventListener('MozOrientation', this.orientationListener, false);
        window.addEventListener('devicemotion', this.orientationListener, false);
    }

    Orientation.prototype.orientationListener = function(evt) {
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

        if (this._lastGamma != gamma || this._lastBeta != beta) {
            // sio.emit('data', [gamma])
            next({
                x: gamma || 0,
                y: beta || 0
            })
            // var style = document.querySelector("#pointer").style;
            // style.left = gamma / 90 * 200 + 200 + "px";
            // style.top = beta / 90 * 100 + 100 + "px";


            this._lastGamma = gamma;
            this._lastBeta = beta;
        }
    };
    (new Orientation()).init();
}
