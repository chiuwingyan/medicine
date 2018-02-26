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
           tooltip: {
        trigger: 'item',
        formatter:function (a) {
            console.log(a)
            return (a.data.type+'<br>'+a.name+':'+a.data['value'])
        }
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:['直达','营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            selectedMode: 'single',
            radius: [0, '30%'],

            label: {
                normal: {
                    position: 'inner'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:335, name:'直达', selected:true,type:'aaaaaaaa'},
                {value:679, name:'营销广告',type:'aaaaaaaa'},
                {value:1548, name:'搜索引擎',type:'aaaaaaaa'}
            ]
        },
        {
            name:'销售量',
            type:'pie',
            radius: ['40%', '55%'],
            label: {
                normal: {
                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                    backgroundColor: '#eee',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
                    // shadowBlur:3,
                    // shadowOffsetX: 2,
                    // shadowOffsetY: 2,
                    // shadowColor: '#999',
                    // padding: [0, 7],
                    rich: {
                        a: {
                            color: '#999',
                            lineHeight: 22,
                            align: 'center'
                        },
                        abg: {
                            backgroundColor: '#333',
                            width: '100%',
                            align: 'right',
                            height: 22,
                            borderRadius: [4, 4, 0, 0]
                        },
                        hr: {
                            borderColor: '#aaa',
                            width: '100%',
                            borderWidth: 0.5,
                            height: 0
                        },
                        b: {
                            fontSize: 16,
                            lineHeight: 33
                        },
                        per: {
                            color: '#eee',
                            backgroundColor: '#334455',
                            padding: [2, 4],
                            borderRadius: 2
                        }
                    }
                }
            },
            data:[
                {value:335, name:'直达',type:'aaaaaaaa'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1048, name:'百度'},
                {value:251, name:'谷歌'},
                {value:147, name:'必应'},
                {value:102, name:'其他'}
            ]
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
         let myChart = this.$echarts.init(this.$refs.myChart, 'normal');
        // 绘制图表
        myChart.setOption(this.opt);
    //     this.$http.get(`statistics/getSellStatistics?month=${this.month}`)
    //   .then( (response) => {
    //   console.log(response);
    //   if(response.data.statusCode===200){
    //       this.xline=[]
    //       console.log('xline',this.xline);
    //       this.profit=[]
    //       this.cost=[]
    //       this.sales=[]
    //       this.$nextTick(
    //         response.data.data.forEach((item,index)=>{
    //         this.xline=this.xline.concat(item.date);
    //         this.profit=this.profit.concat(item.retainedProfits);
    //         this.cost=this.cost.concat(item.totalCost);
    //         this.sales=this.sales.concat(item.totalSales);
    //     })
    //          )
    //     myChart.setOption({
    //         xAxis: [
    //             {
    //                 type: 'category',
    //                 data: this.xline,
    //                 axisPointer: {
    //                     type: 'shadow'
    //                 }
    //             }
    //         ],
    //         series: [ {
    //         name:'总利润',
    //         type:'bar',
    //         data:this.profit
    //     },
    //     {
    //         name:'总成本',
    //         type:'bar',
    //         data:this.cost
    //     },
    //     {
    //         name:'总销售额',
    //         type:'line',
    //         data:this.sales
    //     }]
    //       })
    //   }else{
    //     this.$message.error(response.data.userMsg);
    //   }
    //   })
    //   .catch(function (response) {
    //     console.log(response);
    //   })
    },
    getMonth(month){
        this.month=month;
        this.getData();
    }
  }
}
</script>