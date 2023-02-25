export default {
  state: {
    hospitalDetail:null,
    myPosition: null
  },
  getters: {
    getHospitalDetail (state) {
      return state.hospitalDetail;
    }, 
    // 位置信息
    myPosition (state) {
      return state.myPosition;
    }, 
   
  },
  mutations: {
    setHospitalDetail (state, data) {
      state.hospitalDetail = data;
    },

    setMyPosition (state, data) {
      state.myPosition = data;
    },
    
    deleteHospitalDetail (state) {
      state.hospitalDetail = null
    }
  },
  actions: {
    setHospitalDetail ({ commit }, data) {
      commit('setHospitalDetail', data);
    },
    setMyPosition ({ commit }, data) {
      commit('setMyPosition', data);
    },
    deleteHospitalDetail ({ commit }) {
      commit('deleteHospitalDetail');
    }
  }
}