<template>
  <div>
  <el-button type="primary" icon="el-icon-circle-plus-outline" @click="openAdd">新增用户</el-button>
 <el-table
    :data="userList"
    border
    style="width: 90%" class="table">
    <el-table-column
      prop="userName"
      label="用户名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="roleName"
      label="角色"
      width="180">
    </el-table-column>
      <el-table-column
      prop="realName"
      label="真实姓名"
      width="180">
    </el-table-column>
     <el-table-column
      label="操作" prop="code">
       <template slot-scope="scope">
      <el-button
          size="mini"
         type="success"  @click="showDetail(scope.row.id)" icon="el-icon-edit">修改信息</el-button>
         <el-button
          size="mini"
         type="primary" @click="resetPass(scope.row.id)" icon="el-icon-edit-outline">重置密码</el-button>
         <el-button
          size="mini"
         type="danger" icon="el-icon-delete" @click="comfirmDel(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination class="pagination"
  background
  layout="prev, pager, next"
  :total="page.totalCount" v-show="page.pageCount" :page-count="page.pageCount" :page-size="page.pageSize"
   @current-change="changepage">
</el-pagination>
<!-- 修改弹框内容 -->
<el-dialog
  title="修改信息"
  :visible.sync="dialogChange"
  width="30%"
 >
  <el-form  style="text-align:center;" >
            
           
      
</el-form>
  
</el-dialog>
<!-- 新增弹框内容 -->
<el-dialog
  title="新增用户"
  :visible.sync="dialogAdd"
  width="30%"
 >
  <el-form ref="addForm" label-width="100px" :model="addUser" :rules="addRules">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="addUser.username"></el-input>
  </el-form-item>       
  <el-form-item label="真实姓名" prop="realname">
    <el-input v-model="addUser.realname"></el-input>
  </el-form-item>          
  <el-form-item label="密码" prop="password">
    <el-input v-model="addUser.password" type="password"></el-input>
  </el-form-item>     
  <el-form-item label="角色" prop="roleId">
    <el-radio-group v-model="addUser.roleId">
      <el-radio :label="item" v-for="(item,index) in rule" :key="index">{{item.roleName}}</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitAdd">提交</el-button>
    <el-button @click="closeAdd">取消</el-button>
  </el-form-item>
</el-form>
  
</el-dialog>

  </div>
</template>

<script>
 let rule=[{id:1,roleName:'系统管理员'},{id:5,roleName:'销售员'},{id:2,roleName:'仓库管理员'}];
export default {
    created(){
        this.getUserlist();
    },
 data(){
     var checkPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (value.length<6) {
             callback(new Error('密码不能小于6位'));
          }
          callback();
        }
      };
     return {
         userList:[],
         page:{
            pageNo: 1,
            pageSize:3,
            totalCount: null,
            pageCount:null,
        },
        dialogChange:false,
        dialogAdd:false,
        addUser:{
          username:'',
          realname:'',
          password:'',
          roleId:null
        },
        rule:rule,
        addRules:{
          username:[{ required: true, message: '用户名不能为空哦', trigger: 'blur'  }
          ],
          realname: [
            { required: true, message: '真实姓名不能为空', trigger: 'blur'  }
          ],
          password: [
            {required: true,  validator: checkPass, trigger: 'blur' }
          ],
          roleId: [
            { required: true, message: '请选择角色', trigger: 'blur' }
          ]
      }
     }
 },
 methods:{
     getUserlist(){
         this.$http.get('user/getUserList',
        {
          params: {
            page: this.page.pageNo,
            rows:this.page.pageSize
          }
        })
      .then( (response) => {
      console.log(response);
      if(response.data.statusCode===200){
          this.userList=response.data.data.data;
            this.page.totalCount=response.data.data.totalCount;
            this.page.pageCount=response.data.data.pageCount;
      }
      })
      .catch(function (response) {
        console.log(response);
      })
     },
     changepage(val){
      this.page.pageNo=val;
      console.log(val);
      this.$nextTick( this.getUserlist());
    },
    comfirmDel(id){
         this.$confirm('确定删除此用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$http.delete(`user/deleteUser/${id}`)
             .then( (response) => {
                console.log(response);
                if(response.status===200){
                       this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.getUserlist();     //删除成功后重新获取用户列表
                }else{
                     this.$message.error('错了,请重试');
                }
                })
                .catch(function (response) {
                    console.log(response);
                })
       
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      openAdd(){
          this.dialogAdd=true;
      },
      submitAdd(){
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            //alert(this.addUser.roleId.id);
            this.$http.post('user/addUser',
              {
           
                  username: this.addUser.username,
                  realName:this.addUser.realname,
                  password:this.addUser.password,
                  roleId:this.addUser.roleId.id
                
              })
            .then( (response) => {
            console.log(response);
             if(response.data.statusCode===200){
               this.dialogAdd=false;
                 this.$message({
                  message: '添加成功！',
                  type: 'success'
                });
                this.getUserlist();
            }else{
              this.$message.error(response.data.statusMsg);
            }
            })
            .catch(function (response) {
              console.log(response);
            })
                } else {
                  return false;
                }
              });
      },
      
      closeAdd(){
         this.dialogAdd=false;
      },
      resetPass(id){
         this.$confirm('确定要为此用户重置密码为默认密码？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$http.put(`user/resetUserPwd/${id}`)
            .then( (response) => {
            console.log(response);
            if(response.data.statusCode===200){
              this.$message({
                  type: 'success',
                  message: '重置成功!'
                });
            }else{
              this.$message.error(response.data.statusMsg);
            }
            })
            .catch(function (response) {
              console.log(response);
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置'
          });          
        });
       
      }
    }
 }

</script>

<style lang="scss"  type="text/css" scoped>
.table{
    margin: 30px 0 30px;
}
.pagination{
    text-align: center;
}
.el-radio+.el-radio {
    margin-left: 5px;
}

</style>
