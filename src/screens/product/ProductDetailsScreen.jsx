import styled from "styled-components";
import { Container } from "../../styles/styles";
import Breadcrumb from "../../components/common/Breadcrumb";
import { product_one } from "../../data/data";
import ProductPreview from "../../components/product/ProductPreview";
import { BaseLinkGreen } from "../../styles/button";
import { currencyFormat } from "../../utils/helper";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import ProductDescriptionTab from "../../components/product/ProductDescriptionTab";
import ProductSimilar from "../../components/product/ProductSimilar";
import ProductServices from "../../components/product/ProductServices";
import React, { useEffect, useState } from 'react'
import { obtenerDetalleProducto } from '../../components/fetching/products.fetching.js'
import { Link, useParams, useNavigate } from "react-router-dom";
import { validateSizeAndColor } from "../../utils/helper";

const DetailsScreenWrapper = styled.main`
  margin: 40px 0;
`;

const DetailsContent = styled.div`
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;

  @media (max-width: ${breakpoints.xl}) {
    gap: 24px;
    grid-template-columns: 3fr 2fr;
  }

  @media (max-width: ${breakpoints.lg}) {
    grid-template-columns: 100%;
  }
`;

const ProductDetailsWrapper = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 24px;

  @media (max-width: ${breakpoints.sm}) {
    padding: 16px;
  }

  @media (max-width: ${breakpoints.xs}) {
    padding: 12px;
  }

  .prod-title {
    margin-bottom: 10px;
  }
  .rating-and-comments {
    column-gap: 16px;
    margin-bottom: 20px;

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

const ProductSizeWrapper = styled.div`
  .prod-size-top {
    gap: 20px;
  }
  .prod-size-list {
    gap: 12px;
    margin-top: 16px;
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

const ProductColorWrapper = styled.div`
  margin-top: 32px;

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

const ProductDetailsScreen = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState(null)
  const [errorText, setErrorText] = useState('')

  //ESTADOS PARA EL TALLE Y COLOR.
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const navigate = useNavigate()

  useEffect(() => {
    /*--verifyToken()
      --.then(result => {//.then es otra forma de resolver promesas. El result es el retorno de la función asíncrona en fetching/auth.fetching.js/verifyToken.
        --//console.log(result)
        --if (!result.status == 200) {
          --navigate('/login')
        --}
      --})*/
    const fetchData = async () => {
      try {
        const productoObtenido = await obtenerDetalleProducto(id)

        //console.log(productoObtenido)

        setLoading(false)
        setProduct(productoObtenido)
        setErrorText('')
      } catch (error) {//4. captura el error que viene el products.fetching y setea el mensaje en el estado de errorText.        
        setErrorText(error.message)
      }
    }
    fetchData()
  }, [/*id*/])

  const stars = Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      className={`text-yellow ${index < Math.floor(product_one.rating)
        ? "bi bi-star-fill"
        : index + 0.5 === product_one.rating
          ? "bi bi-star-half"
          : "bi bi-star"
        }`}
    ></span>
  ));

  const breadcrumbItems = [
    { label: "Shop", link: "" },
    { label: "Women", link: "" },
    { label: "Top", link: "" },
  ];

  const agregarAlCarrito = () => {
    try {
      //Validamos que se haya seleccionado un talle y color
      validateSizeAndColor(selectedSize, selectedColor);
      //Obtener el carrito actual desde localStorage
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      //Verificar si el producto ya está en el carrito con el mismo talle y color
      const existingProductIndex = cartItems.findIndex(
        (item) =>
          item.id === product.id &&
          item.size === selectedSize &&
          item.color === selectedColor
      );
      if (existingProductIndex !== -1) {
        //Si el producto ya existe, incrementar la cantidad
        cartItems[existingProductIndex].quantity += 1;
      } else {
        //Si es un producto nuevo, agregarlo al carrito
        cartItems.push({
          id: product.id,
          title: product.title,
          color: selectedColor,
          size: selectedSize,
          price: product.price,
          quantity: 1,
          //shipping: 0,
          imgSource: product.images[0]?.imgSource || "",
        });
      }
      //Guardar el carrito actualizado en localStorage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      //Agregar un pequeño delay para asegurar que el almacenamiento se complete
      setTimeout(() => {
        navigate("/cart");// Redirigir al carrito
      }, 100);
    } catch (error) {
      setErrorText(error.message); // Mostrar mensaje de error si la validación falla
    }
  };

  return (
    <>
      {errorText && <span style={{ color: 'red' }}>{errorText}</span>}{/*si hay error lo muestra aca.*/}
      {loading ? <h2>CARGANDO PRODUCTO...</h2> :
        <DetailsScreenWrapper>
          <Container>
            <Breadcrumb items={breadcrumbItems} />
            <DetailsContent className="grid">
              <ProductPreview previewImages={product.images} product={product} />
              <ProductDetailsWrapper>
                <h2 className="prod-title">{product.title}{product.rating}</h2>

                <h2>PAGINA QUE MUESTRA EL DETALLE DEL PRODUCTO "ProductPreview", ENTRE OTROS COMPONENTES.</h2>

                <div className="flex items-center rating-and-comments flex-wrap">
                  <div className="prod-rating flex items-center">
                    {stars}
                    <span className="text-gray text-xs">{product.rating}</span>
                  </div>
                  <div className="prod-comments flex items-start">
                    <span className="prod-comment-icon text-gray">
                      <i className="bi bi-chat-left-text"></i>
                    </span>
                    <span className="prod-comment-text text-sm text-gray">
                      {product.comments_count} comment(s)
                    </span>
                  </div>
                </div>

                <ProductSizeWrapper>
                  <div className="prod-size-top flex items-center flex-wrap">
                    <p className="text-lg font-semibold text-outerspace">
                      Select size
                    </p>
                    <Link to="/" className="text-lg text-gray font-medium">
                      Size Guide &nbsp; <i className="bi bi-arrow-right"></i>
                    </Link>
                  </div>
                  <div className="prod-size-list flex items-center">
                    {product.sizes.map((size, index) => (
                      <div className="prod-size-item" key={index}>
                        <input
                          type="radio"
                          name="size"
                          value={size}
                          checked={selectedSize === size}
                          onChange={(e) => setSelectedSize(e.target.value)}
                        />
                        <span className="flex items-center justify-center font-medium text-outerspace text-sm">
                          {size}
                        </span>
                      </div>
                    ))}
                  </div>
                </ProductSizeWrapper>

                <ProductColorWrapper>
                  <div className="prod-colors-top flex items-center flex-wrap">
                    <p className="text-lg font-semibold text-outerspace">Colours Available</p>
                  </div>
                  <div className="prod-colors-list flex items-center">
                    {product.colors.map((color, index) => (
                      <div className="prod-colors-item" key={index}>
                        <input
                          type="radio"
                          name="colors"
                          value={color.code}
                          checked={selectedColor === color.code}
                          onChange={(e) => setSelectedColor(e.target.value)}
                        />
                        <span
                          className="prod-colorbox"
                          style={{
                            backgroundColor: color.code,
                            border: color.code === '#FFFFFF' ? '1px solid #ccc' : 'none'
                          }}
                        ></span>
                      </div>
                    ))}
                  </div>
                </ProductColorWrapper>

                <div className="btn-and-price flex items-center flex-wrap">
                  <BaseLinkGreen
                    //to="/cart"
                    as={BaseLinkGreen}
                    className="prod-add-btn"
                    onClick={agregarAlCarrito}
                  >
                    <span className="prod-add-btn-icon">
                      <i className="bi bi-cart2"></i>
                    </span>
                    <span className="prod-add-btn-text">Add to cart</span>
                  </BaseLinkGreen>
                  <span className="prod-price text-xl font-bold text-outerspace">
                    {currencyFormat(product.price)}
                  </span>
                </div>
                <ProductServices />
              </ProductDetailsWrapper>
            </DetailsContent>
            <ProductDescriptionTab />
            <ProductSimilar />
          </Container>
        </DetailsScreenWrapper>
      }
    </>
  );
};
export default ProductDetailsScreen;