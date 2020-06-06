import axios from 'axios'
// import store from '../store/store'
// const baseURL = 'http://122.51.160.221:8080'
// const gameURL = 'http://122.51.160.221:8080'
const baseURL = 'http://localhost:8080' //http://122.51.160.221:8080/welcome
const gameURL = 'http://localhost:8080'
axios.defaults.timeout = 10000
axios.defaults.baseURL = baseURL
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.get['Content-Type'] = 'application/json'
// axios.defaults.headers.post['jwt_token'] = store.getters.token // for POST requests
// console.log('in api index.js...');
// console.log("store's token is" + store.getters.token);
// if (store.getters.token) {
//     axios.defaults.headers.common['jwt_token'] = store.getters.token;
// }

// for all requests

function post(url, params) {
    return axios.post(url, params)
}

function get(url, params) {
    return axios.get(url, params)
}

function getNoArgs(url) {
    return axios.get(url)
}

// function put(url, params) {
//     return axios.put(url, params)
// }
//
// function deleteArgs(url, params) {
//     return axios.delete(url, params)
// }

function login (parmas) {
    return post('/login', parmas)
}

function register(params) {
    return post('/register', params)
}

function modify(params) {
    return post('/modifyInformation', params)
}

function getUserInfo(params) {
    return get('/getUserInfo', params)
}

// function uploadAvatar(params) {
//     return post('/api/user/setProfilePhoto', params)
// }



function findUserById(_params) {
    return get('/findUserById', {params: _params})
}

function getKnowlegeList(_params) {
    return get('/findKnowledgeByUserId', {params: _params})
}

// 待补充后端api
function getRecords(_params) {
    return get('findRecordsByUserId', {params: _params})
}

// function getModelIdByUserId(params) {
//     return get('', params)
// }


function getUserProgresses() {
    return getNoArgs('/getUserProgresses')
}

function getIsAdmin(_params) {
    return get('/getIsAdmin', {params: _params})
}

function getGameNums(_params) {
    return get('/getUserGameTimes', {params: _params})
}

function getUserInfos(_params) {
    return get('/getUserInfos', {params: _params})
}

function changeModel(params) {
    return post('/changeModel', params)
}

function getAllKnowledges() {
    return getNoArgs('/getAllKnowledge')
}

function addKnowledge(params) {
    return post('/addKnowledge', params)
}

function deleteKnowledge(params) {
    return post('/deleteKnowledge', params)
}

function modifyKnowledge(params) {
    return post('/modifyKnowledge', params)
}

function createRoom(_params) {
    return get('/initRoom', {params:_params})
}

function getRooms() {
    return getNoArgs('/getRoomInfo')
}


export default {
    // urls
    gameURL,

    // used
    login,
    modify,
    getUserInfo,
    register,
    findUserById,

    // 待补充后端api
    getRecords,
    getKnowlegeList,
    getUserProgresses,
    getIsAdmin,
    getGameNums,
    getUserInfos,
    // getModelIdByUserId,
    changeModel,
    getAllKnowledges,
    addKnowledge,
    deleteKnowledge,
    modifyKnowledge,

    createRoom,
    getRooms,



}

