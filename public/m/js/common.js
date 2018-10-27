/*
 * @Author: justin_yke 
 * @Date: 2018-10-27 22:06:05 
 * @Last Modified by: justin_yke
 * @Last Modified time: 2018-10-27 23:24:54
 */
// 轮播图自动轮播

//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
});

// 区域滚动
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});