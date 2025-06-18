import { useEffect, useState } from "react";
import styled from "styled-components";
import Hero from "../../components/home/Hero";
import Featured from "../../components/home/Featured";
import NewArrival from "../../components/home/NewArrival";
import SavingZone from "../../components/home/SavingZone";
import Catalog from "../../components/home/Catalog";
import { limelightCatalog, mensCatalog, womensCatalog } from "../../data/data";
import Brands from "../../components/home/Brands";
import Feedback from "../../components/home/Feedback";
import { obtenerProductosPorCategoria } from "../../components/fetching/products.fetching";
import { obtenerCategorias } from "../../components/fetching/categories.fetching";

const HomeScreenWrapper = styled.main``;

const HomeScreen = () => {

  const [productosConDescuento, setProductosConDescuento] = useState([]);
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);
  const [productosNovedades, setProductosNovedades] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [conDescuentoResult, masVendidosResult, novedadesResult, categoriasResult] = await Promise.all([
          obtenerProductosPorCategoria(22),//22 CON DESCUENTO
          obtenerProductosPorCategoria(21),//21 MAS VENDIDOS
          obtenerProductosPorCategoria(20),//20 NOVEDADES
          obtenerCategorias()
        ]);
        setProductosConDescuento(conDescuentoResult);
        setProductosMasVendidos(masVendidosResult);
        setProductosNovedades(novedadesResult);
        setCategorias(categoriasResult);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>CARGANDO...</p>;
  if (error) return <p>ERROR: {error}</p>;

  return (
    <HomeScreenWrapper>
      <Hero />
      <Featured />

      <NewArrival newArrivalTitle={"Novedades"} productos={productosNovedades} />{/*muestra productos por categoria (NOVEDADES) ---SLIDER---*/}

      <NewArrival newArrivalTitle={"Mas vendidos"} productos={productosMasVendidos} />{/*muestra productos por categoria (MAS VENDIDOS) ---SLIDER---*/}

      <SavingZone savingZoneTitle={"Categorias"} categorias={categorias} />{/*muestra categorias*/}

      <NewArrival newArrivalTitle={"Con decuento"} productos={productosConDescuento} />{/*muestra productos por categoria (CON DESCUENTO) ---SLIDER---*/}

      {/*<Catalog catalogTitle={"Productos mas vendidos"} productos={productosMasVendidos} />*/}{/*muestra productos por categoria (MAS VENDIDOS)*/}
      
      <Brands />
      <Feedback />
    </HomeScreenWrapper>
  );
};

export default HomeScreen;
