import axios from 'axios'

const baseURL = 'localhost:3000'

axios.defaults.timeout = 10000
axios.defaults.baseURL = baseURL
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'

function post (url, params) {
    return axios.post(url, params)
}

function get (url, params) {
    return axios.get(url, params)
}

function login (parmas) {
    return post('/api/user/login', parmas)
}

function logout(params) {
    return post('/api/user/logout', params)
}

function modify(params) {
    return post('/api/user/info', params)
}

function getUserInfo(params) {
    return get('/api/user/info', params)
}

function uploadAvatar(params) {
    return post('/api/user/setProfilePhoto', params)
}



export default {
    login,modify,logout, getUserInfo, uploadAvatar
}

