<template>

  <el-container style="height:100%">
    <el-aside style="width:240px">
      <el-col :span="24">
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
          <el-menu-item index="/root/purchase-exl">进货统计报表</el-menu-item>
          <el-menu-item index="/root/returnFactory-exl" >退货统计报表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
           <template slot="title">销售统计报表</template>
          <el-menu-item index="/root/sellRecord-exl">售出统计报表</el-menu-item>
          <el-menu-item index="/root/sellReturn-exl" >退货统计报表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/root/medicine-list" >
        <i class="el-icon-setting"></i>
        <span slot="title">查看药品列表</span>
      </el-menu-item>
        <el-submenu index="">
          <template slot="title">
          <i class="el-icon-printer"></i>
          <span>用户管理</span>
        </template>
          <el-menu-item index="/root/user-list">查看用户列表</el-menu-item>
        </el-submenu>
         <el-submenu index="">
          <template slot="title">
          <i class="el-icon-printer"></i>
          <span>生产厂商管理</span>
        </template>
          <el-menu-item index="/root/factory">查看厂商列表</el-menu-item>
        </el-submenu>
    </el-menu>
      </el-col>
    </el-aside>
     
  
     <el-container>
       <el-header style="height:90px;"><div class="top"><span class="header">药店管理系统 <span class="type">系统管理员版</span></span> <div class="userDetail">
         <lowerTip :name="name"></lowerTip><avatar></avatar></div></div>
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
import lowerTip from '@/components/common/lower-tip'
import avatar from '@/components/common/avatar'
export default {
  created(){
    console.log('created')
    //console.log(this);
    evenBus.$on('userName',(userName) => {
     this.name=userName;
    }
    )
  },
  data(){
    return {
      name:''
    }
  },
  components:{
    bread,
    lowerTip,
    avatar
  },
  methods:{
  
  }
  }
</script>

<style lang="scss"  type="text/css">
.el-col-12{
  width: 95%;
  height: 632px;
  background-color:#545c64; 
  border-radius: 5px;
}

</style>
<style lang="scss" scoped="" type="text/css">
 .top{
    border-bottom:1px solid #e6e6e6;
    display: flex;
    justify-content: space-between;
    align-items:center;
    padding-right:1%;
    .header{
      font-family:PingFang SC;
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
    },
    .userDetail{
      .icon{
        margin-left:10px;
        width:40px;
        height: 40px;
        border-radius:10px;
        vertical-align::middle;
      }
    }
  }

.el-aside{
  border-radius:5px;
  background-color:rgb(84,92,100);
  .el-menu{
    width:100%;
  }
}
.el-main{
  background-color:#f0f2f5;
  border-radius:7px;
  //overflow: scroll;
}
.el-container{
 // width:1893px;
}
</style>