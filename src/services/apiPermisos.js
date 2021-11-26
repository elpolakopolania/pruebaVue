import AxiosPermisos from './axiosPermisos'

// Todas las API y URL
const uri = {
  getInscription: '/inscriptions'
}



// Todos los servicios
export default {
 
  getInscription: async (data) => {
    return await AxiosPermisos.get(uri.getInscription);
  }
}

