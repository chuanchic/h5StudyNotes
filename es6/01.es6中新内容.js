
// 推荐阮一峰的中文文档：http://es6.ruanyifeng.com

// 1.声明变量
// 之前：var a = 10
// es6：let a = 10
// 特性1：let不能重复声明变量
// let a = 2
// let a = 3 // 不能重复声明
// 特性2：let声明的变量有 块级作用域
// if(true){
//   var a = 1 // a在外部可以访问
//   let a = 1 // a在外部不能访问
// }
// console.log(a)

// 2.声明常量
// const a = 10
// 同let，不能 重复声明，有 块级作用域
// 不同点，声明的同时必须赋值，不能 重复赋值(修改)

// 3.对象的简写
// let obj = {
//   // 之前：
//   sing: function(){
//     console.log("sing")
//   }
//   // es6：
//   sing(){
//     console.log("sing")
//   }
// }

// 4.对象的解构赋值
// let obj = {
//   name: "chuanchic",
//   age: 30
// }
// let{对象的属性名: 要声明的变量名} = 对象
// 场景一
// let{name: name, age: age} = obj // 完整写法
// let{name, age} = obj //简写(对象属性名和声明的变量名一致)
// 场景二
// test(obj)
// function test({name, age}){
//   console.log(name, age)
// }

// 5.数组的解构赋值
// let arr = [1, 2, 3];
// let[num1, num2, num3] = arr;//声明三个
// let[num1] = arr;//声明第一个
// let[, , num3] = arr;//声明第三个
// let arr2 = [[1, 2], [3, 4]];
// let[[num1, num2], [num3, num4]] = arr2;

// 6.数组的解构赋值中的RestElement
// ... 叫剩余元素，必须放在最后声明
// let arr3 = [1, 2, 3, 4, 5];
// let [num1, ...num2] = arr3;// num2 就是数组，存储 2 3 4 5

// 7.箭头函数
// let func1 = function(){//之前写法
// }
// let func2 = () => {//标准写法
// }
// let func3 = a => {//只有一个参数，() 可以省略
// }
// let func4 = a => console.log(a);//只有一句代码，{} 可以省略
// let func5 = (a, b) => a + b;//只有一句代码，return xxx，{} return 都可以省略

// 8.箭头函数中没有this
// 函数调用：函数名()           指向 window
// 方法调用：对象.方法名()       指向 调用方法的对象
// 构造函数调用：new 函数名()    指向 创建出来的实例
// 上下文调用：函数名.call()     指向 call()和apply()的第一个参数
// 如果在箭头函数中使用this，会向上层找this，最终都没有就是window
// 因此通过 var that = this 的场景可以通过 箭头函数 来解决

// 9.箭头函数中没有arguments
// arguments是一个伪数组，在函数被调用时存储所有的实参
// arguments使用场景：在方法的参数个数不确定的时候，方法就不用声明实参，通过arguments来获取参数
// 箭头函数中通过 RestElement(剩余参数) 来替代 arguments，它是一个真数组

// 10.函数参数的默认值
// function func6(a = 0, b = 0){
//   return a + b;
// }

// 11.如何以变量的值作为属性名
// var key = "name";
// var obj = {
//   [key]: "哈哈" // es6做法，[key] 是把变量 key 的值当做 obj 的属性
// }
// obj[key] = "哈哈" // 之前做法

// 12.对象的 ... 运算符
// var parent = {
//   name: "哈哈",
//   age: 18,
//   sing(){
//     console.log("haha")
//   }
// }
// var child = {
//   ...parent, // 扩展运算符
//   sex: 0
// }

// 13.数组中的 ... 运算符
// function sum(a, b, c){
//   return a + b + c
// }
// var arr = [1, 2, 3]
// sum(arr[0], arr[1], arr[2]) // 之前写法
// sum.apply(null, arr) // 之前写法
// sum(...arr) // es6写法

// 14.class关键字
// function Person(name, age){// 之前写法
//   this.name = name;
//   this.age = age;
// }
// Person.prototype.sing = function(){// 实例方法，会加到原型上
// }
// Person.friend = "Dog"// 静态变量
// Person.sing2 = function(){// 静态方法
// }
// class Person2{// es6写法
//   constructor(name, age){// 构造函数
//     this.name = name;
//     this.age = age;
//   }
//   sing(){// 实例方法，会加到原型上
//   }
//   static sing2(){// 静态方法，会加到构造函数上
//   }
// }
// var p = new Person();
// var p2 = new Person2();

