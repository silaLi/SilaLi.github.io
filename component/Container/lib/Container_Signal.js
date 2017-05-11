/**
 * [description]
 * @Author   liyang
 * @mail     ly20479293@gmail.com
 * @DateTime 2017-04-10T11:50:57+0800
 * 
 * 信号管理器
 * * 发布信号
 * * 监听信号 (接收信号)
 *
 * 
 * 仅服务于路由组件
 * only Services for Router
 *
 * suggestion
 * Signal 太灵活了，可以在任何地方使用，因此容易会被滥用，以至于代码变得更加难以维护
 * 所以建议少用
 *
 * todo
 * 建立一个使用规则，使维护人员可以有规律可
 */
;Container.set('Signal', function() {

	var Cache = {};

	function publish(signalName){
		var signalObject = getSignalObject(signalName);
		if (signalObject.hasHandlerNeedRun()) {
			signalObject.executeHandlers();
		}else{
			signalObject.saveTemporary();
		}
	}
	function register(signalName, handler){
		var signalObject = getSignalObject(signalName);
		signalObject.pushHandler(handler);
		signalObject.executeTemporarySignal();
	}
	function getSignalObject(name){
		var signalObject = Cache[name];
		if (!signalObject) {
			signalObject = createSignalObject(name)
			Cache[name] = signalObject
		}
		return signalObject;
	}
	function createSignalObject(name){
		return {
			name: name,
			handlers: [],
			temporarySignal: 0,
			pushHandler: function(handler){
				this.handlers.push(handler);
			},
			hasHandlerNeedRun: function(){
				var handlers = this.handlers;
				if (handlers.length > 0) {
					return true;
				}else{
					return false;
				}
			},
			executeHandlers: function(){
				var handlers = this.handlers;
				for (var i = 0, len = handlers.length; i < len; i++) {
					typeof handlers[i] === 'function' && handlers[i]();
				}
			},
			saveTemporary: function(){
				this.temporarySignal++;
			},
			executeTemporarySignal: function(){
				if (this.temporarySignal > 0) {
					this.temporarySignal--;
					this.executeHandlers();
				}
			}
		}
	}
	return {
		publish: publish,
		register: register
	}
});