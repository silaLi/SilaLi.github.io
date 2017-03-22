/**
 * Container: it should be in header, and it should be first run in all of javascript
 * 设备加速度监听
 * 实现摇一摇
 * @AuthorHTL liyang
 * @mail      ly20479293@gmail.com
 * @DateTime  2017-03-22T10:39:26+0800
 */
Container('RegisterDeciceAcceleration', (function() {
    var nexts = [];
    var equipmentNotStable = true;

    return function(next) {
        setTimeout(function() {
            nexts.push(next);
        }, 100)
        window.addEventListener("devicemotion", handleMotionEvent, false)
    }
    window.unregisterDecice = function() {
        window.removeEventListener("devicemotion", handleMotionEvent, false)
    }

    function handleMotionEvent(event) {

        var x = event.acceleration.x;
        var y = event.acceleration.y;
        var z = event.acceleration.z;

        var gravity_x = event.accelerationIncludingGravity.x;
        var gravity_y = event.accelerationIncludingGravity.y;
        var gravity_z = event.accelerationIncludingGravity.z;

        var alpha = event.rotationRate.alpha;
        var beta = event.rotationRate.beta;
        var gamma = event.rotationRate.gamma;

        if (equipmentNotStable) {
            EquipmentStable(x, y)
            return;
        }
        for (var i = nexts.length - 1; i >= 0; i--) {
            if (typeof nexts[i] == 'function') {
                nexts[i]({
                    a_x: x,
                    a_y: y
                })
            }
        }
        return
        for (var i = nexts.length - 1; i >= 0; i--) {
            typeof nexts[i] == 'function' && nexts[i]({
                a_x: gravity_x,
                a_y: gravity_y
            })
        }
    }

    // 判读这次设备是否稳定
    // 稳定后下次不调用这个判断稳定的方法
    function EquipmentStable(x, y) {
        if (Math.abs(x) < 2 && Math.abs(y) < 5) {
            equipmentNotStable = false;
        }
    }
}()));
