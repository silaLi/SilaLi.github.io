/**
 * [description]
 * @Author   liyang
 * @mail     ly20479293@gmail.com
 * @DateTime 2017-04-01T12:02:08+0800
 */
// make sure array object can use ES5 array API
// when ES5 array API is not exist, use array API will use these function
;Container.set('ES5Array', function() {
    return ES5Array;

    function ES5Array(array){
        if (!(array instanceof Array)) {
            throw 'not is array';
        }
        this.value = array;

        this.forEach = forEach;
    }

    function forEach(fn, context) {
        var array = this.value;
        
        for (var k = 0, len = array.length; k < len; k++) {
            if (typeof fn === "function" && Object.prototype.hasOwnProperty.call(array, k)) {
                fn.call(context, array[k], k, array);
            }
        }
    };
})
