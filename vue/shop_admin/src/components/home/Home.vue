<template>
  <el-container class="home-wrapper">
    <el-header>
      <el-row>
        <el-col
          :span="8"
          class="logo"
        >
          <img
            src="@/assets/logo.png"
            alt="黑马logo"
          >
        </el-col>
        <el-col :span="8">
          <h1 class="title">电商后台管理系统</h1>
        </el-col>
        <el-col :span="8">
          <div class="welcome">
            <span>欢迎上海前端25期星曜会员</span>
            <a
              href="javascript:;"
              @click.prevent="logout"
            >退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <!--
          el-menu 表示菜单组件
            default-active 当前激活菜单的 index 值
            @open 菜单展开事件
            @close 菜单收起事件
            :router="true" 启用路由模式
          el-sub-menu 表示一级菜单
            index 是唯一的，不能重复
         -->
        <el-menu
          :router="true"
          default-active="2-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <!--
              template: 容器，用来包裹其他布局，最终渲染到页面上的只是里面的内容
            -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <!-- index 相当于 原来 router-link 中的to属性，用来指定导航的路径（哈希值） -->
            <!-- 可以使用 /home/users 或者 home/users -->
            <el-menu-item index="/home/users">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/home/roles">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>角色列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/home/rights">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>权限列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 子路由出口(路由嵌套) -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    // 退出功能
    logout() {
      this.$confirm('您是否确认退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确认按钮
        // 清除token
        localStorage.removeItem('token')
        // 跳回登录页面
        this.$router.push('/login')
      })
    },
    // 菜单展开事件
    handleOpen(key, keyPath) {
      console.log('open', key, keyPath)
    },
    // 菜单收起事件
    handleClose(key, keyPath) {
      console.log('close', key, keyPath)
    }
  }
}
</script>

<style scoped lang="less">
// scoped 属性表示以下所有 样式 只对当前 template 有效
// lang="less" 表示使用 less 语法
.home-wrapper {
  height: 100%;

  .el-header {
    padding: 0;
    background-color: #b3c1cd;
    color: #333;
    text-align: center;

    .logo {
      text-align: left;
    }

    .title {
      margin: 0;
      line-height: 60px;
      color: #fff;
      font-size: 36px;
    }

    .welcome {
      line-height: 60px;
      font-weight: bold;
      text-align: right;
      padding-right: 30px;

      a {
        color: #b07a17;
        text-decoration: none;
      }
    }
  }

  .el-aside {
    background-color: #545c64;
    color: #333;
    line-height: 200px;
  }

  .el-main {
    background-color: #eaeef1;
    color: #333;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
}
</style>
