import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import shoppingCart from './modules/shoppingCart'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,
        shoppingCart
    },
    getters
})

export default store