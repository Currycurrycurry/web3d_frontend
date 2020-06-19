<template>
    <div class="wrap" ref="scroll">
<!--        <span>房间号：{{roomID}}</span>-->
        <span><el-button @click="leaveRoom()" type="text">离开房间</el-button></span>

        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                >
            <span>离开房间将退出游戏，是否确定离开房间？</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="quitGame">确 定</el-button>
  </span>
        </el-dialog>

        <iframe src="game/main/src/main.html" frameborder="0" scrolling="auto" height="500px" width="1200px" style="margin: 30px auto;"></iframe>
        <div class="chatting">
<!--        <el-row>-->
<!--            <el-col :span="24">-->
<!--                <div class="message-list">-->
<!--                    <div v-for="(item, index)  in messageList" :key='index'>-->

<!--&lt;!&ndash;                        <div class="row-left">&ndash;&gt;-->

<!--&lt;!&ndash;                            <div class="left-user">curry</div>说：&ndash;&gt;-->
<!--&lt;!&ndash;                            <div class="left-text">123</div>&ndash;&gt;-->
<!--&lt;!&ndash;                        </div>&ndash;&gt;-->
<!--&lt;!&ndash;                        <div class="row-right">&ndash;&gt;-->
<!--&lt;!&ndash;                            <div class="right-text">123</div>&ndash;&gt;-->
<!--&lt;!&ndash;                        </div>&ndash;&gt;-->
<!--&lt;!&ndash;                        <div class="row-center">&ndash;&gt;-->
<!--&lt;!&ndash;                            <span class="tip">用户 xxx 进入房间</span>&ndash;&gt;-->
<!--&lt;!&ndash;                        </div>&ndash;&gt;-->

<!--                        <div v-if="item.type === 0" class="row-left">-->
<!--                            <div class="left-text">{{item.msgUser.username}}:{{item.msg}}</div>-->
<!--                        </div>-->
<!--                        <div v-if="item.type === 1" class="row-right">-->
<!--                            <div class="right-text">{{item.msg}}</div>-->
<!--                        </div>-->
<!--                        <div v-if="item.type === 2" class="row-center">-->
<!--                            <span class="tip">{{item.msg}}}</span>-->
<!--                        </div>-->
<!--                </div>-->
<!--                </div>-->
<!--            </el-col>-->
<!--        </el-row>-->
        <el-row style="width:100%">
            <el-col :span="20">
                <div>
                    <el-input
                            type="text"
                            placeholder="请输入内容"
                            v-model="inputValue"
                            @keyup.enter="send"
                            maxlength="20"
                            show-word-limit>
                    </el-input>

                </div>
            </el-col>
            <el-col :span="4"><el-button type="primary" @click="send">发 送</el-button></el-col>
        </el-row>
        </div>
    </div>
</template>

