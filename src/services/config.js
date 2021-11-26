// Ruta para consumir los servicios
const permisos = "http://localhost:8081";

export default {
    permisosURL: permisos,
    permisosApi: permisos + '/app/api/',
    axiosConf: (token) => {
        const config = {
            headers: { 
                'Content-type': 'multipart; form-data; application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': '*',
                'cache-control': 'no-cache',
                'Authorization': '',
            }
        }
        if (token && localStorage.getItem('token') != null) {
            config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
        }
        return config;
    },
}