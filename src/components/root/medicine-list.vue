<template>
<div>
  <el-form :inline="true" :model="formInline" class="demo-form-inline search-form">
  <el-form-item label="">
    <el-input v-model="formInline.medicineName" placeholder="药品名称" ref="medicineName"></el-input>
  </el-form-item>
  <el-form-item label="">
    <el-input v-model="formInline.code" placeholder="药品编号" ref="code"></el-input>
  </el-form-item>
  <el-form-item label="">
    <el-input v-model="formInline.barCode" placeholder="条形码" ref="barCode"></el-input>
  </el-form-item>
  <el-form-item label="">
    <el-select v-model="type" placeholder="药品类型" ref="medicineType" clearable>
      <el-option v-for="item in formInline.medicineType" :key="item.name" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="">
    <el-select v-model="facturer" placeholder="厂商" ref="manufacturer" value-key="id" clearable>
      <el-option v-for="item in formInline.manufacturer" :key="item.name" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </el-form-item>
 
    
    <el-button type="primary" @click="search"><i class="el-icon-search"></i> 查询</el-button>

</el-form>
 <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="code"
      label="药品编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="药品名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="manufacturerName"
      label="厂商">
    </el-table-column>
    <el-table-column
      prop="medicineType"
      label="药品类型">
    </el-table-column>
    <el-table-column
      prop="stockNum"
      label="药品库存">
    </el-table-column>
    <el-table-column
      prop="sellPrice"
      label="售价">
    </el-table-column>
     <el-table-column
      label="操作" prop="code">
       <template slot-scope="scope">
      <el-button
          size="mini"
         type="primary" plain>查看详情</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination class="pagination"
  background
  layout="prev, pager, next"
  :total="page.totalCount" v-show="page.pageCount" :page-count="page.pageCount" :page-size="page.pageSize"
   @current-change="changepage">
</el-pagination>
  </div>
</template>

<script>

export default {
  created(){
    let that=this
    this.$http.all([this.getAllList(),this.getType(),this.getFactory()])
    .then(that.$http.spread(function (allList, type,fact) {
    console.log(type)
    console.log(fact)
    that.formInline.medicineType=type.data.data.data;
    that.formInline.manufacturer=fact.data.data.data;
  }));
  },
   data() {
      return {
        tableData: [],
        page:{
        pageNo: 1,
        pageSize:3,
        totalCount: null,
        pageCount:null,
        },
        formInline:{
        medicineName:'',
        code:'',
        medicineType:null,
        manufacturer:null,
        barCode:''
        },
        type:undefined,// 药品类型双向绑定的定义
        facturer:undefined,//厂商的双向绑定的定义
        postType:null,   //提交表单的药品类型
        postFacturer:null, //提交表单的厂商信息
        postNname:'',
        postCode:'',
        postBarcode:''
      }
    },
    methods:{
      getAllList(){
        return this.getmedicinelist();
      },
      getType(){
        return this.$http.get('http://39.108.174.244:9090/medicine/getMedicineTypeList?rows=100');
      },
      getFactory(){
        return this.$http.get('http://39.108.174.244:9090/manufacturer/getManufacturerList?rows=100');
      },
      getmedicinelist(){
        let that=this
        this.$http.get('http://39.108.174.244:9090/medicine/getMedicineList',
        {
          params: {
            page: this.page.pageNo,
            rows:this.page.pageSize,
            medicineName:this.postNname,
            code:this.postCode,
            type:this.postType,
            manufacturer:this.postFacturer
           // barCode:this.postBarcode

          }
        })
      .then(function (response) {
      console.log(response);
      that.tableData=response.data.data.data;
      that.page.pageNo=response.data.data.pageNo;
      that.page.totalCount=response.data.data.totalCount;
      that.page.pageCount=response.data.data.pageCount;
      })
      .catch(function (response) {
        console.log(response);
      })
      },
  changepage(val){
      this.page.pageNo=val;
      console.log(val);
      this.$nextTick( this.getmedicinelist());
    },
    search(){
    console.log(this.$refs.medicineType.value,this.$refs.manufacturer.value,this.formInline.code,this.formInline.medicineName,this.formInline.barCode)
    this.postType=this.$refs.medicineType.value;
    this.postFacturer=this.$refs.manufacturer.value;
    this.postCode=this.formInline.code;
    this.postNname=this.formInline.medicineName;
    this.postbarCode=this.formInline.barCode;
    this.getmedicinelist();
    }
  
}
    }

</script>

<style lang="scss"  type="text/css" scoped="">
.pagination{
  margin:20px auto;
  text-align: center; 
}
</style>
<style lang="scss"  type="text/css">
.search-form{
  margin-bottom:10px;
  .el-form-item{
    width:15%;
  }
}
</style>
