import styled from "styled-components";
import { Container } from "../../styles/styles";
import Title from "../../components/common/Title";
import Billing from "../../components/checkout/Billing";
import ShippingPayment from "../../components/checkout/ShippingPayment";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import { useLocation } from "react-router-dom";

const CheckoutScreenWrapper = styled.main`
  padding: 48px 0;
  .horiz-line-separator {
    height: 1px;
    background-color: ${defaultTheme.color_anti_flash_white};
    max-width: 818px;
    margin: 30px 0;

    @media (max-width: ${breakpoints.sm}) {
      margin: 20px 0;
    }
  }
`;

const CheckoutScreen = () => {
  const location = useLocation();
  const orderData = location.state?.orderData;//Recibe los datos de la orden (orderData) que fueron pasados desde CartSummary
  return (
    <CheckoutScreenWrapper>
      <Container>
        <Title titleText={"Check Out"} />
        <Billing orderData={orderData} /> {/* Pasamos la orden a Billing */}
        <div className="horiz-line-separator w-full"></div>
        <ShippingPayment orderData={orderData} />{/* Pasamos la orden a ShippongPayment */}
      </Container>
    </CheckoutScreenWrapper>
  );
};

export default CheckoutScreen;
