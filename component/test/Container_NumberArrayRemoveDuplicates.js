/**
 * make array remove duplicats, only number array
 * @AuthorHTL liyang
 * @mail      ly20479293@gmail.com
 * @DateTime  2017-03-23T13:00:47+0800
 */
Container('NumberArrayRemoveDuplicates', function(duplicatsArr){
	var hash = duplicatsArr[i];
	var result = [duplicatsArr[i]];
    for (var i = 1, len = duplicatsArr.length; i < len; i++) {
        
        var _hash = duplicatsArr[i] ^ hash

        console.log(duplicatsArr[i], _hash ^ hash);
        hash = _hash
    }
});
Container('NumberArrayRemoveDuplicates_test', function(){
	var duplicatsArr = [2, 3, 4, 5]
	var hash = 4;
	var diffHash = 0;
    for (var i = 0, len = duplicatsArr.length; i < len; i++) {
        
        var _hash = duplicatsArr[i] ^ hash
        var _diffHash = duplicatsArr[i] ^ diffHash

        if (_hash == diffHash && _diffHash == hash) {
        	
        }
        hash = _hash
        diffHash = _diffHash
        // console.log(duplicatsArr[i] , hash, diffHash)
    }
});