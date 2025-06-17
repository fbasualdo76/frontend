import styled from "styled-components";
import { Container, Section } from "../../styles/styles";
import Title from "../common/Title";
import { savingZoneData } from "../../data/data";
import { BaseLinkOutlineWhite } from "../../styles/button";
import { breakpoints } from "../../styles/themes/default";

const ProductGridWrapper = styled.div`
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
`;

const ProductCardOverlayWrapper = styled.div`
  position: relative;
  height: 390px;
  border-radius: 12px;
  overflow: hidden;  

${({ $index }) => {//INDEX VIENE DEL .map() DEL COMPONENTE <ProductCardOverlayWrapper $index={index} />.
    const pos = $index % 11;//REINICIA EL PATRON CADA 11 CATEGORIAS.
    switch (pos) {
      // 🟠 Tres medianos
      case 0: return `grid-column: 1 / 3;`;
      case 1: return `grid-column: 3 / 5;`;
      case 2: return `grid-column: 5 / 7;`;

      // 🔵 Dos grandes
      case 3: return `
        grid-column: 1 / 4;
        @media (max-width: ${breakpoints.lg}) {
          grid-column: 1 / 3;
        }
      `;
      case 4: return `
        grid-column: 4 / 7;
        @media (max-width: ${breakpoints.lg}) {
          grid-column: 3 / 5;
        }
      `;
      // 🟢 Seis chicas (una columna cada una)
      case 5: return `
      grid-column: 1 / 2;
      @media (max-width: ${breakpoints.lg}) {
          grid-column: 5 / 7;
        }
      `;
      case 6: return `
      grid-column: 2 / 3;
      @media (max-width: ${breakpoints.lg}) {
          grid-column: 1 / 3;
        }      
      `;
      case 7: return `
      grid-column: 3 / 4;
      @media (max-width: ${breakpoints.lg}) {
          grid-column: 3 / 5;
        }      
      `;
      case 8: return `
      grid-column: 4 / 5;
      @media (max-width: ${breakpoints.lg}) {
          grid-column: 5 / 7;
        }
      `;
      case 9: return `grid-column: 5 / 6;
      @media (max-width: ${breakpoints.lg}) {
          grid-column: 1 / 4;
        }
      `;
      case 10: return `grid-column: 6 / 7;
      @media (max-width: ${breakpoints.lg}) {
          grid-column: 4 / 7;
        }
      `;

      default: return `grid-column: auto;`;
    }
  }}

  @media (max-width: ${breakpoints.md}) {
    grid-column: 1 / 7; /* 100% ancho en pantallas pequeñas */
  }

  &::after{
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
  }

  .product-info{
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    padding: 32px 24px;
    width: 230px;

    .info-badge{
        min-width: 100px;
        height: 34px;
    }
    .info-title{
        font-size: 28px;
        margin: 14px 0;
    }
    .discount-text{
        margin-top: 4px;
    }
    .info-arrow{
        margin: 16px 0 16px auto;
        width: 110px;
    }

    @media(max-width: ${breakpoints.xl}){
        padding: 16px;
    }
  }
`;
//COMPONENTE QUE MUESTRA LAS CATEGORIAS.

const SavingZone = ({ categorias }) => {
  return (
    <Section>
      <Container>
        <Title titleText={"Categorias"} />
        <ProductGridWrapper className="grid">

          {categorias?.map((cat, index) => {
            /*
            CAT ES UNA CATEGORIA INDIVIDUAL, POR EJEMPLO:, { id: 3, category_name: 'Mujer', ... }
            INDEX ES LA POSICION NUMERICA DE LA CATEGORIA (ITEM) DENTRO DEL ARRAY (EMPIEZA EN CERO).
            */
            return (
              <ProductCardOverlayWrapper
                className="product-card-overlay text-white"
                key={cat.id}
                $index={index}
              /*
              $index ES UNA PROP QUE ESTAMOS ENVIANDO HomeScreen HACIA EL styled-component ProductCardOverlayWrapper.
              Nota: Lo llamamos $index solo por convención: en styled-components, todas las props que empiezan con $ no se aplican como atributos HTML (es decir, no terminan visibles en el DOM), pero sí se pueden usar internamente en el CSS.
              LO USAMOS PARA SABER EN QUE POSICION DEL PATRO DE 11 ESTA CADA TARJETA.
              */
              >
                <img
                  /*src={savingZone.imgSource}
                  className="object-fit-cover"
                  alt=""*/
                  src={cat.image_url}
                  className="object-fit-cover"
                  alt={cat.category_name}
                />

                <div className="product-info text-end w-full h-full">
                  <div className="info-badge text-white text-xs bg-outerspace inline-flex items-center justify-center">
                    Categoría
                  </div>
                  <h4 className="info-title font-semibold">
                    {cat.category_name}
                  </h4>
                  <p className="info-text text-base">Explorá los productos</p>
                  <div className="info-arrow flex items-center justify-center text-xxl">
                    <i className="bi bi-arrow-down"></i>
                  </div>

                  <BaseLinkOutlineWhite
                    as={BaseLinkOutlineWhite}
                    to={`/products/category/${cat.id}`}
                    className="uppercase"
                  >
                    ver productos
                  </BaseLinkOutlineWhite>
                </div>

              </ProductCardOverlayWrapper>
            );
          })}
        </ProductGridWrapper>
      </Container>
    </Section>
  );
};

export default SavingZone;
