
var person = {
  name: "haha",
  age: "男"
}

// 每个模块有自己单独的作用域，a模块 的变量在 b模块 里访问不到
// 如果需要被外界访问，需要配置导出项 module.exports
// module.exports 默认是 空对象，需要给 空对象 配置内容

// 方式一：
// 给 空对象 添加属性
// module.exports.person = person; // 添加属性的时候 module. 可以省略

// 方式二：
// 直接给 module.exports 赋值一个 新对象，这时候 module. 不可以省略
module.exports = {
  person: person
}