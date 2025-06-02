/*
1.Redirección a Mercado Pago:
El usuario selecciona "Mercado Pago" como método de pago y el Brick lo redirige automáticamente a la web de Mercado Pago.
2.El usuario paga ahí.
3.Redirección a tu sitio:
Cuando termina de pagar, Mercado Pago redirige al usuario a la URL que configuraste en back_urls.success al crear la preferencia,

success: "http://localhost:5173/confirm-wallet-payment",

AGREGANDO PARAMETROS COMO:
payment_id: el ID del pago realizado
status: estado del pago (approved, pending, etc.)
preference_id: la ID de la preferencia

http://localhost:5173/confirm-wallet-payment?payment_id=12345&status=approved&preference_id=abc123

4.Tu componente ConfirmWalletPaymentScreen.jsx lee esos datos del URL, y hace lo siguiente:
-Usa el payment_id para consultar a Mercado Pago los datos reales del pago (con seguridad, desde tu backend).
-De esa respuesta, obtiene el payment_status, payment_method y la external_reference que vos mismo guardaste como order_id cuando creaste la preferencia.
-Luego, llama a tu backend para actualizar la orden en la base de datos con esos datos reales.
*/
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { consultarPago } from "../../components/fetching/payments.fetching";
import { actualizarOrden } from "../../components/fetching/orders.fetching";

const ConfirmWalletPaymentScreen = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const paymentId = searchParams.get("payment_id");//tomamos el payment_id de la URL que devuelve mercado pago.
  const navigate = useNavigate();

  useEffect(() => {
    const confirmarPago = async () => {
      if (!paymentId) {
        setError("FALTA EL PAYMENT_ID EN LA URL.");
        setLoading(false);
        return;
      }

      let datosPago;
      let orderId;
      let payment_status;
      let payment_method;

      try {
        const resultado = await consultarPago(paymentId);//Funcion que usa el payment_id, que devuelve mercado pago, para consultar a Mercado Pago los datos reales del pago (con seguridad, desde tu backend) - consultarPago del fetchings/payments.fetching

        console.log('resultado EN CONFIRMWALLETPAYMENT:',resultado)

        datosPago = resultado?.datosPago;

        console.log('datos EN CONFIRMWALLETPAYMENT:',datos)

        // Asegurate de que estos campos existan en la respuesta del backend
        orderId = datosPago?.external_reference;
        payment_status = datosPago?.status;
        payment_method = datosPago?.payment_method?.id;

        if (!orderId || !payment_status || !payment_method) {
          throw new Error("DATOS DE PAGO INCOMPLETOS.");
        }

        // Actualizamos la orden con los datos de pago
        await actualizarOrden(orderId, { payment_status, payment_method });//actualizarOrden del fetchings/orders.fetching

        console.log("Orden actualizada correctamente.");
        navigate("/confirm"); // Redirige a una pantalla de confirmación
      } catch (err) {
        console.error("Error al confirmar el pago con Wallet:", err);
        setError("Hubo un problema al confirmar el pago. Por favor, contactanos.");
      } finally {
        setLoading(false);
      }
    };

    confirmarPago();
  }, [paymentId, navigate]);

  if (loading) return <div>PROCESANDO PAGO CON MERCADO PAGO...</div>;
  if (error) return <div>Error: {error}</div>;

  return null; // No mostramos nada porque redirigimos si todo sale bien
};

export default ConfirmWalletPaymentScreen;