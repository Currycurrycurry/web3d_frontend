<template>
    <div>
        <span>玩家游戏次数统计</span>
        <div class="gameChart" id="gameChart">

        </div>

    </div>

</template>

<script>
    // 折线图 横轴：时间 纵轴：当天所有玩家的游戏次数
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
                var option = {
                    title: {
                        text: '玩家游戏次数按天数分布'
                    },
                    tooltip: {},
                    legend: {
                        data: ['游戏次数']
                    },
                    xAxis: {
                        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '时间',
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

</style>