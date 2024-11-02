import styled from "styled-components";
//import { products } from "../../data/data";
import ProductItem from "./ProductItem";
import { PropTypes } from "prop-types";
import { breakpoints } from "../../styles/themes/default";
import { useState, useEffect } from "react";
import { obtenerProductos } from "../fetching/products.fetching";

const ProductListWrapper = styled.div`
  column-gap: 20px;
  row-gap: 40px;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));

  @media (max-width: ${breakpoints.sm}) {
    gap: 12px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;
const ProductList = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorText, setErrorText] = useState('')
  //const navigate = useNavigate()

  useEffect(() => {
    //verifyToken()
    //.then(result => {//.then es otra forma de resolver promesas. El result es el retorno de la función asíncrona en fetching/auth.fetching.js/verifyToken.
    //console.log(result)
    //if (!result.status == 200) {
    //navigate('/login')
    //}
    //})
    const fetchData = async () => {
      try {
        const productosObtenidos = await obtenerProductos()
        //console.log(productosObtenidos)
        setLoading(false)
        setProducts(productosObtenidos)
        setErrorText('')
      } catch (error) {//4. captura el error que viene el products.fetching y setea el mensaje en el estado de errorText.
        //console.error('Error al obtener los productos:', error)
        setErrorText(error.message)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      {errorText && <span style={{ color: 'red' }}>{errorText}</span>}{/*si hay error lo muestra aca.*/}
      {loading ? <h2>CARGANDO PRODUCTOS...</h2> :
        <ProductListWrapper className="grid">
          {products?.map((product) => {
            return <ProductItem key={product.id} product={product} />;
          })}
        </ProductListWrapper>
      }
    </>
  );
};
export default ProductList;
ProductList.propTypes = {
  products: PropTypes.array,
};
