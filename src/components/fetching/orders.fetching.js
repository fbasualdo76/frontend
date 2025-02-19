import { HTTP, URL } from "./http"
const ROUTE = '/api/orders'

export const crearOrden = async (cartItems) => {
    try {
        const orderData = {//Estructuramos los datos antes de enviarlos al backend
            order_no: `#${Date.now()}`, // Genera un número de orden único basado en la fecha
            order_date: new Date().toISOString(), // Formato ISO de la fecha actual
            status: "Pending", // Estado inicial de la orden
            payment_method: "Cash on Delivery", // Método de pago fijo (puede cambiarse dinámicamente)
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
        throw { message: error.message || "Error al guardar el carrito." };
    }
};