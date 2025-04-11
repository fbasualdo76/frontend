import styled from "styled-components";
import { Input } from "../../styles/form";
import { cardsData } from "../../data/data";
import { BaseButtonGreen } from "../../styles/button";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import { useState, useEffect } from "react";
import { obtenerPreferencia } from "../fetching/payments.fetching";
import { procesarPago } from "../fetching/payments.fetching";
import { initMercadoPago, Payment } from '@mercadopago/sdk-react' //Importamos el SDK
import { actualizarOrden } from "../fetching/orders.fetching";
import { useNavigate } from "react-router-dom";


/*Diferencia clave entre Checkout API y Checkout Pro:
Checkout API → Se usa para pagos con tarjeta en tu frontend. NO usa preferencias.
Checkout Pro → Redirige a Mercado Pago. SÍ usa preferencias.*/

const ShippingPaymentWrapper = styled.div`
  .shipping-addr,
  .shipping-method,
  .payment-method {
    margin: 20px 0;

    &-title {
      margin-bottom: 8px;
    }

    .list-group {
      padding: 24px;
      background-color: ${defaultTheme.color_whitesmoke};
      max-width: 818px;
      margin-top: 24px;
      border-radius: 12px;

      @media (max-width: ${breakpoints.sm}) {
        padding: 16px;
        border-radius: 8px;
        margin-top: 16px;
      }
    }

    .list-group-item {
      column-gap: 20px;
    }
    .horiz-line-separator {
      margin: 20px 0;
      @media (max-width: ${breakpoints.sm}) {
        margin: 12px 0;
      }
    }
  }

  .payment-method {
    .list-group-item {
      &-head {
        column-gap: 20px;
      }
    }

    .payment-cards {
      gap: 20px;
      margin: 24px 0 30px 34px;

      @media (max-width: ${breakpoints.lg}) {
        gap: 16px;
      }

      @media (max-width: ${breakpoints.sm}) {
        margin-top: 16px;
        margin-bottom: 16px;
        gap: 10px;
        margin-left: 0;
      }
      .payment-card {
        position: relative;
        width: 80px;
        height: 46px;
        input {
          opacity: 0;
          position: absolute;
          top: 0;
          left: 0;
          width: 80px;
          height: 46px;
          z-index: 10;
          cursor: pointer;

          &:checked {
            & + .card-wrapper {
              .card-selected {
                position: absolute;
                top: -8px;
                right: -5px;
                width: 14px;
                height: 14px;
                display: inline-block;
              }
            }
          }
        }

        .card-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 5px;
          border: 1px solid rgba(0, 0, 0, 0.1);

          .card-selected {
            display: none;
            transition: ${defaultTheme.default_transition};
          }
        }
      }
    }

    .payment-details {
      margin-left: 34px;
      display: grid;
      row-gap: 16px;

      @media (max-width: ${breakpoints.sm}) {
        margin-left: 0;
      }

      .form-elem-group {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
        @media (max-width: ${breakpoints.sm}) {
          grid-template-columns: 100%;
          gap: 0;
        }
      }

      .form-elem {
        height: 40px;
        border: 1px solid ${defaultTheme.color_platinum};
        border-radius: 6px;
        padding: 16px;

        &:focus {
          border-color: ${defaultTheme.color_sea_green};
        }

        @media (max-width: ${breakpoints.sm}) {
          margin-bottom: 10px;
          border-radius: 4px;
        }
      }
    }
  }

  .pay-now-btn {
    @media (max-width: ${breakpoints.sm}) {
      width: 100%;
    }
  }
`;

