import axios from 'axios'

const baseURL = 'http://localhost:8080'

axios.defaults.timeout = 10000
axios.defaults.baseURL = baseURL
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.get['Content-Type'] = 'application/json'

function post (url, params) {
    return axios.post(url, params)
}

function get (url, params) {
    return axios.get(url, params)
}

function getNoArgs(url) {
    return axios.get(url)
}

function login (parmas) {
    return post('/login', parmas)
}

function logout(params) {
    return post('/logout', params)
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

function uploadAvatar(params) {
    return post('/api/user/setProfilePhoto', params)
}

function getRecords() {
    return getNoArgs('/user/records')
}


export default {
    login,modify,logout, getUserInfo, uploadAvatar, register, getRecords
}

