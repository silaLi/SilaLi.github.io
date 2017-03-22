/**
 * liyang
 * 2017-03-21 15:33
 * 用于高分辨率的显示屏显示高清图片
 * 规则是当这个图片加载完成后1s，去加载高清图片，加载成功久替换，没有加载成功就不变
 * 为什么是这张图片加载完成后1s，因为这个高清图片不需要及时加载，做完预处理了后，等待页面1s去加载页面其他第一次下载的图片
 * @AuthorHTL liyang
 * @mail      ly20479293@gmail.com
 * @DateTime  2017-03-22T10:43:18+0800
 */
Container('Image', (function(){
	if (window.Image) {
		return window.Image;
	}else{
		return function(){
			return document.createElement('img');
		}
	}
}()));