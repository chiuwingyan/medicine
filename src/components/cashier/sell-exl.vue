<template>
        
       <sellRecordExl :userId="userId" :showMyself="true"/>
</template>
<script>
import sellRecordExl from '@/components/root/SellRecord-exl'
export default {
  components:{
   sellRecordExl
  },
  data () {
    return {
    userId:localStorage.getItem('userId')
    }
  },
 
  created(){
    //console.log(this.$route.matched
  },
  mounted(){
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
.section{
    width: 100%;
    height: 100%;
}
</style>
