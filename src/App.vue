<template>
  <div id="app">

     <router-view></router-view>
     
  </div>
  
</template>

<script>

export default {
  name: 'app'
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
  margin:0;
}
#app{
  width: 100%;
  height: 100%;
}
</style>