const ShippingPayment = ({ orderData }) => {

  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //console.log("ORDER DATA:", orderData[0].total);

  initMercadoPago("TEST-d73fdfd0-fd0f-461f-85f7-06633477f590"/*, { locale: "es-AR" }*/)

  useEffect(() => {
    const obtenerIdPreferencia = async () => {
      try {
        const productos = { unit_price: orderData[0].total, title: "Compra en mi tienda (FRONTEND)" };
        //El objeto products sirve para crear la preferencia de pago en tu backend.
        const result = await obtenerPreferencia(productos);
        //console.log("RESULT DE FORMULARIO:", result.preferenceId);
        if (result?.preferenceId) {
          setPreferenceId(result.preferenceId);
        } else {
          setError("NO SE OBTUVO UN PREFERENCEID VALIDO.");
        }
      } catch (error) {
        setError("ERROR AL OBTENER EL PREFERENCEID.");
      } finally {
        setLoading(false);
      }
    };
    obtenerIdPreferencia();
  }, []);

  //initialization es lo que el Brick de Pago usa para inicializarse en tu frontend. Sirve para:
  //Mostrar el monto que se va a pagar (amount).
  //Asociar el Brick con la preferencia que creaste (preferenceId).
  const initialization = {
    amount: orderData[0].total,
    preferenceId: preferenceId,
  };

  const customization = {
    paymentMethods: {
      atm: "all",
      ticket: "all",
      creditCard: "all",
      prepaidCard: "all",
      debitCard: "all",
      mercadoPago: "all",
    },
  };

  const onSubmit = async (formDataObject) => {
    /*
    Recibo el formDataObject de Mercado Pago. formDataObject es un objeto que contiene los datos que envía el Brick al hacer clic en el botón de pago. 
    Haciendo console.log("FORMDATAOBJECT:", formDataObject); 
    --Podrías ver algo así en la consola:
    {
      paymentType: "wallet_purchase",
      selectedPaymentMethod: "wallet_purchase",
      formData: null
    }
    
    --O si fuera un pago con tarjeta:
    {
      paymentType: "credit_card",
      selectedPaymentMethod: "visa",
      formData: { 
        cardNumber: "1234 5678 9012 3456",
        cardExpirationDate: "12/25",
        cardholderName: "John Doe",
        cardholderIdentification: "12345678",
        securityCode: "123"
      }
    }  
    */

    //Si se usa Mercado Pago Wallet (pago redirigido)
    if (formDataObject?.paymentType === "wallet_purchase") {
      //console.log("Redirigiendo a Mercado Pago Wallet...");
      return; // Detenemos aquí porque el Brick maneja la redirección automáticamente.
    }

    //Si se usa Tarjeta de crédito o débito (pago directo)(se envía un formData válido)
    if (!formDataObject?.formData) {
      console.error("El formulario no envió datos válidos.");
      return;
    }

    //Variables definidas con let (y no const) fuera del try para permitir su reasignación en distintos bloques (por ejemplo, obtener datos del pago y luego usarlos en la actualización de la orden).
    let resultadoPago;
    let payment_status;
    let payment_method;

    //Procesar el pago.
    try {
      const result = await procesarPago(formDataObject.formData);
      resultadoPago = result?.resultadoPago;//Guardo el resultado de procesarPago() en resultadoPago.
      payment_status = resultadoPago?.status;//Guardo el status del pago en payment_status.
      payment_method = resultadoPago?.payment_method?.id;//Guardo el payment_method del pago en payment_method.
      console.log("PAGO EXITOSO - SHIPPINGPAYMENT."/*, result.resultadoPago*/);
    } catch (error) {
      console.error("ERROR AL PROCESAR EL PAGO - SHIPPINGPAYMENT.", error);
    }

    try {
      const resultActualizar = await actualizarOrden(orderData[0].id, { payment_method, payment_status, });
      console.log("ORDEN ACTUALIZADA CORRECTAMENTE");
    } catch (error) {
      console.error("PAGO OK, PERO ERROR AL ACTUALIZAR LA ORDEN:", error);
      //Podrías guardar este error en un sistema de log o notificar al admin
    }
    navigate("/confirm"/*, { state: { orderData: response.orderData } }*/);
  };

  if (loading) return <div>CARGANDO FORMULARIO DE PAGO...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!preferenceId) return <div>NO SE PUDO CARGAR EL FORMULARIO DE PAGO.</div>;

  return (
    <ShippingPaymentWrapper>
      <Payment
        initialization={initialization}
        customization={customization}

        onSubmit={(formDataObject) => {
          //console.log("ON SUBMIT - Datos recibidos:", formDataObject);
          onSubmit(formDataObject); // Llamada a tu función onSubmit original
        }}

        onError={(error) => console.error("Error en el Brick:", error)}
        onReady={() => console.log("Brick listo para ser utilizado.")}
      />
    </ShippingPaymentWrapper>
  );
};

export default ShippingPayment;