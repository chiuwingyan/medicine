<template>
<div>
 <el-button type="success" icon="el-icon-circle-plus-outline" style="margin-bottom:10px;" @click="add">添加药品</el-button>
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
         <el-button size="mini" type="success" @click="showpurchase(scope.row.id,scope.row.purchasePrice,scope.row.manufacturerId)">进货</el-button>
         <el-button type="primary" size="mini" @click="showAdd(scope.row.id)">修改药品</el-button>
          <el-button type="danger" size="mini" @click="deleteMedicine(scope.row.id)">删除</el-button>
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
  <el-form-item label="进货数量" prop="num" >
     <el-input-number v-model="purchase.num"  :min="1" label="进货数量"></el-input-number>
  </el-form-item>
  <el-form-item label="本次进货单价" prop="purchaseMoney" >
     <el-input-number v-model="purchase.purchaseMoney"  :min="1"  label="描述文字"></el-input-number>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="toPurchase">确定</el-button>
    <el-button @click="ispurchase=false">关闭</el-button>
  </el-form-item>
</el-form>
</el-dialog>
<!-- 添加药品弹框 -->
<el-dialog title="添加药品" :visible.sync="addDialog" width="30%" class="addDialog">
  <el-form ref="addForm"  :model="addMedicine" :rules="addForm">
    <el-form-item label="药品图片" label-width="30%">
     <el-upload
      class="upload-demo"
      action="http://39.108.174.244:9090/file/uploadPic"
      :header="header"
      :on-success="uploadSuccess"
      :on-error="onError"
      :limit="1"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :before-remove="beforeRemove">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不能超过一张图片</div>
</el-upload>
    </el-form-item>
    <el-form-item label="药品编号" label-width="30%" prop="code" :rules="[{required: true, message: '药品编号不能为空',trigger:'blur'}]">
      <el-input v-model="addMedicine.code" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="药品名称" label-width="30%" prop="medicineName" :rules="[{required: true, message: '药品名称不能为空', trigger: 'blur'}]">
      <el-input v-model="addMedicine.medicineName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="药品条形码" label-width="30%" prop="barCode" :rules="[{required: true, message: '药品条形码不能为空', trigger: 'blur'}]">
      <el-input v-model="addMedicine.barCode" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="生产厂商" label-width="30%" prop="manufacturerId" :rules="[{required: true, message: '生产厂商不能为空', trigger: 'change'}]">
    <el-select v-model="addMedicine.manufacturerId" placeholder="生产厂商"  value-key="id" clearable>
      <el-option v-for="item in formInline.manufacturer" :key="item.name" :label="item.name" :value="item.id"></el-option>
    </el-select>
    </el-form-item>
    <el-form-item label="药品类型" label-width="30%" prop="medicineTypes" :rules="[{required: true, message: '药品类型不能为空', trigger: 'change'}]">
      <el-select v-model="addMedicine.medicineTypes" placeholder="药品类型"  clearable multiple >
      <el-option v-for="item in formInline.medicineType" :key="item.name" :label="item.name" :value="item.id"></el-option>
    </el-select>
    </el-form-item>
    <el-form-item label="库存" label-width="30%" prop="stockNum" :rules="[{required: true, message: '库存不能为空', trigger: 'change'}]">
      <el-input-number v-model="addMedicine.stockNum"  :min="1"  label="描述文字"></el-input-number>
    </el-form-item> 
    <el-form-item label="销售价" label-width="30%" prop="sellPrice">
      <el-input-number v-model="addMedicine.sellPrice" :min="1"  label="描述文字"></el-input-number>
    </el-form-item>
    <el-form-item label="进货价" label-width="30%" prop="purchasePrice">
      <el-input-number v-model="addMedicine.purchasePrice" :min="1"  label="描述文字"></el-input-number>
    </el-form-item>
    <el-form-item label="生产日期" label-width="30%" prop="productionDate" :rules="[{required: true, message: '生产日期不能为空', trigger: 'change'}]">
      <el-date-picker
      v-model="addMedicine.productionDate"
      type="date"
      placeholder="选择日期"
      value-format="yyyy-MM-dd">
    </el-date-picker>
    </el-form-item>
    <el-form-item label="保质期" label-width="30%" prop="validity" :rules="[{required: true, message: '保质期不能为空', trigger: 'change'}]">
      <el-input-number v-model="addMedicine.validity" :min="1"  label="描述文字"></el-input-number>个月
    </el-form-item>
    <el-form-item label="规格" label-width="30%" prop="productionSpecifications" :rules="[{required: true, message: '药品规格不能为空', trigger: 'blur'}]">
       <el-input v-model="addMedicine.productionSpecifications" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="药品介绍" label-width="30%" prop="detailDesc" :rules="[{required: true, message: '药品介绍不能为空', trigger: 'blur'}]">
       <el-input v-model="addMedicine.detailDesc" auto-complete="off" type="textarea" :row="3"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addDialog = false">取 消</el-button>
    <el-button type="primary" @click="submint">确 定</el-button>
  </div>
