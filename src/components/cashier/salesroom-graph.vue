<template>
        
       <saleroomGraph />
</template>
<script>
import saleroomGraph from '@/components/common/saleroom-graph'
export default {
  components:{
   saleroomGraph
  },
  data () {
    return {
    
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
