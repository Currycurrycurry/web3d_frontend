<template>
<!--    @on-load="onLoad"-->
<!--    <model-three :backgroundAlpha="0" :src="model"></model-three>-->
    <model-obj :backgroundAlpha="0" :src="publicPath"></model-obj>

</template>

<script>
    import { ModelObj } from 'vue-3d-model'
    import { mapGetters } from 'vuex'

    export default {
        name: 'Models',
        components: { ModelObj },
        data() {
            return {
                publicPath: process.env.BASE_URL + 'models/cells/Cells.obj'
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