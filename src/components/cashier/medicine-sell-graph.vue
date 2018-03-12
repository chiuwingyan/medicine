<template>
        
       <salesVolumeGraph />
</template>
<script>
import salesVolumeGraph from '@/components/common/sales-volume-graph'
export default {
  components:{
   salesVolumeGraph
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
