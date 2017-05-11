describe("ES5Array", function(){
    var a = [1, 2, 3, 4];
    var b = [];
    it("foreach", function() {
        Container.inject(function(ES5Array){
            var es5a = new ES5Array(a);
            es5a.forEach(function(value){
                b.push(value);
            })
        });
        expect(a.join(',')).toBe(b.join(','));
    });
})
