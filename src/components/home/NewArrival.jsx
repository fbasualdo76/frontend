import styled from "styled-components";
import { Container, Section } from "../../styles/styles";
import Title from "../common/Title";
import Slider from "react-slick";
import CustomNextArrow from "../common/CustomNextArrow";
import CustomPrevArrow from "../common/CustomPrevArrow";
import { newArrivalData } from "../../data/data";
import { commonCardStyles } from "../../styles/card";
import { breakpoints } from "../../styles/themes/default";
import { Link } from "react-router-dom";
import ProductItem from "../product/ProductItem";

const ProductCardBoxWrapper = /*styled.div`*/styled(Link)`
  ${commonCardStyles}
  .product-img {
    height: 262px;
    width: 262px;
  }

  @media (max-width: ${breakpoints.sm}) {
    padding-left: 6px;
    padding-right: 6px;
  }
`;

const ArrivalSliderWrapper = styled.div`
  .custom-prev-arrow {
    top: 43%;
    left: -18px;
    @media (max-width: ${breakpoints.xxl}) {
      left: 24px;
    }

    @media (max-width: ${breakpoints.xs}) {
      left: 4px;
    }
  }

  .custom-next-arrow {
    top: 43%;
    right: -18px;
    @media (max-width: ${breakpoints.xxl}) {
      right: 24px;
    }

    @media (max-width: ${breakpoints.xs}) {
      right: 4px;
    }
  }
`;
//COMPONENTE QUE MUESTRA PRODUCTOS POR CATEGORIA (NOVEDADES)

const NewArrival = ({ newArrivalTitle, productos }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
  };
  return (
    <Section>
      <Container>
        <Title titleText={newArrivalTitle} />
        <ArrivalSliderWrapper>
          <Slider
            nextArrow={<CustomNextArrow />}
            prevArrow={<CustomPrevArrow />}
            {...settings}
          >
            {productos?.map((producto) => (
              /*<ProductCardBoxWrapper key={p.id} to={`/product/details/${p.id}`}>
                <div className="product-img">
                  <img
                    className="object-fit-cover"
                    src={p.images?.[0]?.imgSource}
                    alt={p.title}
                  />
                </div>*/
              /*<div className="product-info">
                <p className="font-semibold text-xl">{p.title}</p>
              </div>*/
              /* Info general */
              /*<div className="product-info">
                <p className="font-bold">{p.title}</p>
                <div className="flex items-center justify-between text-sm font-medium">
                  <span className="text-gray">{p.brand}</span>
                  <span className="text-outerspace font-bold">${p.price}</span>
                </div>
              </div>
            </ProductCardBoxWrapper>*/

              <ProductCardBoxWrapper key={producto.id} to={`/product/details/${producto.id}`}>
                <ProductItem producto={producto} />
              </ProductCardBoxWrapper>
            ))}
          </Slider>
        </ArrivalSliderWrapper>
      </Container>
    </Section >
  );
};

export default NewArrival;
