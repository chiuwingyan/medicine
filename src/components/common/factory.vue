<template>
  <div>
      <el-button type="success" class="el-icon-circle-plus-outline" @click="dialogFormVisible=true;">新增厂商</el-button>
<el-table
    :data="factory"
    border
    style="width: 55%" class="factoryTable">
    <el-table-column
      prop="id"
      label="厂商id"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="生产厂商"
      width="180">
    </el-table-column>
    
     <el-table-column
      label="操作" prop="code">
       <template slot-scope="scope">
         <el-button
          size="mini"
         type="danger" icon="el-icon-delete" @click="delete(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination class="factory-pagination"
  background
  layout="prev, pager, next"
  :total="page.totalCount" v-show="page.pageCount" :page-count="page.pageCount" :page-size="page.pageSize"
   @current-change="changepage">
</el-pagination>
<!-- 新增厂商弹框 -->
<el-dialog title="新增厂商" :visible.sync="dialogFormVisible" class="factoty-dialog" :rules="addRules">
  <el-form :model="form" ref="addForm" :rules="addRules">
    <el-form-item label="生产厂商名称"  prop="factoryName">
      <el-input v-model="form.factoryName" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit">提交</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
export default {

  data () {
    return {
     type:'',
     page:{
        pageNo: 1,
        pageSize:7,
        totalCount: null,
        pageCount:null,
     },
     factory:[],
     dialogFormVisible:false,
     form:{
         factoryName:''
     },
     addRules:{
          factoryName:[{ required: true, message: '请输入生产厂商名称', trigger: 'blur'  }
          ]
      }
    }
  },
 
  created(){
    this.getFactory();
  },
  methods:{
      getFactory(){
           this.$http.get('manufacturer/getManufacturerList',
        {
          params: {
            page: this.page.pageNo,
            rows:this.page.pageSize
          }
        })
      .then( (response) => {
      console.log(response);
      if(response.data.statusCode===200){
         this.factory=response.data.data.data;
         this.page.totalCount=response.data.data.totalCount;
         this.page.pageCount=response.data.data.pageCount;
      }else{
        this.$message.error(response.data.statusMsg);
      }
      })
      .catch(function (response) {
        console.log(response);
      })
      },
      changepage(val){
      this.page.pageNo=val;
      console.log(val);
      this.$nextTick(this.getFactory());
    },
    delete(id){
        this.$confirm('确定删除此用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        this.$http.delete(`manufacturer/deleteManufacturer/${id}`)
      .then( (response) => {
      console.log(response);
      if(response.data.statusCode===200){
       this.$message({
       type: 'success',
        message: '删除成功!'
        });
        this.getUserlist();     //删除成功后重新获取用户列表
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
            message: '已取消删除'
          });          
        });
    },
    submit(){
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            //alert(this.addUser.roleId.id);
          
                } else {
                  return false;
                }
              });
    }
  },
  mounted(){
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
.factoryTable{
    margin-top:10px;
    //text-align: center; 
}
.factory-pagination{
    margin-left:10%; 
    margin-top:10px; 
}
.factoty-dialog{
    .el-input{
        width: 61%;
    }
    .el-form-item__error{
        left: 40%;
    }
}
</style>
