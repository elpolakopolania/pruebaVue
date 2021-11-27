import ApiPermisos from '../../services/apiPermisos'

export default {
  namespaced: true,
  state: {
    loading: false,
    inscriptions: [],
    houses: [],
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

    setHouses: (state, houses) => {
      state.houses = [];
      state.houses = houses;
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
        let response = await ApiPermisos.getInscriptions(data);
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

    //Trae listado de las personas
    actGetHouses: async ({
      commit
    }) => {
        commit('setLoading', true);
        let response = await ApiPermisos.getHouses();
        if (response.error) {
          commit('setLoading', false);
            return response.error;
        }
        else{
          commit('setLoading', false);
          commit('setHouses', response);
        }
        return response;
    },

    
    
  },
}