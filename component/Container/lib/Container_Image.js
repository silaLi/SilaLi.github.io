;Container.set('Image', function(){
	return function(){
		if (window.Image) {
			return window.Image;
		}else{
			return function(){
				return document.createElement('img');
			}
		}
	}
});