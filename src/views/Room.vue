<template>
    <div>
        <span class="organized" @click="return2Hall()"><el-button type="text"><i class="el-icon-arrow-left"/>返回</el-button></span>
        <span class="organized"><el-button @click="dialogFormVisible = true" type="text">创建房间</el-button></span>


        <el-dialog title="房间信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="房间名称" :label-width="formLabelWidth">
                    <el-input v-model="form.roomName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="房间人数" :label-width="formLabelWidth">
                    <el-select v-model="form.userNum" placeholder="请选择房间人数上限">
                        <el-option :label="index" :value="index" v-for="(index) in 5" v-bind:key="index"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="createRoomAndStartGame()">确 定</el-button>
            </div>
        </el-dialog>


        <span><el-button type="text" @click="startEnterRandomRoom()">随机加入房间</el-button></span>
        <el-dialog title="房间信息" :visible.sync="dialogTableVisible">
            <el-table :data="gridData">
                <el-table-column property="roomID" label="房间号" width="150"></el-table-column>
                <el-table-column property="roomName" label="房间名称" width="200"></el-table-column>
                <el-table-column property="players_str" label="玩家列表"></el-table-column>
            </el-table>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="enterRandomRoom()">加 入</el-button>
            </div>
        </el-dialog>

        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    label="创建时间"
                    width="200">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="房间名称"
                    width="180">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>房间ID: {{ scope.row.roomID }}</p>
                        <p>玩家列表: {{ scope.row.players_str }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                    label="房间人数"
                    width="180">
                <template slot-scope="scope">
                    <i class="el-icon-user"></i>
                    <span style="margin-left: 10px">{{ scope.row.playerNum }} / 5</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="enterCertainRoom(scope.row.roomID)">加入房间</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    label="游戏状态"
                    width="180">
                <template slot-scope="scope">
                    <i class="el-icon-user-solid"></i>
                    <span style="margin-left: 10px">{{ scope.row.status }}</span>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    import SockJS from "sockjs-client";
    import Stomp from "stompjs";
    import api from '../api/'
    import Cookies from 'js-cookie'
    // import { mapGetters } from 'vuex'
    export default {
        name: "Room",
        data() {
            return {
                gameLink:'',
                tableData: [
                    {
                    date: '06-02 20:00:59',
                    roomID: '1',
                    players_str: '12,13,14',
                    playerNum: 5,
                    name: '随机创建的Demo房间',
                    status: '游戏中'
                }
                ],
                gridData: [
                ],
                dialogTableVisible: false,
                dialogFormVisible: false,
                form: {
                    roomName: '',
                    userNum: '',
                },
                formLabelWidth: '120px',
                room_socket: null
            }
        },
        created() {
            this.gameLink = api.gameURL;
            console.log('start mounting...')
            let socket = new SockJS('http://localhost:8080/ws');
            this.room_socket = Stomp.over(socket);
            console.log('finish')

            // this.room_socket.connect({}, function() {
            //     this.subscribe('/room/join', function (success, users) {
            //         if (success) {
            //             for (let user of users) {
            //
            //             }
            //         }
            //
            //
            //
            //     })
            //
            // })

        },
        mounted() {
            this.getRooms()

        },
        methods: {
            getRooms() {
                console.log('get rooms...')
                api.getRooms().then(response => {
                    if (response.status === 200) {
                        if (response.data.code === 200) {
                            let data = response.data.content;
                            let len = data.length;
                            for (var i = 0;i < len;i ++) {
                                let players = data[i]['usernames']
                                let players_s = players.length > 0 ? players.join() : '暂无玩家';
                                this.tableData.push({
                                    date: data[i]['date'],
                                    roomID: data[i]['id'],
                                    players_str: players_s,
                                    playerNum: data[i]['playerNum'],
                                    name:  (data[i]['name'])?data[i]['name'] :"未命名房间",
                                    status: data[i]['status']
                                    })

                            }
                        }
                    }
                })
            },
            enterCertainRoom(roomID) {
                console.log('try to enter the room ' + roomID)
                this.$message('进入房间' + roomID + '...');
                this.startGame(roomID)

            },
            createRoomAndStartGame() {
                this.dialogFormVisible = false;
                api.createRoom({name: this.form.roomName}).then(response => {
                    if (response.status === 200) {
                        if (response.data.code === 200) {
                            // let content = response.data.content;
                            this.$message.success("创建成功,进入游戏...");
                            let data = response.data.content;
                            let roomID = data['id'];
                            this.startGame(roomID);
                        }
                    } else {
                        console.log('error')
                    }
                }).catch(err => {
                    console.log(err.response)
                })
                this.startGame();
            },
            startGame(roomID) {
                // window.location.href = this.gameLink + '/?roomID='+roomID;
                // window.location.replace(this.gameLink + '/?roomID='+roomID);
                // // TODO 使用 window.open(url)实现边聊天边玩游戏
                Cookies.set('roomID', roomID);
                this.$router.push({
                    path: '/chatRoom'
                })

            },
            return2Hall() {
                this.$router.push({
                    path: '/hall'
                })
            },
            startEnterRandomRoom() {
                this.dialogTableVisible = true;
                let random_num = (Math.round(Math.random() * this.tableData.length));
                this.gridData = []
                this.gridData.push({
                    roomID: this.tableData[random_num]['roomID'],
                    roomName: this.tableData[random_num]['name'],
                    player_str: this.tableData[random_num]['players_str']
                })
            },
            enterRandomRoom() {
                this.dialogTableVisible =false;
                this.startGame(this.gridData['roomID'])
            },
        }
    }

</script>

<style scoped>
    .organized {
        padding: 20px 20px;
        margin: 0 auto;
    }

</style>