import Cookies from 'js-cookie'
// import { formatDate } from '../../utils'
import api from '../../api'

const user = {
    state: {
        token: Cookies.get('token'),
        username: '', // username
        avatar: 'public/images/avatar/django.svg', //headProfilePath
        email: '',
        fullName: '',
        age: '',
        gender: '',
        authority: '',
        model: 'none',
        region: ''
    },

    mutations: {
        SET_USERNAME: (state, username) => {
            state.username = username
        },
        SET_AVATAR: (state, avatar_url) => {
            state.avatar = avatar_url
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
        SET_AUTHORITY: (state, authority) => {
            state.authority = authority
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
                    commit('SET_USERNAME', response.data.content['username'])
                    commit('SET_AVATAR', response.data.content['headProfilePath'])
                    commit('SET_MODEL', response.data.content['modelPath'])
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
