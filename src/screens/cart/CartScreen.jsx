import styled from "styled-components";
import { Container } from "../../styles/styles";
import Breadcrumb from "../../components/common/Breadcrumb";
import { Link } from "react-router-dom";
//import { cartItems } from "../../data/data";
import CartTable from "../../components/cart/CartTable";
import { breakpoints } from "../../styles/themes/default";
import CartDiscount from "../../components/cart/CartDiscount";
import CartSummary from "../../components/cart/CartSummary";

import { useState, useEffect } from "react";

const CartPageWrapper = styled.main`
  padding: 48px 0;

  .breadcrumb-nav {
    margin-bottom: 20px;
  }
`;

const CartContent = styled.div`
  margin-top: 40px;
  grid-template-columns: 2fr 1fr;
  gap: 40px;

  @media (max-width: ${breakpoints.xl}) {
    grid-template-columns: 100%;
  }

  @media (max-width: ${breakpoints.sm}) {
    margin-top: 24px;
  }

  .cart-list {
    @media (max-width: ${breakpoints.lg}) {
      overflow-x: scroll;
    }
  }

  .cart-content-right {
    gap: 24px;

    @media (max-width: ${breakpoints.xl}) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: ${breakpoints.md}) {
      grid-template-columns: 100%;
    }
  }
`;

const CartScreen = (/*{ cartItems }*/) => {
  const breadcrumbItems = [
    { label: "Home", link: "/cart" },
    { label: "Add To Cart", link: "" },
  ];

  const [cartItems, setCartItems] = useState(() => {
    /*Estamos inicializando el estado cartItems (aray que almacena los items del carrito) utilizando useState.
    Al llamar a useState con una función como argumento (en este caso una función flecha), esa función se ejecutará solo la primera vez que se renderice el componente y el valor que devuelva será el valor inicial del estado cartItems.
    Dentro de la función pasada a useState, estamos recuperando los elementos del carrito almacenados en el localStorage con la clave 'cartItems'. Si los elementos existen en el localStorage, los parseamos de JSON a un array de JavaScript. De lo contrario, devolvemos un array vacío.*/
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  //Cargar carrito desde localStorage al montar el componente
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  return (
    <CartPageWrapper>
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <div className="cart-head">
          <p className="text-base text-gray">
            Please fill in the fields below and click place order to complete
            your purchase!
          </p>
          <p className="text-gray text-base">
            Already registered?
            <Link to="/sign_in" className="text-sea-green font-medium">
              &nbsp;Please login here.
            </Link>
          </p>
        </div>
        <CartContent className="grid items-start">
          <div className="cart-content-left">
            <CartTable cartItems={cartItems} setCartItems={setCartItems} />
          </div>
          <div className="grid cart-content-right">
            <CartDiscount />
            <CartSummary cartItems={cartItems} setCartItems={setCartItems} />
          </div>
        </CartContent>
      </Container>
    </CartPageWrapper>
  );
};

export default CartScreen;
