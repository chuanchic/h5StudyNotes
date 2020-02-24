// 导入：第一种语法
// import 后面的 变量名 可以任意
// import num from './02.模块export'
// console.log(num)

// 导入：第二种语法
// 形式1：
// import 后面的 变量名 必须是 num str，而且要加 { }
// import { num, str } from './02.模块export'
// 如果非要改变 变量名 可以通过 as 语法
// import { num as num2 , str } from './02.模块export'
// console.log(num, str)
// 形式2：
// 导入所有项，并起个别名
// import * as moduleTest from './02.模块export'
// console.log(moduleTest.num)