import styled from "styled-components";
import { Input } from "../../styles/form";
import { cardsData } from "../../data/data";
import { BaseButtonGreen } from "../../styles/button";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import { useState } from "react";
import { procesarPago } from "../fetching/payments.fetching";

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

const ShippingPaymentPRO = () => {
  const [cardData, setCardData] = useState({
    cardNumber: "5031 7557 3453 0604",
    cardName: "FRANCO BASUALDO",
    expirationDate: "11/30",
    securityCode: "123"
  });

  const handleChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    try {
      const paymentData = { ...cardData, paymentMethod: "Credit Card" };
      const response = await procesarPago(paymentData);
      console.log("Pago exitoso", response);
    } catch (error) {
      console.error("Error en el pago", error);
    }
  };

  return (
    <ShippingPaymentWrapper>
      <div className="payment-method">
        <h3 className="text-xxl payment-method-title">Payment Method</h3>
        <p className="text-base text-outerspace">All transactions are secure and encrypted.</p>
        <div className="list-group">
          <div className="list-group-item">
            <div className="flex items-center list-group-item-head">
              <Input type="radio" name="payment_method" checked readOnly />
              <p className="font-semibold text-lg">Credit Card</p>
            </div>
            <div className="payment-cards flex flex-wrap">
              {cardsData?.map((card) => (
                <div className="payment-card flex items-center justify-center" key={card.id}>
                  <Input type="radio" name="payment_cards" />
                  <div className="card-wrapper bg-white w-full h-full flex items-center justify-center">
                    <img src={card.imgSource} alt="" />
                  </div>
                </div>
              ))}
            </div>
            <div className="payment-details">
              <div className="form-elem-group">
                <Input type="text" className="form-elem" name="cardNumber" placeholder="Card number" onChange={handleChange} />
                <Input type="text" className="form-elem" name="cardName" placeholder="Name on card" onChange={handleChange} />
              </div>
              <div className="form-elem-group">
                <Input type="text" className="form-elem" name="expirationDate" placeholder="Expiration date (MM/YY)" onChange={handleChange} />
                <Input type="text" className="form-elem" name="securityCode" placeholder="Security Code" onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BaseButtonGreen type="button" className="pay-now-btn" onClick={handlePayment}>
        Pay Now
      </BaseButtonGreen>
    </ShippingPaymentWrapper>
  );
};

export default ShippingPaymentPRO;