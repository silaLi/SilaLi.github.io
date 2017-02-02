;
(function(factory) {
    window.analogDataUser = factory(window.localStorage, JSON);
}(function(ls, JSON) {
    var DEFAULT_Name 		   = '李狗蛋';
    var DEFAULT_Prompt_Name	   = '请输入你的姓名\n不输入即为默认';
    var DEFAULT_Js_Name 	   = 'analog-person-info.js';
    var DEFAULT_Info_Prev	   = 'uinfo-';
    var DEFAULT_Direction_Sign = '.';
    var DEFAULT_Direction_Del  = 'delete';

    var userInfo = get();
    
    /**
     * 当数据不存在时，设置默认数据
     */
    if (!userInfo) {
    	var __time = new Date().getTime();
	    var name = prompt(DEFAULT_Prompt_Name, DEFAULT_Name);

	    if (!name || name === '') name = DEFAULT_Name;

	    userInfo = {
	        id: __time,
	        name: name
	    }
    }

    /**
     * 读取标签上的默认数据
     */
    var __el = document.querySelector('script[src$=\'' + DEFAULT_Js_Name + '\']');
    var attributes = __el.attributes;
    for (var i = attributes.length - 1; i >= 0; i--) {
        var attribute = attributes[i];
        if (attribute && attribute.name.indexOf(DEFAULT_Info_Prev) === 0) {
        	var keyDirection = attribute.name.substr(DEFAULT_Info_Prev.length);
        	/**
        	 * 把属性与指令分开，通过分割符分开
        	 */
        	var keyArr = keyDirection.split('.');
        	var key = keyArr[0];
        	userInfo[key] = attribute.value;

        	/**
        	 * 读取这个属性是否存在指令
        	 * 执行指令
        	 */
        	var direction = keyArr[1];
        	switch(direction){
        		case DEFAULT_Direction_Del:
        			del(key, userInfo);break;
        		default:
        		console.log('default');
        	}
        }
    }

    /**
     * 保存至本地
     */
    set(userInfo);

    /**
     * 删除指定键的值从指定键值对中
     * @param  {[type]} key      [指定的键]
     * @param  {[type]} userInfo [被删除的键值对]
     */
    function del(key, userInfo){
    	delete userInfo[key];
    }
    /**
     * 设置信息进入本地，保存
     * @param {[type]} userInfo [description]
     */
    function set(userInfo) {
        ls.setItem('userInfo', JSON.stringify(userInfo));
    }
    /**
     * 获取信息从本地
     * @param  {[type]} key [只获取某个键的值]
     * @return {[type]}     [description]
     */
    function get(key) {
        var userInfo = JSON.parse(ls.getItem('userInfo'));
        if (key)
            return userInfo[key];
        else
            return userInfo;
    }
    return {
        get: get,
        set: set
    }
}));
