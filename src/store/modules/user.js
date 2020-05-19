import Cookies from 'js-cookie'
// import { formatDate } from '../../utils'
import api from '../../api'

const user = {
    state: {
        user_id: '-1',
        token: Cookies.get('token'),
        username: '',
        email: 'jokernini@qq.com',
        fullName: 'curry',
        age: '20',
        gender: '女',
        model: 'none',
        region: '上海'
    },

    mutations: {
        SET_USER_ID: (state, user_id) => {
            state.user_id = user_id
        },
        SET_USERNAME: (state, username) => {
            state.username = username
        },
        SET_MODEL: (state, model_url) => {
            state.model = model_url
        },
        SET_EMAIL: (state, email) => {
            state.email = email
        },
        SET_REGION: (state, region) => {
            state.region = region
        },
        SET_GENDER: (state, gender) => {
            state.gender = gender
        },
        SET_FULLNAME: (state, fullname) => {
            state.fullName = fullname
        },
        SET_AGE: (state, age) => {
            state.age = age
        },
        LOGIN_SUCCESS: () => {
            console.log('login success')
        },
        LOGOUT_USER: state => {
            state.user = ''
        }
    },
    actions: {
        setUserInfo ({commit}) {
            return new Promise((resolve, reject) => {
                api.getUserInfo().then(response => {
                    commit('SET_USER_ID', response.data.content['id'])
                    commit('SET_USERNAME', response.data.content['username'])
                    commit('SET_MODEL', response.data.content['model_id']) // TODO
                    commit('SET_EMAIL', response.data.content['email'])
                    commit('SET_REGION', response.data.content['region'])
                    commit('SET_GENDER', response.data.content['gender'])
                    commit('SET_FULLNAME', response.data.content['fullname'])
                    commit('SET_AGE', response.data.content['age'])
                    resolve(response)
                }).catch(error => {
                    console.log(error.response)
                    reject(error)
                })
            })
        }
    }
}

export default user
