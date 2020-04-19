<template>
    <div class="app">
        <el-container style="height: 500px; border: 1px solid #eee">
            <Aside/>
        </el-container>

        <el-container>
            <Top/>
            <NavMenu/>
            <Header/>
        </el-container>

        <el-container>
            <router-view></router-view>
        </el-container>

    </div>
</template>

<script>
    import Aside from "./Aside";
    import Header from "./Header";
    import NavMenu from "./NavMenu";
    export default {
        name: "Container",
        components: {NavMenu, Header, Aside}
    }
</script>

<style scoped>

</style>