import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import question from './modules/question'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,
        question,
    },
    getters
})

export default store

