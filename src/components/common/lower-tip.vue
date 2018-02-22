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
    <el-button type="primary" size="mini" @click="visible = true;visible2 = false">查看详情</el-button>
  </div>
</el-popover>
<span class="name" @click.prevent>欢迎您，{{name}}</span>
<el-popover
  ref="popover4"
  placement="right"
  width="400"
  trigger="click"
  v-model="visible" class="detailForm">
  <div class="dataTable">
  <el-table :data="gridData">
    <el-table-column width="100" property="medicineName" label="药品名称"></el-table-column>
    <el-table-column width="100" property="manufacturerName" label="厂商"></el-table-column>
    <el-table-column width="50" property="stockNum" label="库存"></el-table-column>
  </el-table>
  </div>
  <div class="bottom">
    <el-button size="mini" type="danger" @click="visible = false">关闭</el-button>
    <el-button type="primary" size="mini" @click="goList">{{btn}}</el-button>
</div>
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
    let detail,btn;
    if(localStorage.getItem('userId')==2){
      detail='请及时处理';
      btn='去处理';
    }else{
      detail='请及时通知仓库管理员处理';
      btn='查看';
    }
    return {
      levelList: null,
      visible2:false,
      detail:detail,
      visible:false,
      gridData: [],
      btn:btn
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
          this.gridData=response.data.data.data;
          this.visible2=true;
         }
      }
      })
      .catch(function (response) {
        console.log(response);
      })
      },
      goList(){
        this.$router.push('/root/medicine-list');
      }
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
     width:250px !important;
     top:60px;
     right: 30px;
     max-height:230px;
     .bottom{
       text-align:center;
       margin-top:5px;
     }
     .dataTable{
       overflow: scroll;
       height: 200px;
     }
   }
 }
</style>
