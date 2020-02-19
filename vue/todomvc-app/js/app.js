
const todoHeader = {
	template: `
		<header class="header">
			<h1>todos</h1>
			<input class="new-todo" placeholder="What needs to be done?" autofocus v-model="todoName" @keyup.enter="add">
		</header>
	`,
	data() {
		return {
			// 任务名称，双向数据绑定用
			todoName: ''
		}
	},
	methods: {
		// 添加任务
		add() {
			if (this.todoName.trim() === '') {
				return
			}
			// 触发父组件的方法
			this.$emit('gettodoname', this.todoName)
			this.todoName = ''
		}
	}
}

const todoList = {
	template: `
		<section class="main">
			<input id="toggle-all" class="toggle-all" type="checkbox">
			<label for="toggle-all">Mark all as complete</label>
			<!-- todo列表 -->
			<ul class="todo-list">
				<!-- todo条目
						:class 动态绑定样式 通过对象语法
						v-for 循环遍历列表
						:key 添加唯一标识 提高渲染性能
						completed 设置任务是否完成
						editing 设置为编辑状态 可以修改任务内容 -->
				<li :class="{completed: item.completed, editing: item.id === editId}" v-for="(item, index) in todos"
					:key="item.id">
					<div class="view">
						<!-- v-model 双向数据绑定，这儿代表checkbox的选中状态 -->
						<input class="toggle" type="checkbox" v-model="item.completed">
						<!-- 添加双击事件，显示编辑状态 -->
						<label @dblclick="showEditStatus(item.id)">{{item.name}}</label>
						<!-- 添加点击事件，删除任务项 -->
						<button class="destroy" @click="delTodo(index, item.id)"></button>
					</div>
					<!-- v-model绑定input输入框的value值
							回车键要隐藏编辑状态 -->
					<input class="edit" v-model="item.name" @keyup.enter="updateTodo(item.id)">
				</li>
			</ul>
		</section>
	`,
	data() {
		return {
			// 标记被编辑的任务项
			editId: -1
		}
	},
	// 接收父组件传递过来的数据
	props: ['todos'],
	methods: {
		// 删除任务
		delTodo(index, id) {
			this.$emit('deltodo', index, id)
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
				this.editId = -1
			})
		}
	}
}

const todoFooter = {
	template: `
		<!-- 通过 todos.length > 0 控制显示隐藏不是特别好，用计算属性 showFooter 更好 -->
		<footer class="footer" v-show="showFooter" v-cloak>
			<!-- v-text 计算属性 -->
			<span class="todo-count"><strong v-text="unCompletedCount"></strong> item left</span>
			<ul class="filters">
				<li>
					<a class="selected" href="#/">All</a>
				</li>
				<li>
					<a href="#/active">Active</a>
				</li>
				<li>
					<a href="#/completed">Completed</a>
				</li>
			</ul>
			<!-- v-show 计算属性 是否显示 清除已完成任务 按钮 -->
			<!-- 点击清除按钮，删除所有已完成的项 -->
			<button class="clear-completed" v-show="showClearCompleted" @click="delAllCompleted">Clear completed</button>
		</footer>
	`,
	// 接收父组件传递过来的数据
	props: ['todos'],
	methods: {
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
}

const vm = new Vue({
	el: "#app",
	data: {
		// 任务列表，定义在父组件，然后传递给子组件使用
		todos: []
	},
	// 定义子组件
	components: {
		'todo-header': todoHeader,
		'todo-list': todoList,
		'todo-footer': todoFooter
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
		// 获取添加的任务名，子组件调用这个方法传递过来
		// 然后 添加任务
		getAddTodoName(name) {
			// 发送添加请求
			// axios 会自动添加 id，不需要手动添加
			axios.post('http://localhost:3000/todos', {
				name: name,
				completed: false
			}).then(res => {
				// 添加成功，更新任务列表
				// this.todos.push(res.data)
				// ...扩展运算符，将data里的字段依次取出来，给新建的对象{}
				this.todos.push({ ...res.data })
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
		}
	}
})
