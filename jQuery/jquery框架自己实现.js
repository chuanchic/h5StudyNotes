(function(window, undefined){
  //声明当前版本
  var version = "1.0";

  //声明空数组，把数组里常用的方法拿过来
  //好处：访问更快，并且有利于代码压缩
  var emptyArr = [];
  var push = emptyArr.push;


  //jQuery普通方法
  var jQuery = function(selector){
    //调用init构造函数，返回jQuery对象
    return new jQuery.fn.init(selector);
  }

  //给jQuery的原型上添加方法，例如：html,css,attr,width,innerWidth
  //方式一：普通方式
  // jQuery.prototype.html = function(){
  //   //...
  // }
  // jQuery.prototype.css = function(){
  //   //...
  // }
  //方式二：原型替换，同时添加别名：fn
  jQuery.fn = jQuery.prototype = {
    constructor: jQuery,//添加constructor属性，指向构造函数
    jquery: version,//添加jquery变量，表示当前版本
    html: function(){
      console.log("这是html方法");
    },
    css: function(){
      console.log("这是css方法");
    },
    extend: function(o){//给原型对象添加extend方法，用于拓展方法
      for(var k in o){
        this[k] = o[k];
      }
    }
  }

  //封装去掉new操作，是需要声明构造函数init，让jQuery作为普通函数
  jQuery.fn.init = function(selector){
    //获取元素，并添加到this上
    var elements = document.querySelectorAll(selector);
    //方式一：普通方式
    // for(var i = 0; i < elements.length; i++){
    //   this[i] = elements[i];
    // }
    // this.length = elements.length;
    //方式二：借用数组的push方法
    //[].push.apply(this, elements);//或者
    push.apply(this, elements);//jQuery已经声明了push方法，等同于数组的push方法
  }

  //修改init的prototype为jQuery的prototype
  //这样jQuery原型上添加的方法，才能被jQuery对象访问到，因为jQuery对象是init方法创建的
  jQuery.fn.init.prototype = jQuery.fn;

  //调用extend方法来扩展方法
  jQuery.fn.extend({
    attr: function(){
    console.log("这是attr方法");
    },
    width: function(){
      console.log("这是width方法");
    }
  });
  
  window.jQuery = window.$ = jQuery;

 })(window);