</el-dialog>


<!-- 修改药品弹框 -->
<el-dialog title="修改药品" :visible.sync="changeDialog" width="30%" class="addDialog">
  <el-form ref="changeForm"  :model="changeMedicine" :rules="changeForm">
    <el-form-item label="药品图片" label-width="30%">
     <el-upload
      class="upload-demo"
      action="http://39.108.174.244:9090/file/uploadPic"
      :header="header"
      :on-success="uploadSuccess"
      :on-error="onError"
      :limit="1"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :before-remove="beforeRemove">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不能超过一张图片</div>
</el-upload>
    </el-form-item>
    <el-form-item label="药品编号" label-width="30%" prop="code" :rules="[{required: true, message: '药品编号不能为空', trigger: 'blur'}]">
      <el-input v-model="changeMedicine.code" auto-complete="off" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="药品名称" label-width="30%" prop="medicineName" :rules="[{required: true, message: '药品名称不能为空', trigger: 'blur'}]">
      <el-input v-model="changeMedicine.medicineName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="药品条形码" label-width="30%" prop="barCode" :rules="[{required: true, message: '药品条形码不能为空', trigger: 'blur'}]">
      <el-input v-model="changeMedicine.barCode" auto-complete="off" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="生产厂商" label-width="30%" prop="manufacturerId" :rules="[{required: true, message: '生产厂商不能为空', trigger: 'change'}]">
    <el-select v-model="changeMedicine.manufacturerId" placeholder="生产厂商"  value-key="id" clearable>
      <el-option v-for="item in formInline.manufacturer" :key="item.name" :label="item.name" :value="item.id"></el-option>
    </el-select>
    </el-form-item>
    <el-form-item label="药品类型" label-width="30%" prop="medicineTypes" :rules="[{required: true, message: '药品类型不能为空', trigger: 'change'}]">
      <el-select v-model="changeMedicine.medicineTypes" placeholder="药品类型"  clearable multiple >
      <el-option v-for="item in formInline.medicineType" :key="item.name" :label="item.name" :value="item.id"></el-option>
    </el-select>
    </el-form-item>
    <el-form-item label="库存" label-width="30%" prop="stockNum" :rules="[{required: true, message: '库存不能为空', trigger: 'change'}]">
      <el-input-number v-model="changeMedicine.stockNum"  :min="1"  label="描述文字"></el-input-number>
    </el-form-item> 
    <el-form-item label="销售价" label-width="30%" prop="sellPrice">
      <el-input-number v-model="changeMedicine.sellPrice" :min="1"  label="描述文字"></el-input-number>
    </el-form-item>
    <el-form-item label="进货价" label-width="30%" prop="purchasePrice">
      <el-input-number v-model="changeMedicine.purchasePrice" :min="1"  label="描述文字"></el-input-number>
    </el-form-item>
    <el-form-item label="生产日期" label-width="30%" prop="productionDate" :rules="[{required: true, message: '生产日期不能为空', trigger: 'change'}]">
      <el-date-picker
      v-model="changeMedicine.productionDate"
      type="date"
      placeholder="选择日期"
      value-format="yyyy-MM-dd">
    </el-date-picker>
    </el-form-item>
    <el-form-item label="保质期" label-width="30%" prop="validity" :rules="[{required: true, message: '保质期不能为空', trigger: 'change'}]">
      <el-input-number v-model="changeMedicine.validity" :min="1"  label="描述文字"></el-input-number>个月
    </el-form-item>
    <el-form-item label="规格" label-width="30%" prop="productionSpecifications" :rules="[{required: true, message: '药品规格不能为空', trigger: 'blur'}]">
       <el-input v-model="changeMedicine.productionSpecifications" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="药品介绍" label-width="30%" prop="detailDesc" :rules="[{required: true, message: '药品介绍不能为空', trigger: 'blur'}]">
       <el-input v-model="changeMedicine.detailDesc" auto-complete="off" type="textarea" :row="3"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addDialog = false">取 消</el-button>
    <el-button type="primary" @click="changeMedi">确 定</el-button>
  </div>
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
          callback(new Error('进货单价不能为空'));
        } else {
         let re=/^[0-9]+(.[0-9]{1,2})?$/;
        if(!re.test(value)){
             callback(new Error('进货单价不正确'));
        }
          callback();
        }
      };
      var valisellPrice = (rule, value, callback) => {
       console.log(value)
        if (value === ''|| value === undefined) {
          callback(new Error('销售价不能为空'));
        } else {
         let re=/^[0-9]+(.[0-9]{1,2})?$/;
        if(!re.test(value)){
             callback(new Error('销售价不正确'));
        }
          callback();
        }
      };
      var valipurchasePrice= (rule, value, callback) => {
       //console.log(value)
        if (value === ''|| value === undefined) {
          callback(new Error('进货价不能为空'));
        } else {
         let re=/^[0-9]+(.[0-9]{1,2})?$/;
        if(!re.test(value)){
             callback(new Error('进货价不正确'));
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
        type:undefined,// 药品类型双向绑定的定义
        facturer:undefined,//厂商的双向绑定的定义
        postType:null,   //提交表单的药品类型
        postFacturer:null, //提交表单的厂商信息
        postNname:'',
        postCode:'',
        postBarcode:'',
        dialogVisible:false,
        addDialog:false,
        changeDialog:false,
        ispurchase:false,
        detail:{},
        fileList:[],//上传图片
        header:`Bearer ${localStorage.getItem('token')}`,
        addMedicine:{
            
        },
        changeMedicine:{

        },
        purchase:{
          num:1,
          medicineId:null,
          purchaseMoney:null,
          manufacturerId:null
        },
         purchaseForm:{
          purchaseMoney:[{ required: true,validator: validate, trigger: 'blur'  }]
      },
      addForm:{
        sellPrice:[{ required: true,validator: valisellPrice, trigger: 'blur'  }],
        purchasePrice:[{ required: true,validator: valipurchasePrice, trigger: 'blur'  }]
      },
      changeForm:{
        sellPrice:[{ required: true,validator: valisellPrice, trigger: 'blur'  }],
        purchasePrice:[{ required: true,validator: valipurchasePrice, trigger: 'blur'  }]
      }
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
            manufacturer:this.postFacturer
           // barCode:this.postBarcode

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
    this.postbarCode=this.formInline.barCode;
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
    toPurchase(){           //进货
       this.$refs.purchaseForm.validate((valid) => {
          if (valid) {
            //alert(this.addUser.roleId.id);
          this.$http.post('storage/purchase',
              {
                 medicineId:this.purchase.medicineId,
                 num:this.purchase.num,
                 purchaseMoney:this.purchase.purchaseMoney,
                 manufacturerId:this.purchase.manufacturerId
              })
            .then( (response) => {
              //console.log(response);
             if(response.data.statusCode===200){
               this.ispurchase=false;
                 this.$message({
                  message: '进货成功！',
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
    deleteMedicine(id){  //删除药品
      this.$confirm('确定删除此药品?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
      this.$http.post('medicine/addOrUpdateMedicine',
                {
                  id:id,
                  isDeleted:1
                })
              .then( (response) => {
                //console.log(response);
              if(response.data.statusCode===200){
                this.ispurchase=false;
                  this.$message({
                    message: '删除成功！',
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
              }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
    },
          add(){
            this.addDialog=true;
          },
          uploadSuccess(response, file, fileList){
            console.log(response);
            if(response.statusCode===200){
              console.log(fileList)
              Vue.set(this.addMedicine,'imgIds', [response.data.id]);  
              this.$message({
                message: '上传成功',
                type: 'success'
              });
            }else{ 
               file.status='fail';
               this.$message.error('上传失败');
            }
          },
          handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      onError(err,file,fileList){
        console.log(fileList)
         this.$message.error('上传失败');
      },
      beforeRemove(file, fileList){
        this.$http.delete(`/file/deletePic/${this.addMedicine.imgIds[0]}`)
      .then( (response) => {
      console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      }) 
      },
      submint(){
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$http.post('medicine/addOrUpdateMedicine',this.addMedicine)
            .then( (response) => {
              console.log(response);
             if(response.data.statusCode===200){
                 this.$message({
                  message: '添加成功！',
                  type: 'success'
                });
                this.addDialog=false;
                this.getmedicinelist();
            }else{
              this.$message.error('添加药品失败');
            }
            })
            .catch(function (response) {
              console.log(response);
            })
          }else {
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
