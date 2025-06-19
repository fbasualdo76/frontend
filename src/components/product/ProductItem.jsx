import { Link } from "react-router-dom";
import styled from "styled-components";
import { commonCardStyles } from "../../styles/card";
import { breakpoints, defaultTheme } from "../../styles/themes/default";

const ProductCardWrapper = styled(Link)`//Este es de ProductItem.jsx.
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

const ProductDetailsWrapper = styled.div`//copiado de ProductDetailsScreen.jsx.
  //border: 1px solid rgba(0, 0, 0, 0.1);
  //padding: 24px;

  @media (max-width: ${breakpoints.sm}) {
    padding: 16px;
  }

  @media (max-width: ${breakpoints.xs}) {
    padding: 12px;
  }

  .prod-title {
    margin-bottom: 0px;//ANTES 10px
  }
  .rating-and-comments {
    column-gap: 16px;
    //margin-bottom: 20px;

  }
  .prod-rating {
    column-gap: 10px;
  }
  .prod-comments {
    column-gap: 10px;
  }
  .prod-add-btn {
    min-width: 160px;
    column-gap: 8px;
    &-text {
      margin-top: 2px;
    }
  }

  .btn-and-price {
    margin-top: 36px;
    column-gap: 16px;
    row-gap: 10px;

    @media (max-width: ${breakpoints.sm}) {
      margin-top: 24px;
    }
  }
`;

const ProductSizeWrapper = styled.div`//copiado de ProductDetailsScreen.jsx
  .prod-size-top {
    gap: 20px;
  }
  .prod-size-list {
    gap: 12px;
    //margin-top: 16px;
    padding-top: 5px;//NUEVO
    padding-bottom: 5px;//NUEVO
    @media (max-width: ${breakpoints.sm}) {
      gap: 8px;
    }
  }

  .prod-size-item {
    position: relative;
    height: 38px;
    width: 38px;
    cursor: pointer;

    @media (max-width: ${breakpoints.sm}) {
      width: 32px;
      height: 32px;
    }

    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 38px;
      height: 38px;
      opacity: 0;
      cursor: pointer;

      @media (max-width: ${breakpoints.sm}) {
        width: 32px;
        height: 32px;
      }

      &:checked + span {
        color: ${defaultTheme.color_white};
        background-color: ${defaultTheme.color_outerspace};
        border-color: ${defaultTheme.color_outerspace};
      }
    }

    span {
      width: 38px;
      height: 38px;
      border-radius: 8px;
      border: 1.5px solid ${defaultTheme.color_silver};
      text-transform: uppercase;

      @media (max-width: ${breakpoints.sm}) {
        width: 32px;
        height: 32px;
      }
    }
  }
`;

const ProductColorWrapper = styled.div`//copiado de ProductDetailsScreen.jsx
  //margin-top: 32px;
  padding-bottom: 5px;//NUEVO

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
      //scale: 0.9;
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
  const uniqueColors = producto.colors || [];

  const stars = Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      className={`text-yellow ${index < Math.floor(producto.rating)
        ? "bi bi-star-fill"
        : index + 0.5 === producto.rating
          ? "bi bi-star-half"
          : "bi bi-star"
        }`}
    ></span>
  ));

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

      <ProductDetailsWrapper>{/*copiado de ProductDetailsScreen.jsx.*/}

        {/* Info general */}
        <div className="product-info">
          <p className="font-bold">{producto.title}</p>
          <div className="flex items-center justify-between text-sm font-medium">
            <span className="text-gray">{producto.brand}</span>
            <span className="text-outerspace font-bold">${producto.price}</span>
          </div>
        </div>

        {/*ESTRELLAS Y COMENTARIOS */}
        <div className="flex items-center rating-and-comments flex-wrap">
          <div className="prod-rating flex items-center">
            {stars}
            <span className="text-gray text-xs">{producto.rating}</span>
          </div>
          {/*<div className="prod-comments flex items-start">
          <span className="prod-comment-icon text-gray">
            <i className="bi bi-chat-left-text"></i>
          </span>
          <span className="prod-comment-text text-sm text-gray">
            {producto.comments_count} comment(s)
          </span>
        </div>*/}
        </div>

        {/*TAMANOS */}
        <ProductSizeWrapper>
          {/*<div className="prod-size-top flex items-center flex-wrap">
          <p className="text-lg font-semibold text-outerspace">
            Select size
          </p>
          <Link to="/" className="text-lg text-gray font-medium">
            Size Guide &nbsp; <i className="bi bi-arrow-right"></i>
          </Link>
        </div>*/}
          <div className="prod-size-list flex items-center">
            {producto.sizes.map((size, index) => (
              <div className="prod-size-item" key={index}>
                <input
                  type="radio"
                  name="size"
                //value={size}
                //checked={selectedSize === size}
                //onChange={(e) => setSelectedSize(e.target.value)}
                />
                <span className="flex items-center justify-center font-medium text-outerspace text-sm">
                  {size}
                </span>
              </div>
            ))}
          </div>
        </ProductSizeWrapper>

        {/* Colores */}
        {uniqueColors?.length > 0 && (
          <ProductColorWrapper>
            <div className="prod-colors-list flex items-center gap-2">
              {uniqueColors.map((color, index) => {
                const isWhite = color.code?.toLowerCase() === '#ffffff';
                return (
                  <div className="prod-colors-item" key={index}>
                    <span
                      className="prod-colorbox"
                      title={color.name}
                      style={{
                        background: color.code?.trim() || '#000',
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

      </ProductDetailsWrapper>

    </ProductCardWrapper>
  );
};
export default ProductItem;
