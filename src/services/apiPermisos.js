import AxiosPermisos from './axiosPermisos'

// Todas las API y URL
const uri = {
  getInscription: '/inscriptions/pageable',
  getHouses: '/inscriptions/houses'
}



// Todos los servicios
export default {
 
  getInscriptions: async (data) => {
    return await AxiosPermisos.get(uri.getInscription+"?page="+data.page+"&size="+data.size);
  },

  getHouses: async () => {
    return await AxiosPermisos.get(uri.getHouses);
  }

}

