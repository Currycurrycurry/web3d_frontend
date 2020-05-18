<template>
    <div>
        <NavMenu/>
        <el-button type="primary" icon="el-icon-upload" @click="startGame">开始游戏</el-button>
    </div>

</template>

<script>
    import NavMenu from "../components/NavMenu";
    import router from "../router"

    export default {
        name: "Hall",
        components: {NavMenu},
        methods: {
            startGame() {
                router.push('room')
            }
        }
    }
</script>

<style scoped>

</style>