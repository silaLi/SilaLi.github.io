/**
 * 设置当前跟目录
 * 相对地址转换为绝对地址
 */
Container.set('Path', function(){
	var a = document.createElement('a');
	var a_pathname = document.createElement('a');
	var __dirname__list = null;
	var __dirname = null;
	
	setDirName(location.pathname);
	
	function dir2List(path){
		var pathList = path.split('/');

		pathList.shift();
		pathList.pop();

		return pathList;
	}
	function dirList2String(pathList){
		return '/' + pathList.join('/') + '/'
	}
	function setDirName(path){
		a.href = path;
		path = a.pathname;
		
		__dirname__list = dir2List(path);
		__dirname = dirList2String(__dirname__list);
	}
	return {
		update: setDirName,
		getPath: function(){
			return __dirname;
		},
		resolve: function(url){
			a_pathname.href = __dirname + url;
			return a.origin + a_pathname.pathname + a_pathname.search;
		}
	}
});
