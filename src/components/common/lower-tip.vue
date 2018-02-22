<template>
<div class="lower">
<el-popover
  ref="popover5"
  placement="left"
  width="160"
  v-model="visible2" class="showLower" >
  <p>仓库中存在库存低于10的药品，{{detail}}。</p>
  <div style="text-align: right; margin: 0">
    <el-button size="mini" type="text" @click="visible2 = false">关闭</el-button>
    <el-button type="primary" size="mini" @click="visible = true">查看详情</el-button>
  </div>
</el-popover>
<span class="name" @click.prevent>欢迎您，{{name}}</span>
<el-popover
  ref="popover4"
  placement="right"
  width="400"
  trigger="click"
  v-model="visible" class="detailForm">
  <el-table :data="gridData">
    <el-table-column width="150" property="date" label="日期"></el-table-column>
    <el-table-column width="100" property="name" label="姓名"></el-table-column>
    <el-table-column width="300" property="address" label="地址"></el-table-column>
  </el-table>
  <el-button size="mini" type="text" @click="visible2 = false">关闭</el-button>
    <el-button type="primary" size="mini" @click="visible = true">查看详情</el-button>
</el-popover>

</div>
</template>

<script>
export default {
   created() {
    this.getLower()
  },
  props:{
    name:String
  },
  data() {
    let detail;
    if(localStorage.getItem('userId')==2){
      detail='请及时处理'
    }else{
      detail='请及时通知仓库管理员处理'
    }
    return {
      levelList: null,
      visible2:false,
      detail:detail,
      visible:false,
      gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
    }
  },
  methods: {
      getLower(){
          this.$http.get('other/getLowStockList',
        {
          params: {
          
          }
        })
      .then( (response) => {
      console.log(response);
      if(response.data.statusCode===200){
         if(response.data.data.totalCount>0){
        this.visible2=true;
         }
      }
      })
      .catch(function (response) {
        console.log(response);
      })
      },
  },
  mounted(){
  }
}
</script>

<style lang="scss"  type="text/css" scoped="">
.lower{
  display: inline-block;
 
}
</style>
<style lang="scss"  type="text/css" >
.showLower{
  .el-popper{
    top: 54px;
    right: 80px;
  }
}
 .detailForm{
   .el-popper{

   }
 }
</style>
