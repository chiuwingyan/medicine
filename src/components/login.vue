<template>

  <div class="login">

     <el-form ref="form" :model="form"  :rules="loginRules" class="login-form">
       <div class="title-container">
        <h3 class="title">药房管理系统</h3>
       
      </div>
  <el-form-item label="" prop="name">
    <span class="svg-container svg-container_login">
      <i class="iconfont icon-denglu"></i>
    </span>
    <el-input v-model="form.name" type="text"/>
  </el-form-item>
   <el-form-item label="" prop="password">
     <span class="svg-container">
      <i class="iconfont icon-denglu1"></i>
    </span>
    <el-input type="password" v-model="form.password" auto-complete="off"/>
  </el-form-item>
 <el-button type="primary" style="width:100%;margin-bottom:30px;"  @click="onSubmit">登录</el-button>
  </el-form>
  </div>
</template>

<script>
export default {

  data () {
    
    return {
      dialogVisible:false,
      form:{
        name:'',
        pass:''
      },
      loginRules: {
        name: [{ required: true, trigger: 'blur'}],
        password: [{ required: true, trigger: 'blur'}]
      },
    }
  },
  methods:{
    
      onSubmit(){
          //console.log(this.form.name,this.form.password) 
        this.$refs.form.validate((valid) => {
      let that=this;
      if (valid) {
       console.log(this.form.name,this.form.pass) 
        this.$http.post('http://39.108.174.244:9090/oauth/login',{
        "id": 0,
        "isDisabled": 0,
        "page": 0,
        "password": this.form.password,
        "realName": "string",
        "roleId": 0,
        "rows": 0,
        "username": this.form.name
        }).then(function (response) {
           console.log(response);
        if(response.data.statusCode!==200){
         that.$alert('用户名或密码错误','提示');
       
        }
        })
        .catch(function (error) {
          console.log(error);
        });

      } else {

       

        return false;

      }

    });
        
            }
        }
      }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">    //重写element-ui

$light_gray:#eee;
$bg:#2d3a4b;
.login{
 width:100%;
 height: 100%;
 position: relative;
 background-color:#2d3a4b;
  .login-form{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 520px;
    padding: 35px 35px 15px 35px;
    .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .el-input{
        display: inline-block;
        height: 47px;
        width: 85%;
        input{
          background: transparent;
          border: 0px;
          -webkit-appearance: none;
          border-radius: 0px;
          padding: 12px 5px 12px 15px;
          color: $light_gray;
          height: 47px;
          &:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
            -webkit-text-fill-color: #fff !important;
          }
        }
    }
  }
}
</style>
<style lang="scss" scoped="" type="text/css">
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .el-form-item__content{
    margin-left: 0;
  }
  .button{
     position: absolute;
    right: 35px;
    bottom: 28px;
  }

    
</style>
