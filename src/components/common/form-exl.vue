<template>
  <div>
<el-form :inline="true" :model="searchObj" class="demo-form-inline">
  <el-form-item label="">
    <el-input v-model="searchObj.medicineName" placeholder="药品名称" ref="medicineName"></el-input>
  </el-form-item>
  <el-form-item label="">
    <el-input :disabled="showMyself"  v-model="searchObj.realName" placeholder="操作员姓名" ref="code"></el-input>
  </el-form-item>
  <el-form-item label="">
  <el-date-picker
      v-model="searchObj.date"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
       value-format="yyyy-MM-dd">
    </el-date-picker>
  </el-form-item>
  <el-form-item label="">
    <el-select v-model="searchObj.manufacturerId" placeholder="厂商" ref="manufacturer" value-key="id" clearable>
      <el-option v-for="item in factory" :key="item.name" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </el-form-item>
    <el-button type="primary" @click="search"><i class="el-icon-search"></i> 查询</el-button>
</el-form>
 <el-button v-if="isShow" type="success" @click="getExl"><i class="el-icon-circle-plus-outline"></i>导出统计报表</el-button>
  </div>
  
</template>

<script>

export default {
  props:{
    isShow:{
      type:Boolean,
      default:true
    },
    showMyself:{
      type:Boolean,
      default:false
    }
  },
  created(){
    this.$http.get(`manufacturer/getManufacturerList?rows=100`)
      .then( (response) => {
        console.log(response);
        if(response.data.statusCode===200){
          this.factory=response.data.data.data;
        }
      })
      .catch(function (response) {
        console.log(response);
      })
  },
  data(){
    return {
      searchObj:{
        medicineName:'',
        realName:'',
        date:[],
        manufacturerId:null
      },
      factory:{}
    }
  },
 methods:{
   getExl(){
      this.$emit('export');
   },
   search(){
     this.$emit('search',this.searchObj)
   }
 }
}
</script>

<style lang="scss"  type="text/css" scoped="">
.el-date-editor{
  width:250px;
}
</style>
