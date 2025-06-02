//ORDERS.FETCHING.JS
import { HTTP, URL } from "./http"
const ROUTE = '/api/orders'

export const crearOrden = async (cartItems) => {
    try {
        const orderData = {//Estructuramos los datos antes de enviarlos al backend
            //order_no: `#${Date.now()}`, // Genera un número de orden único basado en la fecha
            date: new Date().toISOString(), // Formato ISO de la fecha actual
            order_status: "Pending", // Estado inicial de la orden
            payment_method: "Pending", // FORMA DE PAGO (puede cambiarse dinámicamente)
            payment_status: "Pending", // Estado inicial del pago
            cartItems, // Enviamos los productos tal como están en el carrito
        };
        // Enviamos la orden al backend
        const result = await HTTP.POST(URL.URL_API + ROUTE, orderData);
        // Si el backend devuelve un error, lanzamos una excepción
        if (result.status !== 200) {
            throw result;
        }
        return result;
    } catch (error) {
        throw { message: error.message || "ERROR AL CREAR LA ORDEN." };
    }
};

export const actualizarOrden = async (orderId, paymentData) => {
    try {
        const result = await HTTP.PUT(`${URL.URL_API}` + ROUTE + `/${orderId}/payment`, paymentData);
        if (result.status !== 200) {
            throw result;
        }
        return result;
    } catch (error) {
        throw {
            message: error.message || "ERROR AL ACTUALIZAR EL MÉTODO Y ESTADO DE PAGO - ORDERS.FETCHING.JS."
        };
    }
};