// 15.继承
// class Person{
//   constructor(name, age){
//     this.name = name;
//     this.age = age;
//   }
//   sing(){
//   }
// }
// class Student extends Person{
//   constructor(name, age, sex){
//     super(name, age);
//     this.sex = sex;
//   }
//   sing2(){
//   }
// }

// 16.借用构造函数继承(这也是 super() 的原理)
// function Person2(){
//   this.name = "name";
//   this.age = 0;
// }
// function Student2(){
//   Person2.call(this);
// }

// 17.模板字符串 反引号 ``
// 特点：1.可以换行
//      2.可以嵌入变量
// var name = "川驰"
// var str = `${name}，你
// 好吗？`

// 18.Promise 用来解决回调地狱问题的，通过 .then() 来传递回调函数
// .then() 里第一个参数是成功的回调，第二个参数是失败的回调
// Promise对象有三种状态：
// 1.pending：    挂起 正在执行
// 2.fullfilled： 成功 已经执行完毕并且结果是成功的
// 3.rejected：   失败 已经执行完毕并且结果是失败的
// 一般使用别人写好的 Promise API，如何自己封装 Promise ?

// 19.使用Promise封装timeout
// function timeout(time){
//   return new Promise(function(resolve, reject){
//     setTimeout(() => {
//       // 这里写具体的异步操作
//       // 当异步操作执行完成，通过修改Promise状态，就能自动调用 .then() 方法
//       // resolve(123);// 修改Promise状态为成功
//       reject("失败"); // 修改Promise状态为失败
//     }, time);
//   })
// }
// timeout(1000).then(function(data){//成功回调
//   console.log(data)
//   return timeout(1000)
// }, function(err){//失败回调
//   console.log(err)
//   return timeout(1000)
// }).then(function(data){
//   // .then() 连写的话，需要上一个 .then() 的回调函数里返回一个新的Promise对象
//   // 即通过 return timeout(1000) 返回一个新的Promise对象
//   console.log(data)
// })

// 20.使用Promise封装ajax
// function ajax(option){
//   return new Promise((resolve, reject) =>{
//     let xhr = new XMLHttpRequest()
//     xhr.open(option.type, option.url)
//     xhr.send(null)
//     xhr.onreadystatechange = function(){
//       if(xhr.readyState == 4){
//         if(xhr.status == 200){
//           resolve(xhr.responseText)
//         }else{
//           reject("失败");
//         } 
//       }
//     }
//   })
// }
// ajax({
//   type: "get",
//   url: "xxx..."
// }).then(function(data){
//   console.log(data)
// }, function(err){
//   console.log(err)
// })

// 21.Promise对象的catch() 很少使用
// 回调失败有两种方式：1.通过 .then() 的第二个参数，2.通过 .catch()
// function timeout(time){
//   return new Promise(function(resolve, reject){
//     setTimeout(() => {
//       reject("失败");
//     }, time);
//   })
// }
// timeout(1000).then(function(){
// }).catch(function(){
// })

// 22.Promise对象的静态方法 all()、race()
// 所有Promise异步操作执行完成之后的回调，可以通过 all()
// 第一个Promise异步操作执行完成之后的回调，可以通过 race()
// function timeout(time){
//   return new Promise(function(resolve, reject){
//     setTimeout(() => {
//       resolve("成功");
//     }, time);
//   })
// }
// var arr = [timeout(1000), timeout(1500), timeout(2000)]
// Promise.all(arr).then(function(data){
//   // 这儿的data是个数组，存储了每个Promise异步操作返回的内容
// })
// Promise.race(arr).then(function(data){
// })

// 23.async await 关键字(基于 Promise)
// function fn() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('hahaha')
//     }, 2000);
//   })
// }
// async 用来修饰 函数
// await 只能用在 async 修饰的函数中
// await 后面跟一个 Promise 对象
// await 会等待 Promise 封装的异步操作执行完，再去执行后面的代码
// result 就是 Promise 中 resolve 函数的 参数
// async function fn2() {
//   const result = await fn()
//   console.log(result)
// }
