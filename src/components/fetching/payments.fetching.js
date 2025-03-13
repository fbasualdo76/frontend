//PAYMENTS.FETCHING.JS
import { HTTP, URL } from "./http";
const ROUTE = "/api/payments";

export const obtenerPreferencia = async (paymentData) => {
    try {
        console.log("DATOS QUE SE ENVIAN AL BACKEND:", paymentData);

        //console.log("ENVIANDO A:", URL.URL_API + ROUTE);

        // Enviamos los datos del pago al backend
        const result = await HTTP.POST(URL.URL_API + ROUTE, paymentData);

        // Si el backend devuelve un error, lanzamos una excepción
        //if (result.status !== 200) {
        //throw result;           
        //}

        // Verificamos que el resultado exista y que tenga "EL CODIGO DE ESTADO HTTP" 200 (éxito)
        if (!result /*|| result.status !== 200*/) {
            //throw new Error("No se obtuvo una respuesta válida del backend o el código de estado no es 200.");
            throw result
        }

        //console.log("PREFERENCIA DE PAGO OBTENIDA EXITOSAMENTE:", result);

        return result;

    } catch (error) {
        //console.error("ERROR AL OBTENER LA PREFERENCIA DE PAGO:", error);
        throw { message: error.message || "ERROR AL OBTENER LA PREFERENCIA DE PAGO." };
    }
};