<template>
    <div class="myecharts" id="myecharts">

    </div>

</template>

<script>
    // TODO 获得所有玩家的信息 后台界面 图形化展示数据
    // 图表一 玩家年龄分布 柱状图
    //

    export default {
        name: "UserInfos",
        data() {
            return {
                age_range: [],
                age_range_num: [],
            }
        },
        mounted() {
            this.drawEcharts()
        },

        methods: {
            drawEcharts() {
                var myChart = this.$echarts.init(document.getElementById("myecharts"), 'westeros');
                var option = {
                    title: {
                        text: '玩家年龄分布'
                    },
                    tooltip: {},
                    legend: {
                        data: ['年龄']
                    },
                    xAxis: {
                        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '年龄',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                };
                if (option && typeof option === "object") {
                    myChart.setOption(option, true)
                }
            }
        }
    }
</script>

<style scoped>
    .myecharts {
        width: 500px;
        height: 300px;
    }

</style>