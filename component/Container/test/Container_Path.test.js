describe("Path", function(){
	var __dir = 'http://baidu.com/li/yang'
	it("Path resolve (mean relative)", function() {
		Container.inject(function(Path) {
			Path.update(__dir);
			var a = Path.resolve('../../hu/pu')
			console.log(Path.resolve('../../hu1/pu1'))
			expect(a).toBe('http://baidu.com/hu/pu');
		})
	});
});