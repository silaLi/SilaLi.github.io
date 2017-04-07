describe("get api", function(){
	var data = 22222;
    var key = 'get'

    beforeEach(function(){
    	Container.set(key, data)
    })
    afterEach(function(){
    	Container.del(key, data)	
    })
    it("测试get函数_1", function() {
        expect(Container.get(key)).toBe(data);
    });
})
describe("set api", function() {
    var data = 22222;
    var key = 'set'

    afterEach(function(){
    	Container.del(key, data)
    })
    it("测试set, 直接设置对象保存数据", function() {
    	Container.set(key, data)
        expect(data).toBe(Container.get(key));
    });
    it("测试set, 使用function间接保存数据", function() {
        Container.set(key, function(){
            return data
        })
        expect(data).toBe(Container.get(key));
    });
});
describe("del api", function() {
    var data = 22222;
    var key = 'del_function'
    beforeEach(function(){
    	Container.set(key, data)
    })
    it("测试del后， 没有定义值", function() {
    	Container.del(key)
        expect(Container.get(key)).toBeUndefined();
    });
});
describe("inject, 注入器", function() {
    var data = 22222;
    var inject_run = 0;
   
    afterEach(function(){
        inject_run = false;
        Container.del('inject', data);
    })

    it("inject 注入器运行了, 没有依赖自动执行", function() {
        Container.inject(function(){
            inject_run = true;
        })
        expect(inject_run).toBe(true);
    });
    it("inject 注入器运行了, 先set, 后inject", function() {
        Container.set('inject', data);
        Container.inject(function(inject){
            inject_run = true;
        })
        expect(inject_run).toBe(true);
    });
    it("inject 注入器运行了, 先inject, 后set", function() {
    	Container.inject(function(inject){
	    	inject_run = true;
	    })
    	Container.set('inject', data);
        expect(inject_run).toBe(true);
    });
    it("inject 注入器运行了, 注入多个参数， 提前注入2个服务", function() {
        Container.set('inject', data);
        Container.set('inject_1', 'inject_1');
        Container.inject(function(inject, inject_1){
            inject_run = true;
        })
        expect(inject_run).toBe(true);
    });
    it("inject 注入器运行了, 注入多个参数， 提前注入1个参数", function() {

        Container.set('inject_1', 'inject_1');
        Container.inject(function(inject, inject_1){
            inject_run = true;
        })
        Container.set('inject', data);
        expect(inject_run).toBe(true);
    });
    it("inject 注入器运行了, 注入多个参数(function 参数)， 提前注入1个参数", function() {

        Container.set('inject_1', function(){
            return 'inject_1';
        });
        Container.inject(function(inject, inject_1){
            inject_run = true;
        })
        Container.set('inject', function(){
            return data
        });
        expect(inject_run).toBe(true);
    });
    it("inject 注入器运行了, 注入多个参数， 不提前注入", function() {
        Container.inject(function(inject, inject_1){
            inject_run = true;
        })
        Container.set('inject', data);
        Container.set('inject_1', 'inject_1');
        expect(inject_run).toBe(true);
    });
    it("inject 注入器运行了, 注入多个参数， 两个函数都需要注入", function() {
        Container.inject(function(inject, inject_1){
            inject_run += 1;
        })
        Container.inject(function(inject, inject_1){
            inject_run += 1;
        })
        Container.set('inject', data);
        Container.set('inject_1', 'inject_1');
        expect(inject_run).toBe(2);
    });
});
describe("inject&del", function() {
    var data = 22222;
    var inject_run = false;
    
    beforeEach(function(){
    	Container.set('inject_1', data+'inject_1');
    	Container.inject(function(inject_1, inject_2){
	    	inject_run = true;
	    })
	    Container.del('inject_1')
    })
    afterEach(function(){
    	inject_run = false;
    	Container.del('inject');
    })
    it("inject 注入器运行了, inject&del", function() {
	    Container.set('inject_2', data);
        expect(inject_run).toBe(true);
    });
});