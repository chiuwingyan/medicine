<template>
<div style="height:100%">
<el-menu
:default-active="$route.path" 
  class="el-menu-demo ul"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b" router>
  <div class="title"><span class="header">药店管理系统 <span class="type">销售员版</span></span></div>
  <el-submenu index="3">
    <template slot="title">统计报表</template>
    <el-menu-item index="/manager/formExl/purchase-exl">我的销售统计报表</el-menu-item>
    <el-menu-item index="/manager/formExl/return-exl">我的退货统计报表</el-menu-item>
    </el-submenu>
  <el-submenu index="2">
    <template slot="title">我的工作台</template>
    <el-menu-item index="/cashier/cashier-working/sell">药品销售及药品列表</el-menu-item>
    <el-menu-item index="/manager/manager-working/returntoFactory">药品退货</el-menu-item>
    </el-submenu>
  <el-menu-item index="/cashier/main/cashier">首页</el-menu-item>
</el-menu>
<el-main style="height:93%;" class="under">
<el-menu default-active="1-4-1" class="el-menu-vertical-demo left" @open="handleOpen" @close="handleClose" :collapse="isCollapse" style="height:100%;display:inline-block;"
 router>
  <el-submenu index="1">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">查看销售统计图</span>
    </template>
    <el-menu-item-group>
      <el-menu-item index="/manager/factory">查看药品销量统计图</el-menu-item>
      <el-menu-item index="/manager/medi-type">查看药店销额统计图</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
</el-menu>
<div class="right">
  <div class="user"><bread></bread><div><lowerTip :name="name"></lowerTip><avatar></avatar></div></div>
  <el-main class="main">
      <section>
        <el-collapse-transition>
         <router-view></router-view>
         </el-collapse-transition>
      </section>
       </el-main>
       </div>
</el-main>
<lowList @close="closeLow" :lowVisible="lowVisible" ref="lowlist"></lowList>
</div>
</template>

<script>
import bread from '@/components/common/breadcrumb'
import lowerTip from '@/components/common/lower-tip'
import avatar from '@/components/common/avatar'
import lowList from '@/components/common/lowList'

export default {
  created(){
     this.name=localStorage.getItem('userName')
  },
components:{
  bread,
  lowerTip,
  avatar,
  lowList
},
data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        isCollapse: true,
        name:'',
        lowVisible:false
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
       handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
       showLowList(){
     this.$refs.lowlist.getLowList();
     this.lowVisible=true;
   },
    closeLow(){
     this.lowVisible=false;
   }
    }
}
</script>

<style lang="scss"  type="text/css" scoped="">
.ul{
  padding-right:10%;
position: relative; 
  .title{
    position: absolute;
    left: 5%;
    .header{
      font-family:PingFang SC;
      border-radius:5px;
      opacity: 0.8;
      line-height:55px;
      font-size:25px;
      color:rgb(255, 255, 255);
      .type{
        font-size:17px;
        color:#ffd04b;
        //line-height:70px;
      }
    }
  }
  li{
    float: right;
  }
}
</style>
<style lang="scss"  type="text/css">
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .under{
    display: flex;
    .left{
      width:56px;
      margin-right:10px;
    }
    .right{
      flex:1;
      .user{
        padding-right:2%;
        width:100%;
        display: flex;
        justify-content: space-between;
        box-sizing:border-box;
      }
       .main{
          background-color:#f0f2f5;
          border-radius:7px;
          width: 100%;
          height: 95%;
        }
    }
  }
</style>
