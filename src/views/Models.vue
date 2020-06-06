<template>
    <div class="wrap">
        <el-row>
            <span>当前玩家形象：{{name[model]}}</span> <!-- -->
            <model-obj :backgroundAlpha="0" :src="publicPath[model]" :mtl="publicPath2[model]" class="model"></model-obj>
        </el-row>

        <span>查看所有角色图鉴</span>
        <el-row>
            <el-col :span="10" key="0" :offset="2">
                <el-card>
                    <model-obj :backgroundAlpha="0" :src="publicPath[0]" :mtl="publicPath2[0]" class="model"></model-obj>
                    <div>
                        <span>{{name[0]}}</span>
                        <div class="bottom clearfix">
                            <el-popover
                                    placement="right"
                                    width="400"
                                    trigger="click" >
                                <el-table :data="gridData[0]">
                                    <el-table-column width="80" property="name" label="名称"></el-table-column>
                                    <el-table-column width="50" property="status" label="状态"></el-table-column>
                                    <el-table-column width="450" property="descr" label="描述"></el-table-column>
                                </el-table>
                                <el-button slot="reference" class="detail">细胞详细信息</el-button>
                            </el-popover>
                            <el-button type="text" class="button" @click="chooseCell(0)">选择细胞</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="10" key="1" :offset="2">
                <el-card>
                    <model-obj :backgroundAlpha="0" :src="publicPath[1]" :mtl="publicPath2[1]" class="model"></model-obj>
                    <div>
                        <span>{{name[1]}}</span>
                        <div class="bottom clearfix">
                            <el-popover
                                    placement="right"
                                    width="400"
                                    trigger="click" >
                                <el-table :data="gridData[1]">
                                    <el-table-column width="80" property="name" label="名称"></el-table-column>
                                    <el-table-column width="50" property="status" label="状态"></el-table-column>
                                    <el-table-column width="450" property="descr" label="描述"></el-table-column>
                                </el-table>
                                <el-button slot="reference" class="detail">细胞详细信息</el-button>
                            </el-popover>
                            <el-button type="text" class="button" @click="chooseCell(1)">选择细胞</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10" key="0" :offset="2">
                <el-card>
                    <model-obj :backgroundAlpha="0" :src="publicPath[2]" :mtl="publicPath2[2]" class="model"></model-obj>
                    <div>
                        <span>{{name[2]}}</span>
                        <div class="bottom clearfix">
                            <el-popover
                                    placement="right"
                                    width="400"
                                    trigger="click" >
                                <el-table :data="gridData[2]">
                                    <el-table-column width="80" property="name" label="名称"></el-table-column>
                                    <el-table-column width="50" property="status" label="状态"></el-table-column>
                                    <el-table-column width="450" property="descr" label="描述"></el-table-column>
                                </el-table>
                                <el-button slot="reference" class="detail">细胞详细信息</el-button>
                            </el-popover>
                            <el-button type="text" class="button" @click="chooseCell(2)">选择细胞</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="10" key="1" :offset="2">
                <el-card>
                    <model-obj :backgroundAlpha="0" :src="publicPath[3]" :mtl="publicPath2[3]" class="model"></model-obj>
                    <div>
                        <span>{{name[3]}}</span>
                        <div class="bottom clearfix">
                            <el-popover
                                    placement="right"
                                    width="400"
                                    trigger="click" >
                                <el-table :data="gridData[3]">
                                    <el-table-column width="80" property="name" label="名称"></el-table-column>
                                    <el-table-column width="50" property="status" label="状态"></el-table-column>
                                    <el-table-column width="450" property="descr" label="描述"></el-table-column>
                                </el-table>
                                <el-button slot="reference" class="detail">细胞详细信息</el-button>
                            </el-popover>
                            <el-button type="text" class="button" @click="chooseCell(3)">选择细胞</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10" key="0" :offset="2">
                <el-card>
                    <model-obj :backgroundAlpha="0" :src="publicPath[4]" :mtl="publicPath2[4]" class="model"></model-obj>
                    <div>
                        <span>{{name[4]}}</span>
                        <div class="bottom clearfix">
                            <el-popover
                                    placement="right"
                                    width="400"
                                    trigger="click" >
                                <el-table :data="gridData[4]">
                                    <el-table-column width="80" property="name" label="名称"></el-table-column>
                                    <el-table-column width="50" property="status" label="状态"></el-table-column>
                                    <el-table-column width="450" property="descr" label="描述"></el-table-column>
                                </el-table>
                                <el-button slot="reference" class="detail">细胞详细信息</el-button>
                            </el-popover>
                            <el-button type="text" class="button" @click="chooseCell(4)">选择细胞</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="10" key="1" :offset="2">
                <el-card>
                    <model-obj :backgroundAlpha="0" :src="publicPath[5]" :mtl="publicPath2[5]" class="model"></model-obj>
                    <div>
                        <span>{{name[5]}}</span>
                        <div class="bottom clearfix">
                            <el-popover
                                    placement="right"
                                    width="400"
                                    trigger="click" >
                                <el-table :data="gridData[5]">
                                    <el-table-column width="80" property="name" label="名称"></el-table-column>
                                    <el-table-column width="50" property="status" label="状态"></el-table-column>
                                    <el-table-column width="450" property="descr" label="描述"></el-table-column>
                                </el-table>
                                <el-button slot="reference" class="detail">细胞详细信息</el-button>
                            </el-popover>
                            <el-button type="text" class="button" @click="chooseCell(5)">选择细胞</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10" key="0" :offset="2">
                <el-card>
                    <model-obj :backgroundAlpha="0" :src="publicPath[6]" :mtl="publicPath2[6]" class="model"></model-obj>
                    <div>
                        <span>{{name[6]}}</span>
                        <div class="bottom clearfix">
                            <el-popover
                                    placement="right"
                                    width="400"
                                    trigger="click" >
                                <el-table :data="gridData[6]">
                                    <el-table-column width="80" property="name" label="名称"></el-table-column>
                                    <el-table-column width="50" property="status" label="状态"></el-table-column>
                                    <el-table-column width="450" property="descr" label="描述"></el-table-column>
                                </el-table>
                                <el-button slot="reference" class="detail">细胞详细信息</el-button>
                            </el-popover>
                            <el-button type="text" class="button" @click="chooseCell(6)" disabled>选择细胞</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="10" key="1" :offset="2">
                <el-card>
                    <model-obj :backgroundAlpha="0" :src="publicPath[7]" :mtl="publicPath2[7]" class="model"></model-obj>
                    <div>
                        <span>{{name[7]}}</span>
                        <div class="bottom clearfix">
                            <el-popover
                                    placement="right"
                                    width="400"
                                    trigger="click" >
                                <el-table :data="gridData[7]">
                                    <el-table-column width="80" property="name" label="名称"></el-table-column>
                                    <el-table-column width="50" property="status" label="状态"></el-table-column>
                                    <el-table-column width="450" property="descr" label="描述"></el-table-column>
                                </el-table>
                                <el-button slot="reference" class="detail">细胞详细信息</el-button>
                            </el-popover>
                            <el-button type="text" class="button" @click="chooseCell(7)" disabled>选择细胞</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>


