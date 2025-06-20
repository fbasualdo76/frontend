import { Container, Section } from "../../styles/styles";
import Title from "../common/Title";
import { PropTypes } from "prop-types";
import ProductList from "../product/ProductList";

const Catalog = ({ catalogTitle, productos }) => {
  return (
    <Section>
      <Container>
        <div className="categories-content">
          <Title titleText={catalogTitle} />
          <ProductList productos={productos} />
        </div>
      </Container>
    </Section>
  );
};

export default Catalog;

Catalog.propTypes = {
  catalogTitle: PropTypes.string,
  products: PropTypes.array,
};
