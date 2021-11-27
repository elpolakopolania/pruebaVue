import ApiPermisos from '../../services/apiPermisos'

export default {
  namespaced: true,
  state: {
    loading: false,
    loadingSave: false,
    loadingUpdate: false,
    loadingDelete: false,
    size: 10,
    pagina: 1,
    inscriptions: {
      data: [],
      per_page: null,
      total: null,
      last_page: null
    },
    houses: [],
    inscriptionsSelected: {
      id: null,
      name: null,
      lastname: null,
      identification: null,
      age: null,
      house:null
    }
  },
  getters: {
    getInscriptions:(state)=>{
      return state.inscriptions;
    },

    getInscriptionsSelected:(state)=>{
      return state.inscriptionsSelected;
    }
  },
  mutations: {
    setPagina(state, pagina){
      state.pagina = [];
      state.pagina = pagina;
    },
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

    setLoadingSave: (state, loadingSave) => {
      state.loadingSave = loadingSave;
    },

    setLoadingUpdate: (state, loadingUpdate) => {
      state.loadingUpdate = loadingUpdate;
    },

    setLoadingDelete: (state, loadingDelete) => {
      state.loadingDelete = loadingDelete;
    },

    setInscriptionsSelected: (state, inscriptionsSelected) => {
      state.inscriptionsSelected = inscriptionsSelected;
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


    //Guardar una nueva suscription
    actSaveInscription: async ({
      commit
    },data) => {
        commit('setLoadingSave', true);
        try {
          let response = await ApiPermisos.setInscription(data);
          commit('setLoadingSave', false);
          return response;
        } catch (error) {
          commit('setLoadingSave', false);
          return false;
        }
    },

    //Actualiza una suscription
    actUpdateInscription: async ({
      commit
    },data) => {
        commit('loadingSave', true);
        let id = data.id;
        delete data.id;
        try {
          let response = await ApiPermisos.updateInscription(data, id);  
          commit('loadingSave', false);
          return response;
        } catch (error) {
          commit('loadingSave', false);
          return false;
        }
        
    },

    actDeleteInscription: async ({
      commit
    },id) => {
        commit('setLoadingDelete', true);
        try {
          let response = await ApiPermisos.deleteInscription(id);  
          commit('setLoadingDelete', false);
          return response;
        } catch (error) {
          commit('setLoadingDelete', false);
          return false;
        }
        
    },

    // Setear la inscription seleccionada
    actSetInscriptionSelected: async ({
      commit
    },data) => {
        commit('setLoading', true);
        commit('setInscriptionsSelected', data);        
        commit('setLoading', false);
        return data;
    },

     // Setear la página
     actSetPagina: async ({
      commit
    },data) => {
        commit('setLoading', true);
        commit('setPagina', data);        
        commit('setLoading', false);
        return data;
    },

    
    
  },
}