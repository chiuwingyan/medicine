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
        inner:[],
        outSide:[],
        month:6,
        opt:{
           tooltip: {
        trigger: 'item',
        formatter:function (a) {
            //console.log(a)
            return (a.data.manufacturerName+'<br>'+a.name+':'+a.data['value'])
        }
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:[]
    },
    series: [
        {
            name:'销售量',
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
            data:[]
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
         let myChart = this.$echarts.init(this.$refs.myChart, 'normal');
        // 绘制图表
        myChart.setOption(this.opt);
        this.$http.get(`statistics/getSellMedicineStatistics?month=${this.month}`)
      .then( (response) => {
      console.log(response);
      if(response.data.statusCode===200){
          this.xline=[]
          //console.log('xline',this.xline);
          this.inner=[]
          this.outSide=[]
          this.$nextTick(
            response.data.data.forEach((item,index)=>{
            this.xline=this.xline.concat(item.name);
            if(index<2){
                this.inner=this.inner.concat(item);
            }else{
                this.outSide=this.outSide.concat(item)
            }
        })
             )
        myChart.setOption({
            legend: {
            orient: 'vertical',
            x: 'left',
            data:this.xline
            },
       series: [
        {
            name:'销售量',
            type:'pie',
            selectedMode: 'single',
            radius: [0, '30%'],
            data:this.inner
        },
        {
            name:'销售量',
            type:'pie',
            radius: ['40%', '55%'],
            data:this.outSide
        }
    ]
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