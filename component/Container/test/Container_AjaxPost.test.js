describe("jsonp test", function(){
	var ajaxAccepted = false;
	var data = { liyang: 'god' }
	var called = false;
	beforeEach(function(done){
		Container.inject(function(JSONP) {
	        JSONP({
	        	url: 'http://suzuki-motogp.hupu.com/example/jsonp_datetime',
	        	CallBackName: 'function_name',
	        	data: data
	        }).setSuccess(function(txt){
        		called = true;
        		done();
        	});
	    });
	});
	afterEach(function(){
		ajax_txt = '';
	})

	it("test ajax send post http request", function(done) {
		expect(called).toBeTruthy()
		done();
    });
});
describe("ajax post test", function(){
	var ajaxAccepted = false;
	var data = { liyang: 'god' }
	var ajax_txt = '';
	beforeEach(function(done){
		Container.inject(function(AjaxPost) {
	        AjaxPost({
	        	url: 'http://127.0.0.1:3000/hello',
	        	type: 'post',
	        	data: data,
	        	success: function(txt){
	        		ajax_txt = txt;
	        		done();
	        	}
	        });
	    });
	});
	afterEach(function(){
		ajax_txt = '';
	})

	it("test ajax send post http request", function(done) {
		expect(JSON.stringify(data)).toBe(ajax_txt);
		done()
    });
})
