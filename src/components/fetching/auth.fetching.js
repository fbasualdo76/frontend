import { HTTP, URL } from "./http"
const ROUTE = '/api/auth'

export const login = async (usuario) => {
    try {
        const result = await HTTP.POST(URL.URL_API + ROUTE + '/login', usuario)
        //console.log(result)
        if (!result.ok) {
            throw result//1. tira el result como un error para ser atrapado por el catch de abajo.
        }
        else {
            localStorage.setItem('token', result.token)//guardo el token el ele localStorage.
        }
    } catch (error) {//2. atrapa el result (error).
        //console.log('ERROR EN EL LOGUEO', error)
        throw { message: error.message }//3. vuelvo a lanzarlo solamente con el mensaje para enviarle al handleSubmit del form cuando haya un error.
    }
}

export const register = async (usuario) => {
    try {
        const result = await HTTP.POST(URL.URL_API + ROUTE + '/register', usuario)
        //console.log(result)
        if (!result.ok) {
            throw result//1. tira el result como un error para ser atrapado por el catch de abajo.
        }
    } catch (error) {//2. atrapa el result (error).
        //console.log('ERROR EN EL LOGUEO', error)
        throw { message: error.message }//3. vuelvo a lanzarlo solamente con el mensaje para enviarle al handleSubmit del form cuando haya un error.
    }
}

export const verifyToken = async () => {
    try {
        const token = localStorage.getItem('token')//obtengo el token del localStorage.
        const headers = new Headers()
        headers.append('Authorization', token)
        const result = await HTTP.GET(URL.URL_API + ROUTE + '/verify-token', headers)
        //console.log(result)
        return result//Este result se captura en el .then(result) de RouterApp.jsx.
    } catch (error) {
        console.log(error)}
}