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
    get: (uri, token, version = 'v1') => {
        version = typeof version === 'object' ? 'v1':version;
        const request = Axios.get(config.permisosApi + version  + uri, config.axiosConf(token));
        return request
            .then(callback.success)
            .catch(callback.errorConn);
    },    
    post: (uri, token, data, version = 'v1') => { 
        const request = Axios.post(config.permisosApi + version + uri, data, config.axiosConf(token));
        return request
            .then(callback.success)
            .catch(callback.errorConn);
    },
    put: (uri, token, data, version = 'v1') => {
        const request = Axios.put(config.permisosApi + version + uri, data, config.axiosConf(token));
        return request
            .then(callback.success)
            .catch(callback.errorConn);
    },
    patch: (uri, token, data, version = 'v1') => {
        const request = Axios.patch(config.permisosApi + version + uri, data, config.axiosConf(token));
        return request
            .then(callback.success)
            .catch(callback.errorConn);
    },
    delete: (uri, token, version = 'v1')=> {
        const request = Axios.delete(config.permisosApi + version + uri, config.axiosConf(token));
        return request
            .then(callback.success)
            .catch(callback.errorConn);
    },
}