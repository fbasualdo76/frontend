import { Link } from "react-router-dom";
import styled from "styled-components";
import { commonCardStyles } from "../../styles/card";
import { breakpoints, defaultTheme } from "../../styles/themes/default";

const ProductCardWrapper = styled(Link)`
  ${commonCardStyles}
  @media(max-width: ${breakpoints.sm}) {
    padding-left: 0;
    padding-right: 0;
  }

  .product-img {
    height: 393px;
    position: relative;

    @media (max-width: ${breakpoints.sm}) {
      height: 320px;
    }
  }

  .product-wishlist-icon {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
    border-radius: 100%;

    &:hover {
      background-color: ${defaultTheme.color_yellow};
      color: ${defaultTheme.color_white};
    }
  }
`;

const ProductColorWrapper = styled.div`//copiado de ProductDetailsScreen.jsx
  //margin-top: 32px;

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

      &:checked + span {
        outline: 1px solid ${defaultTheme.color_gray};
        outline-offset: 3px;
      }
    }

    .prod-colorbox {
      border-radius: 100%;
      width: 22px;
      height: 22px;
      display: inline-block;
    }
  }
`;

const ProductItem = ({ producto }) => {
  // Extraer colores únicos desde las variantes
  const uniqueColors = producto.variant?.reduce((acc, variant) => {
    if (!acc.find(c => c.id === variant.color.id)) {
      acc.push(variant.color);
    }
    return acc;
  }, []);

  return (

    <ProductCardWrapper key={producto.id} to={`/product/details/${producto.id}`}>

      {/* Imagen principal */}
      <div className="product-img">
        <img className="object-fit-cover" src={producto.images[0].imgSource} alt={producto.title} />

        <button
          type="button"
          className="product-wishlist-icon flex items-center justify-center bg-white"
        >
          <i className="bi bi-heart"></i>
        </button>
      </div>

      {/* Info general */}
      <div className="product-info">
        <p className="font-bold">{producto.title}</p>
        <div className="flex items-center justify-between text-sm font-medium">
          <span className="text-gray">{producto.brand}</span>
          <span className="text-outerspace font-bold">${producto.price}</span>
        </div>
      </div>

      {/* Colores */}
      {uniqueColors?.length > 0 && (
        <ProductColorWrapper>
          {/*<div className="prod-colors-top text-xs font-semibold text-gray-700 mb-1">
            Colores:
          </div>*/}
          <div className="prod-colors-list flex items-center gap-2">
            {uniqueColors.map((color) => {
              // Verificamos si el color es blanco.
              const isWhite = color.code?.toLowerCase() === '#ffffff';
              return (
                <div className="prod-colors-item" key={color.id}>
                  <span
                    className="prod-colorbox"
                    title={color.name}
                    style={{
                      // Aplicamos el color de fondo.
                      background: color.code?.trim() || '#000',
                      // Si el color es blanco, agregamos un borde gris claro para que se vea en el fondo blanco
                      border: isWhite ? '1px solid #ccc' : 'none'
                    }}
                  ></span>
                </div>
              );
            })}
          </div>
        </ProductColorWrapper>
      )}

      {/* Categorías */}
      {producto.categories?.length > 0 && (
        <div style={{ fontSize: '10px' }} className="mt- text-xs text-gray">
          {/*<span className="font-semibold text-gray-700">Categorías: </span>*/}
          {producto.categories.map((cat, index) => (
            <span key={cat.id}>
              {cat.name}{index < producto.categories.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
      )}

    </ProductCardWrapper>
  );
};
export default ProductItem;
