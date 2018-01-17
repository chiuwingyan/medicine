<template>
  <el-container>
  

    <el-aside>
      <el-col :span="12">
    <el-menu
      :default-active="$route.path" 
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#409cff" router>
      <el-menu-item index="/root/main/root">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>查看统计报表</span>
        </template>
        <el-menu-item-group>
           <template slot="title">仓库统计报表</template>
          <el-menu-item index="/root/2">进货统计报表</el-menu-item>
          <el-menu-item index="">出货统计报表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="1-3">销售统计报表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
    </el-menu>
  </el-col>
    </el-aside>
     <el-container>
       <el-header style="height:90px;"><div class="top"><span class="header">药店管理系统 <span class="type">系统管理员版</span></span></div>
       <bread></bread></el-header>
       <el-main>
      <section class="main">
        <el-collapse-transition>
         <router-view></router-view>
         </el-collapse-transition>
      </section>
       </el-main>
  </el-container>
</el-container>
  
</template>

<script>
import bread from '@/components/common/breadcrumb'
export default {
 components:{
   bread
 }
}
</script>

<style lang="scss"  type="text/css">
.el-col-12{
  width: 95%;
  height: 921px;
  background-color:#545c64; 
  border-radius: 5px;
}

</style>
<style lang="scss" scoped="" type="text/css">
 .top{
    border-bottom:1px solid #e6e6e6;
    .header{
      font-family:PingFang SC;
      margin-bottom:10px;
      border-radius:5px;
      opacity: 0.8;
      line-height:43px;
      font-size:25px;
      color:#000000;
      .type{
        font-size:17px;
        color:#97a8be;
        //line-height:70px;
      }
    }
  }

.el-aside{
  border-radius:5px;
  .el-menu{
    width:100%;
  }
}
.el-main{
  background-color:#f0f2f5;
  border-radius:7px;
}
.el-container{
  width:1893px;
}
</style>