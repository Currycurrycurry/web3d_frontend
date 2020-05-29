import axios from 'axios'
// import store from '../store/store'
const baseURL = 'http://localhost:8080'

axios.defaults.timeout = 10000
axios.defaults.baseURL = baseURL
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.get['Content-Type'] = 'application/json'
// axios.defaults.headers.post['jwt_token'] = store.getters.token // for POST requests
console.log('in api index.js...');
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

function getRecords() {
    return getNoArgs('/user/records')
}

// TODO get or post
function findUserById(params) {
    return get('/findUserById', params)
}

function getKnowlegeList(params) {
    return get('/findKnowledgeByUserId', params)
}


// 待补充后端api
function getUserProgresses(params) {
    return get('', params)
}

function getIsAdmin(params) {
    return get('', params)
}

function getGameNums(params) {
    return get('', params)
}

function getUserInfos(params) {
    return get('', params)
}


export default {
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
    getUserInfos


}

