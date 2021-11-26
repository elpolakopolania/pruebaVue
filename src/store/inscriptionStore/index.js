import ApiPermisos from '../../services/apiPermisos'

export default {
  namespaced: true,
  state: {
    loading: false,
    inscriptions: []
  },
  getters: {
    getInscriptions:(state)=>{
      return state.inscriptions;
    }    
  },
  mutations: {
    setInscriptions: (state, inscriptions) => {
      state.inscriptions = [];
      state.inscriptions = inscriptions;
    },

    setLoading: (state, loading) => {
      state.loading = loading;
    },
    
  },
  actions: {    
     //Trae listado de las personas
    actGetInscriptions: async ({
      commit
    }, data) => {
        commit('setLoading', true);
        let response = await ApiPermisos.getInscription(data);
        if (response.error) {
          commit('setLoading', false);
            return response.error;
        }
        else{
          commit('setLoading', false);
          commit('setInscriptions', response);
        }
        return response;
    },

    
    
  },
}