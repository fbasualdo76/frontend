//PAYMENTS.FETCHING.JS
import { HTTP, URL } from "./http";
const ROUTE = "/api/payments";

// OBTENER PREFERENCE_ID PARA EL BRICK DE PAGO
export const obtenerPreferencia = async (paymentData) => {
    try {
        //console.log("DATOS QUE SE ENVIAN AL BACKEND:", paymentData);
        //console.log("ENVIANDO A:", URL.URL_API + ROUTE);
        // ENVIAMOS LOS DATOS DEL FRONTEND AL BACKEND PARA OBTENER EL ID DE LA PREFERENCIA.
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

// PROCESAR PAGO CON TARJETA DE CRÉDITO / DÉBITO
export const procesarPago = async (paymentData) => {
    try {
        const result = await HTTP.POST(`${URL.URL_API}${ROUTE}/procesar-pago`, paymentData);
        if (!result) throw result;
        return result;
    } catch (error) {
        throw { message: error.message || "ERROR AL PROCESAR EL PAGO - PAYMENTS.FETCHING.JS." };
    }
};

/*Esta funcion, con el parametro payment_id, consulta a Mercado Pago los datos reales del pago (con seguridad, desde tu backend). De esa respuesta, obtiene el payment_status, payment_method y la external_reference que vos mismo guardaste como order_id cuando creaste la preferencia.*/
export const consultarPago = async (payment_id) => {
    try {
        //const result = await HTTP.POST(`${URL.URL_API}${ROUTE}/consultar-pago`, { payment_id });
        const result = await HTTP.GET(`${URL.URL_API}${ROUTE}/consultar-pago?payment_id=${payment_id}`); //ENVIO EL PAYMENT_ID AL BACKEND POR QUERY PARAMS.
        if (!result) throw new Error("Sin respuesta del servidor al consultar el pago.");
        return result;
    } catch (error) {
        throw {
            message: error?.message || "ERROR AL CONSULTAR EL PAGO - payments.fetching.js.",
        };
    }
};
