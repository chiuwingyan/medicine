<template>
<div>
    <month @getMonth="getMonth"></month>
    <div style="width:100%; min-height:650px;">
    <div id="myChart" style="width:100%; min-height:650px;" ref="myChart"></div>
</div>
</div>
</template>
<script>
//引入基本模板
require('echarts/theme/vintage');
import month from '@/components/common/month'
export default {
components:{
    month
  },
created(){
   // this.getData();
},

  data () {
    return {
        xline:[],
        profit:[],
        cost:[],
        sales:[],
        month:6,
        opt:{
            title: { text: '药店销售额统计表' },
             tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    toolbox: {
        feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    legend: {
        data:['总利润','总成本','总销售额']
    },
    xAxis: [
        {
            type: 'category',
            data: this.xline,
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '元',
            min: 0,
            interval: 50,
            axisLabel: {
                formatter: '{value} 元'
            }
        }
    ],
    series: [
        {
            name:'总利润',
            type:'bar',
            data:[]
        },
        {
            name:'总成本',
            type:'bar',
            data:[]
        },
        {
            name:'总销售额',
            type:'line',
            data:[]
        }
    ]
        
        }
    }
  },
  mounted(){
      //this.getData();
      this.$nextTick(
          this.getData()
      )
  },
  methods: {
    getData(){
         let myChart = this.$echarts.init(this.$refs.myChart, 'dark');
        // 绘制图表
        myChart.setOption(this.opt);
        this.$http.get(`statistics/getSellStatistics?month=${this.month}`)
      .then( (response) => {
      console.log(response);
      if(response.data.statusCode===200){
          this.xline=[]
          console.log('xline',this.xline);
          this.profit=[]
          this.cost=[]
          this.sales=[]
          this.$nextTick(
            response.data.data.forEach((item,index)=>{
            this.xline=this.xline.concat(item.date);
            this.profit=this.profit.concat(item.retainedProfits);
            this.cost=this.cost.concat(item.totalCost);
            this.sales=this.sales.concat(item.totalSales);
        })
             )
        myChart.setOption({
            xAxis: [
                {
                    type: 'category',
                    data: this.xline,
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            series: [ {
            name:'总利润',
            type:'bar',
            data:this.profit
        },
        {
            name:'总成本',
            type:'bar',
            data:this.cost
        },
        {
            name:'总销售额',
            type:'line',
            data:this.sales
        }]
          })
      }else{
        this.$message.error(response.data.userMsg);
      }
      })
      .catch(function (response) {
        console.log(response);
      })
    },
    getMonth(month){
        this.month=month;
        this.getData();
    }
  }
}
</script>