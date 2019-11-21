var $ = {
  ajax: function(options){
    if(!options || typeof options != "object"){
      return;//如果options没有传，或者不是一个对象，直接返回
    }
    var type = options.type === "post" ? "post" : "get";//只要不是post，就按get处理
    var url = options.url;
    if(!url){
      return;
    }
    var async = options.async === false ? false : true;//只要不是false，就按true处理
    var params = this.parse(options.data);
    var dataType = options.dataType;
    var success = options.success;
    var error = options.error;
    //发送请求
    var xhr = new XMLHttpRequest();
    if(type === "get"){
      url += "?" + params;
      params = null;
    }
    xhr.open(type, url, async);
    if(type === "post"){
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    }
    xhr.send(params);
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          var result = null;
          if(dataType === "xml"){
            result = xhr.responseXML;
          }else if(dataType === "json"){
            result = JSON.parse(xhr.responseText);
          }else{
            result = xhr.responseText;
          }
          success && success(result);//如果传了success方法就调用，不传不调用
        }else{
          error && error(xhr.responseText);//如果传了error方法就调用，不传不调用
        }
      }
    };
  },
  parse: function(obj){
    if(!obj || typeof obj != "object"){
      return null;
    }
    var arr = [];
    for(var k in obj){
      arr.push(k + "=" + obj[k]);
    }
    return arr.join("&");
  }
}