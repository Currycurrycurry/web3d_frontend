import Cookies from 'js-cookie'
import api from '../../api'

const user = {
    state: {
        user_id: -1,
        token: Cookies.get('token'),
        username: '',
        email: '',
        fullName: '',
        age: '',
        gender: '',
        model: 0,
        region: '',
        isadmin: false
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
        SET_IS_ADMIN: (state, isadmin) => {
            state.isadmin = isadmin
        },
        LOGIN_SUCCESS: () => {
            console.log('login success')
        },
        LOGOUT_USER: state => {
            state.user_id = -1;
            state.username = '';
            state.token = '';
            state.email = '';
            state.gender = '';
            state.region = '';
            state.fullName = '';
            state.model = 0;
            state.age = '';
            state.isadmin = false;
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },

    },
    actions: {
        logout({commit}) {
            commit('LOGOUT_USER')
        },
        setUserInfo ({commit}) {
            return new Promise((resolve, reject) => {
                api.getUserInfo().then(response => {
                    commit('SET_USER_ID', response.data.content['id'])
                    commit('SET_USERNAME', response.data.content['username'])
                    commit('SET_MODEL', response.data.content['modelId'])
                    commit('SET_EMAIL', response.data.content['email'])
                    commit('SET_REGION', response.data.content['region'])
                    commit('SET_GENDER', response.data.content['gender'])
                    commit('SET_FULLNAME', response.data.content['fullname'])
                    commit('SET_AGE', response.data.content['age'])
                    commit('SET_TOKEN', Cookies.get('token'))
                    resolve(response)
                }).catch(error => {
                    console.log(error.response)
                    reject(error)
                })
            })
        },
        setIsAdmin({commit}, user_id) {
            return new Promise((resolve, reject) => {
                api.getIsAdmin({userId: user_id}).then(response => {
                    commit('SET_IS_ADMIN', response.data.content)
                    resolve(response)
                }).catch(error => {
                    console.log(error.response)
                    reject(error)
                })
            })
        },
        modify({commit}, model, email, region, gender, fullName, age) {
            commit('SET_MODEL', model)
            commit('SET_EMAIL', email)
            commit('SET_REGION', region)
            commit('SET_GENDER', gender)
            commit('SET_FULLNAME', fullName)
            commit('SET_AGE', age)
        },
        modifyModel({commit}, model) {
            commit('SET_MODEL', model)
        },
        modifyEmail({commit}, email) {
            commit('SET_EMAIL', email)
        },
        modifyRegion({commit}, region) {
            commit('SET_REGION', region)
        },
        modifyGender({commit}, gender) {
            commit('SET_GENDER', gender)
        },
        modifyFullname({commit}, fullName) {
            commit('SET_FULLNAME', fullName)
        },
        modifyAge({commit}, age) {
            commit('SET_AGE', age)
        },
    }
}

export default user
