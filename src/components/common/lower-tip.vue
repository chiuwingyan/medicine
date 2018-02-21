<template>

</template>

<script>

export default {
   created() {
    this.getLower()
  },
  data() {
    return {
      levelList: null
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
           this.$notify({
          title: '提示',
          dangerouslyUseHTMLString: true,
          message: '<strong>药品仓库当中存在药品库存小于等于10，请及时通知仓库管理员处理！<i class="show" @click="show">点击查看</i></strong>',
          duration: 0
        });
         }
      }else{
         this.$message.error(response.data.userMsg);
      }
      })
      .catch(function (response) {
        console.log(response);
      })
      },
      show(){
        this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
          dangerouslyUseHTMLString: true
        });
      
      }
  }
}
</script>

<style lang="scss"  type="text/css" scoped="">

</style>