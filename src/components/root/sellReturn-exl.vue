<template>
  <div >
  <formExl @search="getList" @export="exportExl" :showMyself="showMyself"/>
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
      label="退货数量">
    </el-table-column>
     <el-table-column
      prop="returnsMoney"
      label="退货单价">
    </el-table-column>
    <el-table-column
      prop="totalMoney"
      label="退货总额">
    </el-table-column>
    <el-table-column
      prop="returnsDate"
      label="退货时间">
    </el-table-column>
    <el-table-column
      prop="operatorName"
      label="操作员">
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
   props:{
    userId:{
    },
    showMyself:{
      type:Boolean,
      default:false
    }
  },
  created(){
   this.getreturnFactotyList();
  },
  data(){
    return {
      tableData:[],
      page:{
        pageNo: 1,
        pageSize:5,
        totalCount: null,
        pageCount:null,
        },
      searchObj:{
        medicineName:'',
        realName:'',
        date:[],
        manufacturerId:null
      }
    }
  },
  components:{
    formExl
  },
  methods:{
      changepage(val){
        this.page.pageNo=val;
        this.getreturnFactotyList();
      },
      getList(searchObj){
      this.page.pageNo=1;
      this.searchObj.medicineName=searchObj.medicineName;
      this.searchObj.realName=searchObj.realName;
      this.searchObj.date=searchObj.date;
      this.searchObj.manufacturerId=searchObj.manufacturerId;
      this.getreturnFactotyList();
      },
      getreturnFactotyList(){
          this.$http.get('storage/getReturnsList',
        {
          params: {
            page: this.page.pageNo,
            rows:this.page.pageSize,
            medicineName:this.searchObj.medicineName,
            userName:this.searchObj.realName,
            startTime:this.searchObj.date && this.searchObj.date[0],
            endTime:this.searchObj.date && this.searchObj.date[1],
            manufacturerId:this.searchObj.manufacturerId,
            userId:this.userId&&this.userId
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
        this.$http.get('storage/getReturnsExcel',
        {
          params: {
           startTime:this.searchObj.date && this.searchObj.date[0],
           endTime:this.searchObj.date && this.searchObj.date[1],
           medicineName:this.searchObj.medicineName,
           userName:this.searchObj.realName,
           manufacturerId:this.searchObj.manufacturerId,
           userId:this.userId&&this.userId
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
      }
    }
    }
</script>

<style lang="scss"  type="text/css" scoped>
.el-table{
  margin-top: 20px;
}
</style>
