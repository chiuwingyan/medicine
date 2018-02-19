<template>
<div class="avatar">
 <el-dropdown trigger="hover">
         <img class="icon" src="//wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" alt="">
         <el-dropdown-menu slot="dropdown">
        <el-dropdown-item class="clearfix" @click.native="showPass">
          修改密码
        </el-dropdown-item>
          <el-dropdown-item class="clearfix" @click.native="logOut">
            退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
         </el-dropdown>

<!-- 修改密码弹框 -->
<el-dialog title="修改密码" :visible.sync="dialogFormVisible">
  <el-form :model="form" :rules="rules2" ref="form">
    <el-form-item label="原密码" prop="oldPass">
      <el-input v-model="form.oldPass" auto-complete="off" type="password"></el-input>
    </el-form-item>
    <el-form-item label="新密码"  prop="newPass">
     <el-input v-model="form.newPass" auto-complete="off" type="password"></el-input>
    </el-form-item>
    <el-form-item label="确定密码" prop="comfrim">
     <el-input v-model="form.comfrim" auto-complete="off" type="password"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>

<script>

export default {
   created() {
   
  },
  data() {
    var validateoldPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'));
        } else {
          callback();
        }
      };
     var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if(value.length<6){
            callback(new Error('密码长度不能少于6位'));
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.newPass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      dialogFormVisible:false,
      form:{
          oldPass:'',
          newPass:'',
          comfrim:''
      },
       rules2: {
         oldPass:[
           { required: true, validator: validateoldPass, trigger: 'blur'}
         ],
          newPass: [
            { required: true,  validator: validatePass, trigger: 'blur' }
          ],
          comfrim: [
            { required: true,  validator: validatePass2, trigger: 'blur' }
          ]
        }
    }
  },
  methods: {
    showPass(){
        this.dialogFormVisible=true;
    },
    submit(){
      let that=this;
      this.$refs.form.validate((valid) => {
          if (valid){
         that.$http.put(`user/changePwd`,
         {
           oldPwd:this.form.oldPass,
           newPwd:this.form.newPass
         }) .then( (response) => {
            console.log(response);
            if(response.data.statusCode===200){
              this.$message({
                  type: 'success',
                  message: '修改成功!'
                });
                this.dialogFormVisible=false;
            }else{
              that.$message.error(response.data.userMsg);
            }
            })
            .catch(function (response) {
              console.log(response);
            })
          }else{
            return false;
          }
      })
    },
        logOut(){
              this.$confirm('确定要退出登录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         localStorage.removeItem('token');
           this.$router.push('/login');
        }).catch(() => {         
        });
        }
}
}
</script>

<style lang="scss"  type="text/css" scoped="">
  .avatar{
      display: inline-block;
  }
  .icon{
        margin-left:10px;
        width:40px;
        height: 40px;
        border-radius:10px;
        vertical-align:middle;
      }
</style>