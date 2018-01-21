<template>
  <div >
<el-button type="primary" @click="test">主要按钮</el-button>

  </div>
  
</template>

<script>

export default {
methods:{
  test(){
     console.log('route',this.$route);
  this.$http.get('http://39.108.174.244:9090/medicine/getMedicineList')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (response) {
    console.log(response);
  });
  }
}
}
</script>

<style lang="scss"  type="text/css">
html{
  height: 100%;
  width: 100%;
}
body{
  width: 100%;
  height: 100%;
}
#app{
  width: 100%;
  height: 100%;
}
</style>
