import { HTTP, URL } from "./http"
const ROUTE = '/api/categories'

export const obtenerCategorias = async () => {//obtiene las categorias.
    try {
        const result = await HTTP.GET(URL.URL_API + ROUTE);
        //console.log(result);
        if (!result || !result.categories) {
            throw {
                status: 500,
                message: result.message || 'ERROR EN LA RESPUESTA DEL SERVIDOR.',
                from: 'categories.fetching → obtenerCategorias',
            };
        }
        return result.categories;
    } catch (error) {
        throw {
            status: 500,
            message: error.message || 'ERROR AL OBTENER LAS CATEGORIAS.',
            from: 'categories.fetching → obtenerCategorias',
        };
    }
};