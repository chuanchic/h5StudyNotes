const vm = new Vue({
	el: "#app",
	data: {
		// 任务名称，双向数据绑定用
		todoName: '',
		// 标记被编辑的任务项
		editId: -1,
		// 任务列表
		todos: [
			{ id: 1, name: "抽烟", completed: false },
			{ id: 2, name: "喝酒", completed: true },
			{ id: 3, name: "烫头", completed: false }
		]
	},
	methods: {
		// 添加任务
		add() {
			if (this.todoName.trim() === '') {
				return
			}
			let id
			if (this.todos.length === 0) {
				id = 1
			} else {
				id = this.todos[this.todos.length - 1].id + 1
			}
			this.todos.push({
				id: id,
				name: this.todoName,
				completed: false
			})
			this.todoName = ''
		},
		// 删除任务
		delTodo(index) {
			this.todos.splice(index, 1)
		},
		// 双击 显示编辑状态
		showEditStatus(id) {
			this.editId = id
		},
		// 回车键 隐藏编辑状态
		updateTodo() {
			this.editId = -1
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
