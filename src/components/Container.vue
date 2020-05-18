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

        <el-container>
            <Footer/>
        </el-container>

    </div>
</template>

<script>
    import Aside from "./Aside";
    import Header from "./Header";
    import NavMenu from "./NavMenu";
    import Top from "./Top"
    import Footer from "./Footer";
    export default {
        name: "Container",
        components: {Footer, NavMenu, Header, Aside, Top},
        computed: {
            name() {
                return this.$route.name
            },
            list() {
                return this.$route.matched
            }
        },
        methods: {
            error(message) {
                this.$message.error(message)
            },
            success(message) {
                this.$message.success(message)
            }
        }
    }

</script>

<style scoped>

</style>