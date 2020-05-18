<template>
    <div>
        <p id="question_content">1+1=?</p>
        <el-checkbox-group v-model="checkList">
            <el-checkbox label="复选框 A"></el-checkbox><br/>
            <el-checkbox label="复选框 B"></el-checkbox><br/>
            <el-checkbox label="复选框 C"></el-checkbox><br/>
            <el-checkbox label="复选框 D"></el-checkbox><br/>
        </el-checkbox-group>
    </div>

</template>

<script>
    // import { mapGetters } from 'vuex'
    // import api from '../api'
    // import store from '../store/store'

    export default {
        name: "Question",
        data () {
            return {
                checkList: ['复选框 A']
            };
        }
    }
</script>

<style scoped>

</style>