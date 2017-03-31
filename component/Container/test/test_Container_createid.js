describe("createid can run", function(){
	it("get createid function", function() {
        Container.inject(function(CreateId){
            expect(typeof CreateId).toBe('function');
        })
    });
    it("create id", function() {
        Container.inject(function(CreateId){
            var id = CreateId()
            expect(typeof id).toBe('string');
        });
    });
    
})