import AxiosPermisos from './axiosPermisos'

// Todas las API y URL
const uri = {
  getInscription: '/inscriptions/pageable',
  getHouses: '/inscriptions/houses',
  setInscription: '/inscriptions',
}



// Todos los servicios
export default {
 
  getInscriptions: async (data) => {
    return await AxiosPermisos.get(uri.getInscription+"?page="+data.page+"&size="+data.size);
  },

  getHouses: async () => {
    return await AxiosPermisos.get(uri.getHouses);
  },

  setInscription: async (data) => {
    return await AxiosPermisos.post(uri.setInscription + '/', data);
  },

  updateInscription: async (data, id) => {
    return await AxiosPermisos.put(uri.setInscription + '/' + id, data);
  },

  deleteInscription: async (id) => {
    return await AxiosPermisos.delete(uri.setInscription + '/' + id);
  }

}

