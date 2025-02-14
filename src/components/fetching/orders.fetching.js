import { HTTP, URL } from "./http"
const ROUTE = '/api/orders'

export const crearOrden = async (cartItems) => {
    try {
        const orderData = {
            order_no: `#${Date.now()}`,
            order_date: new Date().toISOString(),
            status: "Pending",
            payment_method: "Cash on Delivery", // Se puede cambiar dinámicamente
            cartItems, // Usar la misma clave que el backend espera
        };

        const result = await HTTP.POST(URL.URL_API + ROUTE, orderData); // Se quita "/checkout"
        if (result.status !== 200) {
            throw result;
        }
        return result;
    } catch (error) {
        throw { message: error.message || "Error al guardar el carrito." };
    }
};