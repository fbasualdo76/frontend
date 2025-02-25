import styled from "styled-components";
import { BaseButtonGreen } from "../../styles/button";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import { currencyFormat } from "../../utils/helper";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { crearOrden } from "../fetching/orders.fetching";
import { useState } from "react";

const CartSummaryWrapper = styled.div`
  background-color: ${defaultTheme.color_flash_white};
  padding: 16px;

  .checkout-btn {
    min-width: 100%;
  }

  .summary-list {
    padding: 20px;

    @media (max-width: ${breakpoints.xs}) {
      padding-top: 0;
      padding-right: 0;
      padding-left: 0;
    }

    .summary-item {
      margin: 6px 0;

      &:last-child {
        margin-top: 20px;
        border-top: 1px dashed ${defaultTheme.color_sea_green};
        padding-top: 10px;
      }
    }
  }
`;

const CartSummary = ({ cartItems, setCartItems }) => {
  const [loading, setLoading] = useState(false); // Iniciar en false
  const [errorText, setErrorText] = useState('')
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);// Calcular subtotal sumando precio * cantidad de cada producto
  const shipping = cartItems.reduce((acc, item) => acc + item.shipping, 0);// Calcular el costo total de envío (sumando el shipping de cada producto)  
  const grandTotal = subtotal //+ shipping;// Calcular el total final

  const handleProceedToCheckout = async () => {//registra la orden y redirige a la pantalla de checkout
    setLoading(true); // Activar el loading al iniciar el proceso
    setErrorText(''); // Limpiar errores previos
    try {
      // Crear la orden en el backend
      const response = await crearOrden(cartItems);
      if (response.status === 200) {
        // Pasar la orden a CheckoutScreen
        navigate("/checkout", { state: { orderData: response.orderData } });
        // Vaciar el carrito en el frontend (localStorage y estado)
        localStorage.removeItem("cartItems");
        setCartItems([]); // Asegúrate de tener acceso a setCartItems
        // Redirigir a la página de detalles de la orden
        //navigate(`/order_detail/${response.order_id}`);
      } else {
        //console.error("Error al crear la orden:", response.message);
        setErrorText(response.message); // Mostrar mensaje de error si la validación falla        
      }
    } catch (error) {
      //console.error("Error en el checkout:", error);
      setErrorText(error.message); // Mostrar mensaje de error si la validación falla
    }
  };

  return (
    <>
      {errorText && <span style={{ color: 'red' }}>{errorText}</span>}{/*si hay error lo muestra aca.*/}
      {loading ? <h2>CREANDO ORDEN...</h2> :
        <CartSummaryWrapper>
          <ul className="summary-list">
            <li className="summary-item flex justify-between">
              <span className="font-medium text-outerspace">Sub Total</span>
              <span className="font-medium text-outerspace">{currencyFormat(subtotal)}</span>
            </li>
            {/*<li className="summary-item flex justify-between">
          <span className="font-medium text-outerspace">Shipping</span>
          <span className="font-medium text-outerspace">{currencyFormat(shipping)}</span>
        </li>*/}
            <li className="summary-item flex justify-between">
              <span className="font-medium text-outerspace">Total</span>
              <span className="summary-item-value font-bold text-outerspace">
                {currencyFormat(grandTotal)}
              </span>
            </li>
          </ul>
          <BaseButtonGreen type="submit" className="checkout-btn" onClick={handleProceedToCheckout} disabled={loading} /*Deshabilitar el botón durante la carga*/>
            Proceed To Checkout
          </BaseButtonGreen>
        </CartSummaryWrapper>
      }
    </>
  );
};

export default CartSummary;

CartSummary.propTypes = {
  cartItems: PropTypes.array.isRequired,
  setCartItems: PropTypes.func.isRequired,
};