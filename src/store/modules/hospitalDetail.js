export default {
  state: {
    hospitalDetail:null
  },
  getters: {
    getHospitalDetail (state) {
      return state.HospitalDetail;
    }, 
   
  },
  mutations: {
    setHospitalDetail (state, data) {
      state.hospitalDetail = data;
    },
    
    deleteHospitalDetail (state) {
      state.hospitalDetail = null
    }
  },
  actions: {
    setHospitalDetail ({ commit }, data) {
      commit('setHospitalDetail', data);
    },
    deleteHospitalDetail ({ commit }) {
      commit('deleteHospitalDetail');
    }
  }
}