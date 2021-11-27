import Axios from 'axios';

import config from './config'

//CALLBACKS
const callback = {
    success: (response) => {
        return response.data;
    },
}

Axios.interceptors.response.use(
    (resp) => {
      let v = resp.headers['vers'] || 'default'
      if(v !== localStorage.getItem('vers') && resp.config.method == 'get'){
        localStorage.setItem('vers', v)
        window.location.reload()
       }
    return Promise.resolve(resp)
  })

// Todos los metodos
export default {
    get: (uri) => {
        const request = Axios.get(config.permisosApi + uri);
        return request
            .then(callback.success)
            .catch(callback.errorConn);
    },    
    post: (uri,  data) => { 
        const request = Axios.post(config.permisosApi  + uri, data);
        return request
            .then(callback.success)
            .catch(callback.errorConn);
    },
    put: (uri,  data) => {
        const request = Axios.put(config.permisosApi  + uri, data);
        return request
            .then(callback.success)
            .catch(callback.errorConn);
    },
    patch: (uri,  data) => {
        const request = Axios.patch(config.permisosApi  + uri, data);
        return request
            .then(callback.success)
            .catch(callback.errorConn);
    },
    delete: (uri)=> {
        const request = Axios.delete(config.permisosApi  + uri);
        return request
            .then(callback.success)
            .catch(callback.errorConn);
    },
}