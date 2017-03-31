/**
 * [description]
 * @Author   liyang
 * @mail     ly20479293@gmail.com
 * @DateTime 2017-03-31T11:48:45+0800
 * 
 * @example
 * var id = CreateId()
 */
;Container.set('CreateId', function() {
    var i = 0;
    var base_id = new Date().getTime();
    return function() {
        i++;
        return 'creatid__id__' + base_id + i;
    }
});
