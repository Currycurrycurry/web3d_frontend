<template>
    <div style="align-items: center;">
        <div>
<!--            <span class="demonstration">游戏说明</span>-->
            <el-carousel style="width: 650px; height:300px;display:block; margin:30px auto">
                <el-carousel-item v-for="(index) in 3" v-bind:key="index">
                    <img src="../../public/images/avatar/bxb.jpeg" width='100%' height="100%" v-if="index === 0"/>
                    <img src="../../public/images/avatar/xxb1.jpeg" width='100%' height="100%" v-if="index === 1"/>
                    <img src="../../public/images/avatar/bxb.jpeg" width='100%' height="100%" v-if="index === 2"/>
                    <img src="../../public/images/avatar/xxb1.jpeg" width='100%' height="100%" v-if="index === 3"/>


                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="center">
            <el-button class="center" type="primary" icon="el-icon-upload" @click="startGame">开始游戏</el-button>
            <el-button class="center" type="primary" icon="el-icon-user" @click="show = !show">游戏说明</el-button>
        </div>

        <div class="div_center">
            <el-collapse-transition>
                <div v-show="show">
                    <div class="transition-box center">
                        <span class="header">工作细胞</span>
                        <el-divider direction="vertical"></el-divider>
                        <span class="header">はたらく細胞</span>
                        <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
                        <span>您和伙伴将在游戏中化身为细胞，与人体内的各种其他细胞和入侵的病毒相遇。</span><br/>
                        <span>收集线索、完成挑战，依靠知识和团队协作拯救病入膏肓的人类吧。</span>
                        <el-divider><span class="smallheader">游戏操作</span></el-divider>
                        <span>WASD移动，鼠标控制视角旋转/瞄准，左键点击与对象交互。</span><br/>
                        <span>按B打开背包查看收集到的信息。</span><br/>
                        <span>点击形形色色的NPC，你会获得： </span> <br/>
                        <span>宝贵的细胞/病毒信息 </span><br/>
                        <span>解开人体秘密的线索 </span><br/>
                        <span>抑或是会受到对方的挑战，正确回答题目会获得奖励。</span><br/>
                        <el-divider><span class="smallheader">温馨提示</span></el-divider>
                        <span>如果不慎撞到了病毒，你脆弱的细胞膜会受到侵蚀。</span><br/>
                        <span>多次受伤细胞膜将破裂，你会融入血雾中。</span><br/>
                        <span>你的存活与队伍息息相关，你受到的伤害将转化为团队生命值的损失。</span><br/>
                        <el-divider><span class="smallheader">小Tips</span></el-divider>
                        <span>通关条件：收集足够多的信息，队伍的进度将显示在游戏界面上方</span><br/>
                        <span>游戏失败：当队伍体力值降为0，任务宣告失败。</span>



                    </div></div>
            </el-collapse-transition>
        </div>



    </div>
</template>

<script>
    import router from "../router"
    export default {
        name: "Hall",
        components: {
        },
        data() {
            return {
                show: false
            }

        },
        methods: {
            startGame() {
                router.push('Room')
            }
        }
    }
</script>

<style scoped>

.center{
    /**/
    text-align: center;
    padding: 10px 20px 10px 20px;
}

.div_center {
    margin: 20px auto;
}

.transition-box {
    margin-bottom: 10px;
    width: 100%;
    /*height: 400px;*/
    border-radius: 4px;
    /*background-color: #409EFF;*/
    text-align: center;
    color: #99a9bf;
    padding: 40px 20px;
    box-sizing: border-box;
    /*margin-right: 20px;*/
}

.header {
    color: #3a3939;
    font-size: 25px;
    text-align: center;
}

.smallheader {
    color:#3a3939;
    /*font-size: 20px;*/
    /*text-align: center;*/
}
</style>