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

  const [productosNovedades, setProductosNovedades] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [novedadesResult, categoriasResult] = await Promise.all([
          obtenerProductosPorCategoria(20),//20 NOVEDADES
          obtenerCategorias()
        ]);
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

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <HomeScreenWrapper>
      <Hero />
      <Featured />
      <SavingZone categorias={categorias} />{/*muestra categorias*/}
      <NewArrival productos={productosNovedades} />{/*muestra productos por categoria (NOVEDADES)*/}
      <Catalog catalogTitle={"Categories For Men"} products={mensCatalog} />
      <Catalog catalogTitle={"Categories For Women"} products={womensCatalog} />
      <Brands />
      <Catalog catalogTitle={"In The LimeLight"} products={limelightCatalog} />
      <Feedback />
    </HomeScreenWrapper>
  );
};

export default HomeScreen;
