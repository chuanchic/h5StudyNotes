<template>
  <div>
    <h1>这是第一个单文件组件：{{msg}}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '我是单文件组件的消息'
    }
  }
}
</script>

<style>
h1 {
  color: pink;
}
</style>