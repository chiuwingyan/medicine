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
      width="100%">
    </el-table-column>
    <el-table-column
      prop="name"
      label="药品名称"
      width="100%">
    </el-table-column>
    <el-table-column
      prop="manufacturerName"
      label="厂商"
      width="100%">
      
    </el-table-column>
    <el-table-column
      prop="medicineType"
      label="药品类型"
      width="100%">
      <template slot-scope="scope">
     <div v-for="(item,index) in scope.row.medicineType" :key="index">{{item.name}}</div>
      </template>
    </el-table-column>
     <el-table-column
      prop="barCode"
      label="条形码"
      width="100%">
    </el-table-column>
    <el-table-column
      prop="stockNum"
      label="药品库存"
      width="100%">
    </el-table-column>
    <el-table-column
      prop="sellPrice"
      label="售价"
      width="100%">
    </el-table-column>
    <el-table-column
      prop="purchasePrice"
      label="进货价"
      width="100%">
    </el-table-column>
     <el-table-column
      label="操作" prop="code">
       <template slot-scope="scope">
      <el-button
          size="mini"
         type="primary" plain @click="showDetail(scope.row.id)">查看详情</el-button>
         <el-button size="mini" type="success" @click="showpurchase(scope.row.id,scope.row.sellPrice)">销售</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination class="pagination"
  background
  layout="prev, pager, next"
  :total="page.totalCount" v-show="page.pageCount" :page-count="page.pageCount" :page-size="page.pageSize"
   @current-change="changepage" :current-page.sync="page.pageNo">
</el-pagination>
<!-- 药品详情弹框内容 -->
<el-dialog
  title="药品详情"
  :visible.sync="dialogVisible"
  width="30%"
 >
  <el-form class="detail" style="text-align:center;">
            <el-form-item label="药品图片">
           <img :src="img" width="300" height="150" alt=""/>
            </el-form-item>
            <el-form-item label="生产日期">
              <div class="content">{{detail.productionDate}}</div>
            </el-form-item>
            <el-form-item label="保质期">
              <div class="content">{{detail.validity}}个月</div>
            </el-form-item>
             <el-form-item label="药品介绍">
              <div class="content">{{detail.detailDesc}}</div>
            </el-form-item>
            <el-form-item label="生产规格">
              <div class="content">{{detail.productionSpecifications}}</div>
            </el-form-item>
       
   
              <el-button type="primary" round @click="dialogVisible = false" class="close">关闭</el-button>
      
          </el-form>
  
</el-dialog>
<!-- 进货弹框 -->
<el-dialog
  title="进货操作"
  :visible.sync="ispurchase"
  width="30%">
  <el-form :model="purchase" status-icon  ref="purchaseForm" label-width="100px" class="demo-ruleForm" :rules="purchaseForm">
  <el-form-item label="销售数量" prop="num" >
     <el-input-number v-model="purchase.num"  :min="1" label="进货数量"></el-input-number>
  </el-form-item>
  <el-form-item label="本次出售单价" prop="purchaseMoney" >
     <el-input-number v-model="purchase.purchaseMoney"  :min="1"  label="描述文字"></el-input-number>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="toPurchase">确定</el-button>
    <el-button @click="ispurchase=false">关闭</el-button>
  </el-form-item>
