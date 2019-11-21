//在jQuery原型上声明 瀑布流方法
$.fn.waterFall = function(){
  // var $box = $('.box');
  var $box = this;//box调用，所以this指向box
  var $items = $box.children();
  var boxWidth = $box.width();
  var itemWidth = $items.width();
  var columns = 5;
  var space = (boxWidth - itemWidth * columns)/(columns - 1);
  var arr = [0,0,0,0,0];
  //遍历子盒子，设置left、top
  $items.each(function(index, element){
    if(index < columns){//第一行
      $(this).css({
        left: index * (itemWidth + space),
        top: 0
      })
      arr[index] = $(this).height();
    }else{//其他行
      var min = arr[0];
      var minIndex = 0;
      for(var i = 1; i < arr.length; i++){
        if(arr[i] < min){
          min = arr[i];
          minIndex = i;
        }
      }
      $(this).css({
        left: minIndex * (itemWidth + space),
        top: min + space
      })
      arr[minIndex] = min + space + $(this).height();
    }
  });
  var maxHeight = Math.max.apply(null, arr);
  $box.height(maxHeight);
}