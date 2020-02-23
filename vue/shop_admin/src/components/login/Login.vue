<template>
  <div class="login-wrapper">
    <!--
      布局容器，用来设置 对齐方式
      el-row：一行
      el-col：一列
        :span="6"：占6份(共24份)的宽度
        :xs="8" :sm="6" :md="4" :lg="3" :xl="1" 响应式的宽度
     -->
    <el-row type="flex" class="loginForm" justify="center" align="middle">
      <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4" class="login-content">
        <!--
          el-form：
            label-position：设置 label 的对齐方式
            :model：为 表单 绑定 数据模型
            :rules：设置 表单验证 的规则
            ref：设置引用，代表组件
          el-form-item：
            label：当前 表单项 的名称
            prop：数据模型中的一个属性
          el-input：
            v-model：双向数据绑定
        -->
        <el-form label-position=”top“ :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwssword">
            <!-- type="password" 设置为 输入内容 不可见 -->
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">登录</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 导入 axios
import axios from 'axios'

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          // required: true 必填
          // trigger: 'blur' 失去焦点触发
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 6,
            message: '用户名长度在 3 到 6 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 6,
            message: '密码长度在 3 到 6 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 提交表单
    submitForm() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 表单校验成功，就登录
          this.login()
        } else {
          // 表单校验失败
          return false
        }
      })
    },
    // 表单重置
    resetForm() {
      this.$refs.loginForm.resetFields()
    },
    // 登录
    // 需要传的参数 username password，直接传 loginForm 一样
    login() {
      axios
        .post('http://localhost:8080/api/private/v1/login', this.loginForm)
        .then(res => {
          // 解构赋值 从 res.data 中取出 data meta
          const { data, meta } = res.data
          if (meta.status === 200) {
            // 登录成功
            // 存储 token 到 LocalStorage 中
            localStorage.setItem('token', data.token)
            // 跳转到后台管理 首页
            this.$router.push('/home')
          } else {
            // 登录失败
            // 通过 Element 提供的 消息提示 组件
            this.$message({
              type: 'error',
              message: meta.msg,
              duration: 1000
            })
          }
        })
    }
  }
}
</script>

<style>
.login-wrapper,
.loginForm {
  height: 100%;
}

.loginForm {
  background-color: #2d434c;
}

.login-content {
  background-color: #fff;
  padding: 20px 35px;
  border-radius: 10px;
  min-width: 240px;
}
</style>
