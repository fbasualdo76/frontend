import { PageWrapper } from "../../styles/styles";
import Footer from "../footer/Footer";
import AuthHeader from "../header/AuthHeader";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    //PLANTILLA DEL INVITADO
    <PageWrapper>
      <AuthHeader />
      <div>PLANTILLA DEL INVITADO</div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </PageWrapper>
  );
};

export default AuthLayout;
