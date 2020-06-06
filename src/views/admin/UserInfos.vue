<template>
    <div>
        <div class="myecharts center" id="myecharts">

        </div>

        <div class="myecharts2 center"  id="myecharts2">

        </div>
    </div>

</template>

<script>
    // TODO 获得所有玩家的信息 后台界面 图形化展示数据
    // 图表一 玩家年龄分布 柱状图
    // 图表二 玩家地域分析 地图（？）
    // 图表三 玩家虚拟形象分析
    // 图表四 玩家性别分析
    import api from '../../api'
    export default {
        name: "UserInfos",
        data() {
            return {
                age_range: [],
                age_range_num: [],
                gender_range: [],
                gender_range_num : []
            }
        },
        mounted() {
            this.drawEcharts()
        },

        methods: {
            drawEcharts() {
                var myChart = this.$echarts.init(document.getElementById("myecharts"), 'azul');
                var myChart2 = this.$echarts.init(document.getElementById("myecharts2"), 'azul');
                api.getUserInfos().then(response => {
                    if (response.status === 200) {
                        if (response.data.code === 200) {
                            console.log('success')
                            this.age_range = Object.values(response.data.content['ageRange']);
                            this.age_range_num = response.data.content['ageRangeNum'];
                            this.gender_range = response.data.content['genderRange'];
                            this.gender_range_num = response.data.content['genderRangeNum'];
                            myChart.setOption({
                                title: {
                                    text: '玩家年龄分布'
                                },
                                tooltip: {},
                                legend: {
                                    data: ['年龄']
                                },
                                xAxis: {
                                    data: this.age_range
                                    // data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
                                },
                                yAxis: {},
                                series: [{
                                    name: '年龄',
                                    type: 'bar',
                                    data: this.age_range_num
                                    // data: [5, 2, 3, 0, 0, 0, 0, 0, 0, 0]
                                }]
                            },true)

                            myChart2.setOption({
                                title: {
                                    text: '玩家性别分布'
                                },
                                tooltip: {},
                                legend: {
                                    data: ['性别']
                                },
                                xAxis: {
                                    data: ['男','女']
                                },
                                yAxis: {},
                                series: [{
                                    name: '性别',
                                    type: 'bar',
                                    data: this.gender_range_num
                                }]
                            },true)
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
    .myecharts {
        width: 500px;
        height: 300px;
    }

    .myecharts2{
        width: 500px;
        height: 300px;
    }

    .center {
        margin: 20px auto;
    }

</style>