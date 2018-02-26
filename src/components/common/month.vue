<template>
  <div class="month">
    <el-select v-model="month" placeholder="请选择统计时间段">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-button type="success"  icon="el-icon-search" @click="search">查询</el-button>
</div>
  
</template>

<script>

export default {
  created(){
    
  },
  data(){
    return {
       options:[
          {
              label:'近3个月',
              value:3
          },
          {
              label:'近4个月',
              value:4
          },
          {
              label:'近5个月',
              value:5
          },
          {
              label:'近6个月',
              value:6
          },
          {
              label:'近7个月',
              value:7
          },
          {
              label:'近8个月',
              value:8
          },
          {
              label:'近9个月',
              value:9
          },
          {
              label:'近10个月',
              value:10
          },
          {
              label:'近11个月',
              value:11
          },
          {
              label:'近12个月',
              value:12
          }
      ],
      month:6
    
    }
  },
 methods:{
   getExl(){
      this.$emit('export');
   },
   search(){
     this.$emit('getMonth',this.month)
   }
 }
}
</script>

<style lang="scss"  type="text/css" scoped="">
.month{
    margin-bottom: 20px;
}
</style>
