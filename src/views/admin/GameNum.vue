<template>
    <div>
<!--        <span @click="drawEcharts">玩家游戏次数统计</span>-->
        <div class="gameChart center" id="gameChart">

        </div>

    </div>

</template>

<script>
    // 折线图 横轴：时间 纵轴：当天所有玩家的游戏次数
    import api from '../../api'
    // import formatDate from '../../utils'
    export default {
        name: "GameNum",
        data() {
            return {
                time_range: [],
                time_range_num: [],
            }
        },
        mounted() {
            this.drawEcharts()
        },

        methods: {
            drawEcharts() {
                var myChart = this.$echarts.init(document.getElementById("gameChart"), 'azul');
                api.getGameNums().then(response => {
                    if (response.status === 200) {
                        if (response.data.code === 200) {
                            console.log('success')
                            // let time_range_ = response.data.content["timeRange"];
                            // console.log(time_range_)
                            // for (var i = 0;i < time_range_.length; i++) {
                            //     this.time_range.push(formatDate(time_range_[i]))
                            // }
                            this.time_range = response.data.content["timeRange"];
                            this.time_range_num = response.data.content["timeRangeNum"];
                            console.log(this.time_range)
                            console.log(this.time_range_num)
                            myChart.setOption({
                                title: {
                                    text: '玩家游戏次数按天数分布'
                                },
                                // 提示框（就是鼠标放上去后出现的框）
                                tooltip : {
                                    trigger: 'axis',
                                    axisPointer: {
                                        type: 'cross',
                                        label: {
                                            backgroundColor: '#6a7985'
                                        }
                                    }
                                },

                                //  右上角的组件，用于说明，也可进行点击筛选
                                legend: {
                                    align : 'right',
                                    x : 'right',
                                    top : 25,
                                    selectedMode : 'single',    //  我这里设置的单选模式
                                    data:['游戏次数']            //  显示的第一项和第二项，这里的颜色是根据自定义主题的颜色顺序来定的
                                },

                                //  x、y轴显示一些设置，比如刻度颜色显示什么的，可在自定义主题设置一部分
                                xAxis: {
                                    type: 'category',
                                    boundaryGap: false,
                                    data: this.time_range
                                },
                                yAxis: {
                                    type: 'value'
                                },
                                // 具体配置项，根据具体项目查看官网配置项说明
                                series: [
                                    {
                                        name : '时间',
                                        data: this.time_range_num,
                                        type: 'line',
                                        smooth: true,   //  是否平滑曲线
                                        areaStyle: {},
                                    }

                                ]
                            }, true)
                        }
                    }


                }).catch(err => {
                    console.log(err.response);
                })

            }
        }
    }
</script>

<style scoped>
    .gameChart {
        width: 500px;
        height: 300px;
    }

    .center {
        margin: 20px auto;
    }

</style>