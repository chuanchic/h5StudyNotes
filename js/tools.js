var Tool = {
  
  //获取随机数的方法
  getRandom : function(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}