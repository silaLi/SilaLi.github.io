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
	        	succuss: function(txt){
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