const vm = new Vue({
	el: "#app",
	data: {
		// 任务名称，双向数据绑定用
		todoName: '',
		// 标记被编辑的任务项
		editId: -1,
		// 任务列表
		todos: []
	},
	// 挂载页面，渲染完成之后
	mounted() {
		// 获取任务列表
		this.getTodos()
	},
	methods: {
		// 获取任务列表
		getTodos() {
			axios.get('http://localhost:3000/todos')
				.then(res => {
					this.todos = res.data
				})
		},
		// 添加任务
		add() {
			if (this.todoName.trim() === '') {
				return
			}
			// axios 会自动添加 id，不需要手动添加
			// let id
			// if (this.todos.length === 0) {
			// 	id = 1
			// } else {
			// 	id = this.todos[this.todos.length - 1].id + 1
			// }
			// this.todos.push({
			// 	id: id,
			// 	name: this.todoName,
			// 	completed: false
			// })
			// 发送添加请求
			axios.post('http://localhost:3000/todos', {
				name: this.todoName,
				completed: false
			}).then(res => {
				// 添加成功，更新任务列表
				// this.todos.push(res.data)
				// ...扩展运算符，将data里的字段依次取出来，给新建的对象{}
				this.todos.push({ ...res.data })
				this.todoName = ''
			})
		},
		// 删除任务
		delTodo(index, id) {
			// 注意模板字符串的 `` 不能写成 ''
			axios.delete(`http://localhost:3000/todos/${id}`)
				.then(res => {
					// 删除成功，更新任务列表
					this.todos.splice(index, 1)
				})
		},
		// 双击 显示编辑状态
		showEditStatus(id) {
			this.editId = id
		},
		// 回车键 隐藏编辑状态，并修改任务
		updateTodo(id) {
			const name = this.todos.find(item => item.id === id).name
			// 注意模板字符串的 `` 不能写成 ''
			axios.patch(`http://localhost:3000/todos/${id}`, {
				name: name
			}).then(res => {
				console.log(res)
				this.editId = -1
			})
		},
		// 删除 所有已完成的项
		delAllCompleted() {
			this.todos = this.todos.filter(item => !item.completed)
		}
	},
	computed: {
		// 是否显示尾部
		showFooter() {
			return this.todos.length > 0
		},
		// 未完成任务数
		unCompletedCount() {
			// 方式一
			// var count = 0
			// for (var i = 0; i < this.todos.length; i++) {
			// 	if (!this.todos[i].completed) {
			// 		count++
			// 	}
			// }
			// return count
			// 方式二
			return this.todos.filter(item => !item.completed).length
		},
		// 是否显示 清除已完成任务 按钮
		showClearCompleted() {
			// 只要有 已完成的任务 就显示
			// some函数：只要有满足条件的项就停止循环，some函数返回true
			return this.todos.some(item => item.completed)
		}
	}
})
