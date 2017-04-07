describe("AutoprefixerCssStyle", function(){
	it("AutoprefixerCssStyle test prevfix", function() {
		Container.inject(function(AutoprefixerCssStyle) {
	        expect(AutoprefixerCssStyle('transition', 'width 1s')).toBe('-webkit-transition:width 1s;-moz-transition:width 1s;-mos-transition:width 1s;-o-transition:width 1s;transition:width 1s;');
	    });
    });
})