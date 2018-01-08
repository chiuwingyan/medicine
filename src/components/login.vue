<template>
  <div class="login">
 
     <el-form ref="form" :model="form" label-width="80px" :rules="loginRules">
  <el-form-item label="用户名" prop="name">
    <el-input v-model="form.name" class="user-input"></el-input>
  </el-form-item>
   <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="form.pass" auto-complete="off" class="user-pass"></el-input>
  </el-form-item>
  <el-form-item size="large">
    <el-button type="primary" @click="onSubmit">登录</el-button>
  </el-form-item>
  </el-form>
  </div>
</template>

<script>
export default {

  data () {
    
    return {
      form:{
        name:'',
        pass:''
      },
      loginRules: {
        name: [{ required: true, trigger: 'blur'}],
        pass: [{ required: true, trigger: 'blur'}]
      },
    }
  },
  methods:{
      onSubmit(){
        console.log(this.form.name,this.form.pass) 
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
.user-input{
  width: 204px;
}
.user-pass{
  width:204px;
}
</style>
