<template>
        
       <sellReturnExl :userId="userId" :showMyself="true"/>
</template>
<script>
import sellReturnExl from '@/components/root/sellReturn-exl'
export default {
  components:{
   sellReturnExl
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
