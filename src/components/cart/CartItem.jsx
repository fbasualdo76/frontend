import { useState } from 'react';
import styled from "styled-components";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import { currencyFormat } from "../../utils/helper";
//import { cartItems } from '../../data/data';

const CartTableRowWrapper = styled.tr`
  .cart-tbl {
    &-prod {
      grid-template-columns: 80px auto;
      column-gap: 12px;

      @media (max-width: ${breakpoints.xl}) {
        grid-template-columns: 60px auto;
      }
    }

    &-qty {
      .qty-inc-btn,
      .qty-dec-btn {
        width: 24px;
        height: 24px;
        border: 1px solid ${defaultTheme.color_platinum};
        border-radius: 2px;

        &:hover {
          border-color: ${defaultTheme.color_sea_green};
          background-color: ${defaultTheme.color_sea_green};
          color: ${defaultTheme.color_white};
        }
      }

      .qty-value {
        width: 40px;
        height: 24px;
      }
    }
  }

  .cart-prod-info {
    p {
      margin-right: 8px;
      span {
        margin-right: 4px;
      }
    }
  }

  .cart-prod-img {
    width: 80px;
    height: 80px;
    overflow: hidden;
    border-radius: 8px;

    @media (max-width: ${breakpoints.xl}) {
      width: 60px;
      height: 60px;
    }
  }
`;

//ESTE ESTILO ES COPIADO DE ProductDetailsScreen.jsx
const ProductColorWrapper = styled.div`
  /* Antes 32 */
  margin-top: 0px;

  @media (max-width: ${breakpoints.sm}) {
    margin-top: 24px;
  }

  .prod-colors-top {
    margin-bottom: 16px;
  }

  .prod-colors-list {
    column-gap: 12px;
  }

  .prod-colors-item {
    position: relative;
    width: 22px;
    height: 22px;
    transition: ${defaultTheme.default_transition};

    &:hover {
      scale: 0.9;
    }

    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 22px;
      height: 22px;
      opacity: 0;
      cursor: pointer;

      //&:checked + span {
        //outline: 1px solid ${defaultTheme.color_gray};
       //outline-offset: 3px;
      //}
    }

    .prod-colorbox {
      border-radius: 100%;
      width: 22px;
      height: 22px;
      display: inline-block;
    }
  }
`;

const CartItem = ({ cartItem, setCartItems }) => {
  //ESTADO PARA LA CANTIDAD
  const [quantity, setQuantity] = useState(cartItem.quantity);

  //Función para actualizar la cantidad en el carrito y localStorage
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return; // Evita cantidades menores a 1
    //Obtener el carrito desde localStorage
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    //Buscar el producto en el carrito
    const index = cartItems.findIndex(
      (item) =>
        item.id === cartItem.id &&
        item.size === cartItem.size &&
        item.color === cartItem.color
    );
    if (index !== -1) {
      //Actualizar la cantidad
      cartItems[index].quantity = newQuantity;
      //Guardar en localStorage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      //Actualizar el estado global del carrito
      setCartItems(cartItems);
      //Actualizar el estado local
      setQuantity(newQuantity);
    }
  };
  //Función para eliminar el producto en el carrito y localStorage
  const handleDelete = () => {
    //Obtener el carrito actual desde localStorage
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    //Filtrar para eliminar el producto actual (comparando id, color y talle)
    const updatedCart = cartItems.filter(
      (item) =>
        !(
          item.id === cartItem.id &&
          item.size === cartItem.size &&
          item.color === cartItem.color
        )
    );
    //Guardar el carrito actualizado en localStorage
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    //Actualizar el estado global del carrito
    setCartItems(updatedCart);
  };

  return (
    <CartTableRowWrapper>
      <td>
        <div className="cart-tbl-prod grid">
          <div className="cart-prod-img">
            <img src={cartItem.imgSource} className="object-fit-cover" alt="" />
          </div>
          <div className="cart-prod-info">
            <h4 className="text-base">{cartItem.title}</h4>
            <p className="text-sm text-gray inline-flex">
              <span className="font-semibold">Color: </span> {/*{cartItem.color}*/}
              {/*ESTE WRAPPER ES COPIADO DE ProductDetailsScreen.jsx*/}

              <ProductColorWrapper>
                <div className="prod-colors-list flex items-center">
                  <div className="prod-colors-item">
                    <input
                      type="radio"
                      name="color"
                      title={cartItem.colorText}
                    />
                    <span
                      className="prod-colorbox"
                      style={{
                        background: `${cartItem.color}`,
                        border: `${cartItem.color}`.toLowerCase() === "#ffffff" ? '1px solid #ccc' : 'none'
                      }}
                    ></span>
                  </div>
                </div>
              </ProductColorWrapper>

            </p>
            <p className="text-sm text-gray inline-flex">
              <span className="font-semibold">Size:</span>
              {cartItem.size}
            </p>
          </div>
        </div>
      </td>
      <td>
        <span className="text-lg font-bold text-outerspace">
          {/*${cartItem.price}*/}
          {currencyFormat(cartItem.price)}
        </span>
      </td>
      <td>
        <div className="cart-tbl-qty flex items-center">

          <button className="qty-dec-btn" onClick={() => handleQuantityChange(quantity - 1)}>
            <i className="bi bi-dash-lg"></i>
          </button>

          <span className="qty-value inline-flex items-center justify-center font-medium text-outerspace">
            {/*{cartItem.quantity}*/}
            {quantity}
          </span>

          <button className="qty-inc-btn" onClick={() => handleQuantityChange(quantity + 1)} >
            <i className="bi bi-plus-lg"></i>
          </button>

        </div>
      </td>
      {/*<td>
        <span className="cart-tbl-shipping uppercase text-silver font-bold">
          {cartItem.shipping === 0 ? "Free" : cartItem.shipping}
        </span>
      </td>*/}
      <td>
        <span className="text-lg font-bold text-outerspace">
          {/*${cartItem.price * cartItem.quantity}*/}
          {currencyFormat(cartItem.price * quantity)}
        </span>
      </td>
      <td>
        <div className="cart-tbl-actions flex justify-center">
          <Link to="/cart" className="tbl-del-action text-red" onClick={handleDelete}>
            <i className="bi bi-trash3"></i>
          </Link>
        </div>
      </td>
    </CartTableRowWrapper>
  );
};

export default CartItem;

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired,
  setCartItems: PropTypes.func.isRequired,
};