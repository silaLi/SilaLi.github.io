;Container.set('Image', function(){
    return function(){
        if (window.Image) {
            return new window.Image();
        }else{
            return function(){
                return document.createElement('img');
            }
        }
    }
});