</el-form>
</el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'; 
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
   this.$notify({
          title: '提示',
          message: '如果需要进货的药品不在药品列表内，请先进行“添加药品”操作哦！',
          duration: 0
        });
  },
  computed:{
    img(){
      return this.detail.imgUrls && this.detail.imgUrls.length>0 &&this.detail.imgUrls[0].imgUrl
    }
  },
   data() {
     var validate = (rule, value, callback) => {
       //console.log(value)
        if (value === ''|| value === undefined) {
          callback(new Error('销售单价不能为空'));
        } else {
         let re=/^[0-9]+(.[0-9]{1,2})?$/;
        if(!re.test(value)){
             callback(new Error('销售单价不正确'));
        }
          callback();
        }
      };
      return {
        tableData: [],
        page:{
        pageNo: 1,
        pageSize:5,
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
        postNname:'',
        postCode:'',
        type:'',
        facturer:'',
        postBarcode:'',
        dialogVisible:false,
        addDialog:false,
        changeDialog:false,
        ispurchase:false,
        detail:{},
        purchase:{
          num:1,
          medicineId:null,
          purchaseMoney:null,
          manufacturerId:null
        },
         purchaseForm:{
          purchaseMoney:[{ required: true,validator: validate, trigger: 'blur'  }]
      },
      }
    },
    methods:{
      getAllList(){
        return this.getmedicinelist();
      },
      getType(){
        return this.$http.get('medicine/getMedicineTypeList?rows=100');
      },
      getFactory(){
        return this.$http.get('manufacturer/getManufacturerList?rows=100');
      },
      getmedicinelist(){
        let that=this;
        this.$http.get('medicine/getMedicineList',
        {
          params: {
            page: this.page.pageNo,
            rows:this.page.pageSize,
            medicineName:this.postNname,
            code:this.postCode,
            type:this.postType,
            manufacturer:this.postFacturer,
            barCode:this.postBarcode

          }
        })
      .then(function (response) {
      console.log(response);
      if(response.data.data.pageNo===0){
        that.page.pageNo=1
      }else{
        that.page.pageNo=response.data.data.pageNo;
      }
      that.tableData=response.data.data.data;
      that.page.totalCount=response.data.data.totalCount;
      that.page.pageCount=response.data.data.pageCount;
      })
      .catch(function (response) {
        console.log(response);
      })
      },
  changepage(val){
      this.page.pageNo=val;
    //  console.log(val);
      this.$nextTick( this.getmedicinelist());
    },
    search(){
    console.log(this.$refs.medicineType.value,this.$refs.manufacturer.value,this.formInline.code,this.formInline.medicineName,this.formInline.barCode)
    this.page.pageNo=1;
    this.postType=this.$refs.medicineType.value;
    this.postFacturer=this.$refs.manufacturer.value;
    this.postCode=this.formInline.code;
    this.postNname=this.formInline.medicineName;
    this.postBarcode=this.formInline.barCode;
    this.getmedicinelist();
    },
    showDetail(index){
      console.log(index);
      this.$http.get(`medicine/getMedicineDetail/${index}`)
      .then( (response) => {
        console.log(response);
        if(response.data.statusCode===200){
          this.detail=response.data.data;
          this.dialogVisible=true;
        }
       
      })
      .catch(function (response) {
        console.log(response);
      })
    
    },
    showpurchase(id,price,manufacturerId){
      this.purchase.num=1;
      this.purchase.medicineId=id;
      this.purchase.purchaseMoney=price;
      this.purchase.manufacturerId=manufacturerId;
      this.ispurchase=true;
    },
    toPurchase(){           //销售
       this.$refs.purchaseForm.validate((valid) => {
          if (valid) {
            //alert(this.addUser.roleId.id);
          this.$http.post('store/sellMedicine',
              [{
                 medicineId:this.purchase.medicineId,
                 num:this.purchase.num,
                 money:this.purchase.purchaseMoney
              }])
            .then( (response) => {
              //console.log(response);
             if(response.data.statusCode===200){
               this.ispurchase=false;
                 this.$message({
                  message: '销售成功！',
                  type: 'success'
                });
              
                this.getmedicinelist();
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
      showAdd(id){
        this.$http.get(`medicine/getMedicineDetail/${id}`)
          .then( (response) => {
          console.log(response);
          if(response.data.statusCode===200){
            this.changeMedicine=response.data.data;
            this.changeMedicine.id=id;
            this.changeDialog=true;
          }else{
            this.$message.error(response.data.statusMsg);
          }
          })
          .catch(function (response) {
            console.log(response);
          })
          },
      changeMedi(){
        this.$refs.changeForm.validate((valid) => {
          if (valid) {
            this.$http.post('medicine/addOrUpdateMedicine',this.changeMedicine)
            .then( (response) => {
              console.log(response);
             if(response.data.statusCode===200){
                 this.$message({
                  message: '修改成功！',
                  type: 'success'
                });
                this.changeDialog=false;
                this.getmedicinelist();
            }else{
              this.$message.error(response.data.userMsg);
            }
            })
            .catch(function (response) {
              console.log(response);
            })
            }else {
                  return false;
                }
              });
      }
}
    }

</script>

<style lang="scss"  type="text/css" scoped="">
.pagination{
  margin:20px auto;
  text-align: center; 
}
.detail{
  .content{
    font-size: 16px;
    word-wrap: break-word; 
    word-break: normal; 
  }
  .close{

  }
}
</style>
<style lang="scss"  type="text/css">
.search-form{
  margin-bottom:10px;
  .el-form-item{
    width:15%;
  }
}
.detail{
  .el-form-item{
    text-align: center;
  }
}
.addDialog{
  .el-dialog{
    height: 70%;
    overflow: scroll;
  }
  
}
</style>