</template>

<script>
    import {ModelObj} from 'vue-3d-model'
    import {mapGetters} from 'vuex'
    import store from '../store/store'
    import api from '../api'

    export default {
        name: 'Models',
        components: {ModelObj},
        created() {
            this.name = [
                'B细胞',
                '血小板',
                'T细胞',
                '神经细胞',
                '红血球',
                '抗体',
                '病毒',
                '肿瘤细胞'
            ]
            this.publicPath = [
                process.env.BASE_URL + 'models/cells/PJ模型/B细胞/B细胞.obj',
                process.env.BASE_URL + 'models/cells/PJ模型/血小板/血小板.obj',
                process.env.BASE_URL + 'models/cells/PJ模型/T细胞/T细胞.obj',
                process.env.BASE_URL + 'models/cells/PJ模型/神经元/神经元.obj',
                process.env.BASE_URL + 'models/cells/PJ模型/红血球/红血球.obj',
                process.env.BASE_URL + 'models/cells/PJ模型/抗体/huoxingxibao1.obj',
                process.env.BASE_URL + 'models/cells/PJ模型/病毒/病毒.obj',
                process.env.BASE_URL + 'models/cells/PJ模型/肿瘤细胞/肿瘤细胞.obj',
            ];
            this.publicPath2 = [
                process.env.BASE_URL + 'models/cells/PJ模型//B细胞/B细胞.mtl',
                process.env.BASE_URL + 'models/cells/PJ模型/血小板/血小板.mtl',
                process.env.BASE_URL + 'models/cells/PJ模型/T细胞/T细胞.mtl',
                process.env.BASE_URL + 'models/cells/PJ模型/神经元/神经元.mtl',
                process.env.BASE_URL + 'models/cells/PJ模型/红血球/红血球.mtl',
                process.env.BASE_URL + 'models/cells/PJ模型/抗体/huoxingxibao1.mtl',
                process.env.BASE_URL + 'models/cells/PJ模型/病毒/病毒.mtl',
                process.env.BASE_URL + 'models/cells/PJ模型/肿瘤细胞/肿瘤细胞.mtl',
            ];

            this.info = ['骨髓依赖性淋巴细胞简称B细胞，是由骨髓中的淋巴干细胞分化而来。与T淋巴细胞相比，它的体积略大。这种淋巴细胞受抗原刺激后，会增殖分化出大量浆细胞。浆细胞可合成和分泌抗体并在血液中循环。',
                '血小板只存在于哺乳动物血液中，是哺乳动物血液中的有形成分之一。血小板的主要功能是凝血和止血，修补破损的血管。',
                'T细胞是淋巴细胞的主要组分，它具有多种生物学功能，如直接杀伤靶细胞，辅助或抑制B细胞产生抗体，对特异性抗原和促有丝分裂原的应答反应以及产生细胞因子等，是身体中抵御疾病感染、肿瘤形成的英勇斗士。',
                '神经细胞是一种高度特化的细胞，是神经系统的基本结构和功能单位之一，它具有感受刺激和传导兴奋的功能',
                '红血球又称为红血球或血红细胞，是血液中数量最多的一种血球，同时也是脊椎动物体内通过血液将氧气从肺或鰓运送到身体各个組织的最主要的媒介。',
                '抗体是一类能与抗原特异性结合的免疫球蛋白。',
                '病毒是由一个核酸分子（DNA或RNA）与蛋白质构成的非细胞形态，为类生物，无法自行表现出生命现象，靠寄生生活的介于生命体及非生命体之间的有机物种',
                '肿瘤细胞实质就是肿瘤。肿瘤组织由实质和间质两部分构成，肿瘤实质是肿瘤细胞，是肿瘤的主要成分，具有组织来源特异性。它决定肿瘤的生物学特点以及每种肿瘤的特殊性。'
            ]
            this.gridData = [
                [{
                    'name': this.name[0],
                    'status': "启用",
                    'descr': this.info[0]
                }],
                [{
                    'name': this.name[1],
                    'status': "启用",
                    'descr': this.info[1]
                }],
                [{
                    'name': this.name[2],
                    'status': "启用",
                    'descr': this.info[2]
                }],
                [{
                    'name': this.name[3],
                    'status': "启用",
                    'descr': this.info[3]
                }],
                [{
                    'name': this.name[4],
                    'status': "启用",
                    'descr': this.info[4]
                }],
                [{
                    'name': this.name[5],
                    'status': "启用",
                    'descr': this.info[5]
                }],
                [{
                    'name': this.name[6],
                    'status': "禁用",
                    'descr': this.info[6]
                }],
                [{
                    'name': this.name[7],
                    'status': "禁用",
                    'descr': this.info[7]
                }]
            ]


        },
        computed: {
            ...mapGetters([
                'model'
            ])
        },
        data() {
            return {
                cellDict: [
                    {
                        name:'',
                        pathObj: process.env.BASE_URL + 'models/cells/0.obj',
                        pathMtl: process.env.BASE_URL + 'models/cells/0.mtl',
                        descr:'',
                        status:''
                    },
                    {
                        name:'',
                        pathObj: process.env.BASE_URL + 'models/cells/1.obj',
                        pathMtl: process.env.BASE_URL + 'models/cells/1.mtl',
                        descr:'',
                        status:''
                    },
                    {
                        name:'',
                        pathObj: process.env.BASE_URL + 'models/cells/2.obj',
                        pathMtl: process.env.BASE_URL + 'models/cells/2.mtl',
                        descr:'',
                        status:''
                    },
                    {
                        name:'',
                        pathObj: process.env.BASE_URL + 'models/cells/3.obj',
                        pathMtl: process.env.BASE_URL + 'models/cells/3.mtl',
                        descr:'',
                        status:''
                    },

                ],
                publicPath: [],
                publicPath2: [],
                name:[],
                info: [],
                gridData : []
            }
        },


        methods: {
            chooseCell(model_id) {
                let user_id = store.getters.user_id;
                api.changeModel({modelId: model_id, userId: user_id}).then(response => {
                    if (response.status === 200) {
                        if (response.data.code === 200) {
                            console.log('success')
                            this.$message({
                                message: '更换成功',
                                type: 'success'
                            });
                            store.dispatch('modifyModel', model_id)
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
    wrap {
        width:100%;
    }
    el-row {
        padding: 10px;
        margin: 10px;
        width:100%;
    }
    .detail {
        font-size: 13px;
        color: #99a9bf;
    }
    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .model {
        width: 100%;
        display: block;
    }

    /*.clearfix:before,*/
    /*.clearfix:after {*/
    /*    display: table;*/
    /*    content: '';*/
    /*}*/

    .clearfix:after {
        clear: both
    }

</style>