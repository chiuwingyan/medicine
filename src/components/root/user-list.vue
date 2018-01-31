<template>
  <div>
  <el-button type="primary" icon="el-icon-circle-plus-outline" @click="openAdd">新增用户</el-button>
 <el-table
    :data="userList"
    border
    style="width: 90%" class="table">
    <el-table-column
      prop="realName"
      label="用户名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="roleName"
      label="角色"
      width="180">
    </el-table-column>
      <el-table-column
      prop="isDisabled"
      label="是否可用"
      width="180">
    </el-table-column>
     <el-table-column
      label="操作" prop="code">
       <template slot-scope="scope">
      <el-button
          size="mini"
         type="success"  @click="showDetail(scope.row.id)" icon="el-icon-edit">修改</el-button>
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
  <el-form class="detail" style="text-align:center;">
            
           
      
</el-form>
  
</el-dialog>
<!-- 新增弹框内容 -->
<el-dialog
  title="新增用户"
  :visible.sync="dialogAdd"
  width="30%"
 >
  <el-form class="detail" style="text-align:center;">
            
           
      
</el-form>
  
</el-dialog>

  </div>
  </div>
  
</template>

<script>

export default {
    created(){
        this.getUserlist();
    },
 data(){
     return {
         userList:[],
         page:{
            pageNo: 1,
            pageSize:3,
            totalCount: null,
            pageCount:null,
        },
        dialogChange:false,
        dialogAdd:false
     }
 },
 methods:{
     getUserlist(){
         this.$http.get('http://39.108.174.244:9090/user/getUserList',
        {
          params: {
            page: this.page.pageNo,
            rows:this.page.pageSize
          }
        })
      .then( (response) => {
      console.log(response);
      if(response.status===200){
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
            this.$http.delete(`http://39.108.174.244:9090/user/deleteUser/${id}`)
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

</style>
