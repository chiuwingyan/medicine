<template>
  <div >
  <formExl @search="getList" @export="exportExl" :isShow="isShow" :showMyself="showMyself"/>
    <el-checkbox v-model="showMyself" border label="仅显示我的记录"></el-checkbox>
   <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="medicineName"
      label="药品名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="manufacturerName"
      label="厂商">
    </el-table-column>
    <el-table-column
      prop="num"
      label="进货数量">
    </el-table-column>
     <el-table-column
      prop="purchaseMoney"
      label="进货单价">
    </el-table-column>
    <el-table-column
      prop="totalMoney"
      label="进货总额">
    </el-table-column>
    <el-table-column
      prop="purchaseDate"
      label="进货时间">
    </el-table-column>
     <el-table-column
      prop="isReturns"
      label="是否已退货">
       <template slot-scope="scope">
        <el-tag
          :type="scope.row.isReturns=== 0 ? 'primary' : 'danger'"
          close-transition>{{scope.row.isReturns===0?'否':'是'}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="operatorName"
      label="操作员">
    </el-table-column>
    <el-table-column
      prop=""
      label="操作">
       <template slot-scope="scope">
          <el-button v-if="scope.row.isReturns===0"
          size="mini"
         type="success"   @click="purchaseReturn(scope.row.purchaseId)">点击退货</el-button>
          <el-button v-else
          size="mini"
         type="info" :disabled="true">点击退货</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination class="pagination"
  background
  layout="prev, pager, next"
  :total="page.totalCount" v-show="page.pageCount" :page-count="page.pageCount" :page-size="page.pageSize"
  @current-change="changepage" :current-page.sync="page.pageNo">
</el-pagination>
  </div>
</template>
<script>
import formExl from '@/components/common/form-exl'
export default {
  created(){
   this.getPurchaseList();
  },
  data(){
    return {
      tableData:[],
      page:{
        pageNo: 1,
        pageSize:6,
        totalCount: null,
        pageCount:null,
        },
      searchObj:{
        medicineName:'',
        realName:'',
        date:[],
        manufacturerId:null
      },
      isShow:false,
      showMyself:false,
    }
  },
  components:{
    formExl
  },
  methods:{
    test(){
      //console.log('route',this.$route);
        this.$http.get('medicine/getMedicineList')
        .then(function (response) {
          console.log(response);
        })
        .catch(function (response) {
          console.log(response);
        });
        },
      changepage(val){
        this.page.pageNo=val;
        this.getPurchaseList();
      },
      getList(searchObj){
      this.page.pageNo=1;
      this.searchObj.medicineName=searchObj.medicineName;
      this.searchObj.realName=searchObj.realName;
      this.searchObj.date=searchObj.date;
      this.searchObj.manufacturerId=searchObj.manufacturerId;
      this.getPurchaseList();
      },
      getPurchaseList(){
          this.$http.get('storage/getPurchaseList',
        {
          params: {
            page: this.page.pageNo,
            rows:this.page.pageSize,
            medicineName:this.searchObj.medicineName,
            userName:this.showMyself===true?'':this.searchObj.realName,
            startTime:this.searchObj.date && this.searchObj.date[0],
            endTime:this.searchObj.date && this.searchObj.date[1],
            manufacturerId:this.searchObj.manufacturerId,
            userId:this.showMyself===true?localStorage.getItem('userId'):null
          }
        })
      .then( (response) => {
      console.log(response);
      if(response.data.statusCode===200){
          this.tableData=response.data.data.data;
            this.page.totalCount=response.data.data.totalCount;
            this.page.pageCount=response.data.data.pageCount;
      }else{
         this.$message.error(response.data.userMsg);
      }
      })
      .catch(function (response) {
        console.log(response);
      })
      },
      exportExl(){
        if(this.tableData.length===0){
             this.$message.error('当前条件下列表为空，无法导出报表！');
             return ;
        }
        this.$http.get('storage/getPurchaseExcel',
        {
          params: {
           startTime:this.searchObj.date && this.searchObj.date[0],
           endTime:this.searchObj.date && this.searchObj.date[1],
           medicineName:this.searchObj.medicineName,
           userName:this.showMyself===true?'':this.searchObj.realName,
           manufacturerId:this.searchObj.manufacturerId,
           userId:this.showMyself===true?localStorage.getItem('userId'):null
          }
        })
      .then( (response) => {
      console.log(response);
      if(response.data.statusCode===200){
         
      }else{
         this.$message.error(response.data.userMsg);
      }
      })
      .catch(function (response) {
        console.log(response);
      })
      },
      purchaseReturn(purchaseId){
      this.$confirm('确定要将该次进货的药品全部退货？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
                this.$http.post('storage/returnToManufacturer',
              {
                 purchaseId:purchaseId
              })
            .then( (response) => {
              //console.log(response);
             if(response.data.statusCode===200){
               
                 this.$message({
                  message: '退货成功！',
                  type: 'success'
                });
                this.getPurchaseList();
            }else{
              this.$message.error(response.data.userMsg);
            }
            })
            .catch(function (response) {
              console.log(response);
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
      }
    }
    }
</script>

<style lang="scss"  type="text/css" scoped>
.el-table{
  margin-top: 20px;
}
</style>
