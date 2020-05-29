<template>
    <!--    @on-load="onLoad"-->
    <!--    <model-three :backgroundAlpha="0" :src="model"></model-three>-->
    <div>
        <span>当前玩家所选模型：{{modelName}}</span>
        <model-obj :backgroundAlpha="0" :src="publicPath"></model-obj>
    </div>


</template>

<script>
    import {ModelObj} from 'vue-3d-model'
    import {mapGetters} from 'vuex'

    export default {
        name: 'Models',
        components: {ModelObj},
        data() {
            return {
                publicPath: process.env.BASE_URL + 'models/cells/Cells.obj', // TODO 模型压缩 根据用户id获取对应model
                modelName: ''
            }
        },
        computed: {
            ...mapGetters([
                'model'
            ])
        }
    }
</script>

<style scoped>

</style>