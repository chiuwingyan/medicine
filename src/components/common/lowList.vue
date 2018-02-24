<template>
  <div>
      <el-dialog
  title="修改低库存警告数量"
  :visible.sync="lowVisible"
  width="30%" :before-close="handleClose"
  >
     <el-form :model="form" ref="addForm" :rules="addRules">
    <el-form-item label="出现警告临界值"  prop="warnNum" >
      <el-input v-model="form.warnNum" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="update">修改</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
export default {
  props:{
       lowVisible:Boolean
  },
  data () {
       var validate = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('临界值不能为空'));
        } else {
        let re=/^[0-9]*[1-9][0-9]*$/;
        if(!re.test(value)){
             callback(new Error('临界值必须为正整数'));
        }
          callback();
        }
      };
    return {
     form:{
         warnNum:null
     },
     addRules:{
          warnNum:[{ required: true,validator: validate, trigger: 'blur'  }]
      }
    }
  },
 
  created(){
    //console.log(this.$route.matched
   // this.getLowList()
  },
  methods:{
      getLowList(){
          this.$http.get('other/getLowWarnStockNum')
      .then( (response) => {
      console.log(response);
      if(response.data.statusCode===200){
        this.form.warnNum=response.data.data;
      }else{
        this.$message.error(response.data.userMsg);
      }
      })
      .catch(function (response) {
        console.log(response);
      })
      },
      handleClose(){
          this.$emit('close');
      },
      update(){
          let num=this.form.warnNum;
        this.$refs.addForm.validate((valid) => {
          if (valid) {
          this.$http.put(`other/updateLowStockWarnNum?warnNum=${num}`)
            .then( (response) => {
              //console.log(response);
             if(response.data.statusCode===200){
              
                 this.$message({
                  message: '修改成功！',
                  type: 'success'
                });
                this.handleClose();
            }else{
              this.$message.error(response.data.userMsg);
            }
            })
            .catch(function (response) {
              console.log(response);
            })
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

</style>
