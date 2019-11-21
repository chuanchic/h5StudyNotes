//制作自己的jQuery插件
//jQuery的原型4种写法：jQuery.prototype、jQuery.fn、$.prototype、$.fn

//添加设置背景颜色的方法
$.fn.bgc = function(color){
  this.css("backgroundColor", color);
  return this;//为了链式编程，最好返回调用者：jQuery对象
}