<script>
    import SockJS from "sockjs-client";
    import Stomp from "stompjs";
    import { mapGetters } from 'vuex'
    import Cookies from 'js-cookie'
    import api from '../api'
    export default {
        name: "Chatting",
        data() {
            return {
                onlineUserList: {},
                inputValue: '',
                messageList:[],
                chat_socket: null,
                roomID: Cookies.get('roomID'),
                msgUrl: '/topic/' +  Cookies.get('roomID') +'/toAll',
                startUrl: '/topic/' + Cookies.get('roomID') + '/startChat',
                overUrl: '/topic/' +  Cookies.get('roomID') + '/gameOver',
                quitUrl: '/topic/' + Cookies.get('roomID') + '/userQuit',
                dialogVisible: false
            }
        },
        created () {
            this.msgUrl = '/topic/' +  Cookies.get('roomID') +'/toAll';
            this.startUrl = '/topic/' + Cookies.get('roomID') + '/startChat';
            this.overUrl = '/topic/' +  Cookies.get('roomID') + '/gameOver';
            this.quitUrl = '/topic/' + Cookies.get('roomID') + '/userQuit';
            console.log(this.msgUrl);
            console.log(this.startUrl);
            console.log(this.overUrl);
            console.log(this.quitUrl);
            this.messageList = []
            console.log('start mounting...')
            // let socket = new SockJS('http://localhost:8080/ws');
            let socket = new SockJS('http://122.51.160.221:8080/ws');
            this.chat_socket = Stomp.over(socket);
            console.log('finish')
            function sleep (time) {
                return new Promise((resolve) => setTimeout(resolve, time));
            } // TODO
            sleep(10000).then(() => {
                this.join()
            })
            let self = this

            // sleep(500).then(() => {
                // 这里写sleep之后需要去做的事情
                this.chat_socket.connect({}, function() {
                    console.log('connect to the ws..');
                    this.subscribe( '/topic/' + Cookies.get('roomID') + '/startChat', function () {
                        // let obj_ = JSON.parse(obj.body);
                        // let userID = obj_.content['newUser'].id;
                        // let userName = obj_.content['newUser'].username;
                        // console.log('join: ' + userID)
                        // let otherUserUsername = ''
                        // otherUserUsername = userName
                        // self.onlineUserList[userID] = {_username: otherUserUsername}
                        // self.messageList.push({type: 2, msg: '用户 ' + otherUserUsername + ' 加入聊天', msgUser: null})
                        // self.$message('') TODO 看情况要不要加
                    })
                    this.subscribe('/topic/' +  Cookies.get('roomID') +'/toAll', function (obj) {
                        console.log('enter into toALL sub');
                        console.log('obj body is ' + obj.body);
                        let obj_ = JSON.parse(obj.body);
                        let userID = obj_.fromId;
                        console.log('user id is ' + userID)
                        let msg = obj_.content
                        console.log('obj msg is ' + msg)
                        let fromName = obj_.fromName;
                        // let user = self.onlineUserList[userID]
                        // if (user === undefined) {
                            console.log('user undefined...')
                            self.joined(userID).then(() => {
                            // self.joined(userID)
                            // user = self.onlineUserList[userID]
                            // self.putMessage(user._username, msg, 1);
                            self.$message({
                                message: fromName + "说：" + msg,
                                duration: 2000,
                                offset: 100
                            })
                            })
                        // } else {
                        //     if (userID === self.user_id) {
                                // self.putMessage(self.username, msg, 1)
                                // self.$message(fromName + "说：" + msg)
                            // } else {
                            //     // self.putMessage(user._username, msg, 0)
                            //     self.$message(self._username + "进入游戏");
                            // }
                        // }
                    })

                    this.subscribe('/topic/' +  Cookies.get('roomID') + '/gameOver', function(obj) {
                        console.log('enter the game over method');
                        console.log('obj body is ' + obj.body);
                        // let obj_ = JSON.parse(obj.body);
                        self.$message.success("本房间结束游戏！");
                    })

                    this.subscribe('/topic/' + Cookies.get('roomID') + '/userQuit', function(obj) {
                        console.log('enter the user quit method');
                        console.log('obj body is ' + obj.body);
                        let user_id = obj.content.id;
                        self.messageList.push({
                            type: 2,
                            msg: '用户 ' + self.onlineUserList[user_id]._username + ' 退出聊天',
                            msgUser: null
                        })
                        delete self.onlineUserList[user_id]
                        // let obj_ = JSON.parse(obj.body);
                        self.$message.success("本房间结束游戏！");
                    })

                });
        },
        updated() {
            this.scroll()
        },
        computed: {
            ...mapGetters([
                'user_id',
                'username'
            ])
        },
        ready() {
            window.onbeforeunload = function (e) {
                alert('退出游戏')
                self.handleWindowClose();
                e = e || window.event;
                // 兼容IE8和Firefox 4之前的版本
                if (e) {
                    e.returnValue = '关闭提示';
                }
                // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
                return '关闭提示';
            };
        },
        methods: {
            join () {
                // let msg = {
                //     'x': 0,
                //     'y': 0,
                //     'z': 0,
                //     'rotation':0.0,
                //     'objectId': this.user_id,
                //     'roomId': parseInt(this.roomID)
                //     // 'objectId': 2
                // }
                // console.log(msg.roomId)
                // console.log('msg is ' + msg)
                // this.chat_socket.send('/app/connectToServer', {},
                // JSON.stringify(msg))
            },
            send () {
                this.message = this.trim(this.inputValue)
                let msg = {
                    'toId': -1,
                    'fromId': this.user_id,
                    'content':this.message,
                    'roomId': parseInt(this.roomID)
                }
                if (this.message.length > 0) {
                    this.chat_socket.send('/app/chatMessageToAll', {}, JSON.stringify(msg))
                    this.inputValue=''
                }
            },
            trim (s) {
                return s.replace(/(^\s*)|(\s*$)/g, '')
            },
            scroll () {
                this.$refs.scroll.scrollTop = this.$refs.scrollHeight
            },
            pushUsers (userID) {
                let otherUserUsername = ''
                api.findUserById({userId: userID}).then(response => {
                    otherUserUsername = response.data['username']
                    this.onlineUserList[userID] = {_username: otherUserUsername}
                }).catch(error => console.log(error))
            },
            popUsers (userID) {
                delete this.onlineUserList[userID]
            },
            joined (userID) {
                // this.onlineUserList[userID] = {_username: "test"};
                return new Promise((resolve, reject) => {
                    let otherUserUsername = ''
                    api.findUserById({userId: userID}).then(response => {
                        otherUserUsername = response.data['username']
                        this.onlineUserList[userID] = {_username: otherUserUsername}
                        resolve(response)
                    }).catch(error => {
                        console.log(error.response)
                        reject(error)
                    })
                })
            },
            putMessage (username, msg, type) {
                console.log('msg putting...')
                console.log('username is ' + username)
                console.log('type is ' + type)
                console.log('msg is ' + msg)
                this.messageList.push({
                    type: type,
                    msg: msg,
                    msgUser: {
                        username: username,
                    }
                })
            },

            leaveRoom() {
                this.dialogVisible = true;
            },


            quitGame() {
                let msg = {
                    'objectId': this.user_id,
                }
                this.chat_socket.send('/app/quitGame', {}, JSON.stringify(msg))

                this.$router.push({
                    path: '/room'
                })
            },

            handleWindowClose() {
                this.quitGame()
            }
        }

    }
</script>

<style scoped>
    .message-list {
        flex: 1;
    }

    .row-right {
        display: flex;
        flex-direction: row-reverse;
    }

    .row-center {
        display: flex;
        justify-content: center;
    }

    .row-left {
        display: flex;
        justify-content: flex-start;
    }

    .tip {
        padding: 3px 6px;
        margin: 2px 3px;
        border-radius: 2px;
        background: rgba(0, 0, 0, 0.2);
        color: #fff;
        font-size: 12px;
        line-height: 12px;
    }

    .left-text {
        color: #409EFF;
    }

    .left-user {
        text-align: left;
        margin-bottom: 5px;
        margin-left: 5px;
        /*font-size: 12px;*/
        color: #aaa;
        /*line-height: 12px;*/
    }

    .wrap {
        display: flex;
        min-height: 100px;
        flex-direction: column;
    }

    .chatting {
        margin: 0 auto;
    }




</style>