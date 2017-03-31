describe("ClassList test add", function(){
    var testElem = null;
    beforeEach(function(){
        testElem = document.createElement('div');
    })
    afterEach(function(){
        testElem = null
    })
	it("add a className that elem not has other className", function() {
        Container.inject(function(ClassList){
            testElem.className = '';
            var className = testElem.className;
            ClassList.add(testElem, 'name1')
            
            expect(testElem.className).toBe('name1');
        })
    });
    it("add a className that elem has other className", function() {
        Container.inject(function(ClassList){
            testElem.className = 'aaa bbb';
            var className = testElem.className;
            ClassList.add(testElem, 'name1')
            
            expect(testElem.className).toBe(className + ' name1');
        })
    });
    it("add a className that elem contains", function() {
        Container.inject(function(ClassList){
            testElem.className = 'aaa name1 bbb';
            var className = testElem.className;
            ClassList.add(testElem, 'name1')
            
            expect(testElem.className).toBe(className);
        })
    });
})
describe("ClassList test contains", function(){
    var testElem = null;
    beforeEach(function(){
        testElem = document.createElement('div');
    })
    afterEach(function(){
        testElem = null
    })
    it("elem contains false", function() {
        Container.inject(function(ClassList){
            testElem.className = '';
            
            expect(ClassList.contains(testElem, 'name1')).toBe(false);
        })
    });
    it("elem contains true", function() {
        Container.inject(function(ClassList){
            testElem.className = 'aaa name1 bbb';
            
            expect(ClassList.contains(testElem, 'name1')).toBe(true);
        })
    });
})

describe("ClassList test remove", function(){
    var testElem = null;
    beforeEach(function(){
        testElem = document.createElement('div');
    })
    afterEach(function(){
        testElem = null
    })
    it("elem remove a className, elem has not", function() {
        Container.inject(function(ClassList){
            testElem.className = '';
            ClassList.remove(testElem, 'name1');

            expect(ClassList.contains('name1')).toBe(false);
        })
    });
    it("elem remove a className, elem has", function() {
        Container.inject(function(ClassList){
            testElem.className = 'name1';

            expect(ClassList.contains('name1')).toBe(false);
        })
    });
})