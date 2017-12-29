<template>
  <div class="login">
    登录
      <el-button type="success" @click="login">登录</el-button>
  </div>
</template>

<script>
export default {

  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
      login(){
          this.$router.push('/main');
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
