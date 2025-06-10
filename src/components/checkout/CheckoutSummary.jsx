import styled from "styled-components";
//import { orderData } from "../../data/data";
import { currencyFormat } from "../../utils/helper";
import { breakpoints, defaultTheme } from "../../styles/themes/default";

const CheckoutSummaryWrapper = styled.div`
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.05),
    -2px -2px 4px 0px rgba(0, 0, 0, 0.05);
  padding: 40px;

  @media (max-width: ${breakpoints.xl}) {
    padding: 24px;
  }

  @media (max-width: ${breakpoints.sm}) {
    padding: 16px;
  }

  @media (max-width: ${breakpoints.xs}) {
    background-color: transparent;
    padding: 0;
    box-shadow: none;
  }

  .order-list {
    row-gap: 24px;
    margin-top: 20px;

    @media (max-width: ${breakpoints.sm}) {
      row-gap: 16px;
    }
  }

  .order-item {
    grid-template-columns: 60px auto;
    gap: 16px;

    @media (max-width: ${breakpoints.xs}) {
      align-items: center;
    }

    &-img {
      width: 60px;
      height: 60px;
      overflow: hidden;
      border-radius: 4px;
    }

    &-info {
      gap: 16px;

      @media (max-width: ${breakpoints.xs}) {
        flex-direction: column;
        gap: 6px;
      }
    }
  }

  .order-info {
    margin-top: 30px;
    @media (max-width: ${breakpoints.sm}) {
      margin-top: 20px;
    }

    li {
      margin: 6px 0;
    }

    .list-separator {
      height: 1px;
      background-color: ${defaultTheme.color_anti_flash_white};
      margin: 12px 0;
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

const CheckoutSummary = ({ orderData }) => {
  //console.log("ESTE ES EL ORDERDATA EN CHECKOUTSUMMARY:", orderData);
  //Total de items
  const totalItems = orderData[0]?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  //Suma de los precios de todos los productos
  const subtotal = orderData[0]?.items?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
  // Calcular el total final. DEJO DE USAR EL GRANDTOTAL Y USO EL orderData[0].total QUE ES EL TOTAL DE LA ORDEN.
  const grandTotal = subtotal //+ shipping;
  return (
    <CheckoutSummaryWrapper>
      <h4 className="text-xxl font-bold text-outersapce">
        Checkout Order Summary
      </h4>
      <div className="order-list grid">
        {orderData[0]?.items?.map((order) => {
          return (
            <div className="order-item grid" key={order.id}>
              <div className="order-item-img">
                <img
                  src={order.imgSource}
                  className="object-fit-cover"
                  alt=""
                />
              </div>
              <div className="order-item-info flex justify-between">
                <div className="order-item-info-l">
                  <p className="text-base font-bold text-outerspace">
                    {order.title}&nbsp;
                    <span className="text-gray">x{order.quantity}</span>
                  </p>
                  <p className="text-base font-bold text-outerspaace flex items-center">
                    Color: &nbsp;
                    {/*<span className="text-gray font-normal">{order.color}</span>*/}

                    {/*ESTE WRAPPER ES COPIADO DE ProductDetailsScreen.jsx*/}
                    <ProductColorWrapper>
                      <div className="prod-colors-list flex items-center">
                        <div className="prod-colors-item">
                          <input
                            type="radio"
                            name="color"
                          />
                          <span
                            className="prod-colorbox"
                            style={{ background: `${order.color}` }}
                          ></span>
                        </div>
                      </div>
                    </ProductColorWrapper>

                  </p>
                </div>
                <div className="order-item-info-r text-gray font-bold text-base">
                  {currencyFormat(order.price)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ul className="order-info">
        <li className="flex items-center justify-between">
          <span className="text-outerspace font-bold text-lg">
            Subtotal <span className="text-gray font-semibold">({totalItems} items)</span>
          </span>
          <span className="text-outerspace font-bold text-lg">{currencyFormat(subtotal)}</span>
        </li>
        {/*<li className="flex items-center justify-between">
          <span className="text-outerspace font-bold text-lg">Savings</span>
          <span className="text-outerspace font-bold text-lg">-$30.00</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="text-outerspace font-bold text-lg">Shipping</span>
          <span className="text-outerspace font-bold text-lg">-$5.00</span>
        </li>*/}
        <li className="list-separator"></li>
        <li className="flex items-center justify-between">
          <span className="text-outerspace font-bold text-lg">Total</span>
          <span className="text-outerspace font-bold text-lg">{currencyFormat(orderData[0].total)}</span>
          <span>{orderData[0].id}</span>

        </li>
      </ul>
    </CheckoutSummaryWrapper>
  );
};

export default CheckoutSummary;
