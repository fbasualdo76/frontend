import styled from "styled-components";
import { products } from "../../data/data";
import ProductItem from "./ProductItem";
import { breakpoints } from "../../styles/themes/default";

const ProductListWrapper = styled.div`
  column-gap: 20px;
  row-gap: 40px;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));

  @media (max-width: ${breakpoints.sm}) {
    gap: 12px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;
const ProductList = ({ productos }) => {
  return (
    <ProductListWrapper className="grid">
      {productos?.map((producto) => {
        return <ProductItem key={producto.id} producto={producto} />;
      })}
    </ProductListWrapper>
  );
}

export default ProductList;

