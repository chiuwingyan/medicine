<template>
  <div class="login">
 
     <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="用户名">
    <el-input v-model="form.name" class="user-input"></el-input>
  </el-form-item>
  </el-form>
  </div>
</template>

<script>
export default {

  data () {
    return {
      form:{
        name:''
      }
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
.user-input{
  width: 204px;
}
</style>
