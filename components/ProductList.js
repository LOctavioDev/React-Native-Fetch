import { FlatList, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import { getAllG, deleteProduct } from "../api";
import { useIsFocused } from "@react-navigation/native";

const ProductList = () => {
  const [products, setProduct] = useState([]);
  const [refresing, setRefresing] = useState(false);

  const isFocused = useIsFocused();

  const loadGr = async () => {
    const data = await getAllG();
    setProduct(data);
    console.log("CARGANDO");
  };

  useEffect(() => {
    loadGr();
  }, [isFocused]);

  const handleDelete = async (barcode) => {
    await deleteProduct(barcode);
    await loadGr();
  };

  const rednerItem = ({ item }) => {
    return <ProductItem product={item} handleDelete={handleDelete} />;
  };

  const onRefresh = React.useCallback(async () => {
    setRefresing(true);
    await loadGr();
    setRefresing(false);
  });

  return (
    <FlatList
      style={{ width: "100%" }}
      data={products}
      keyExtractor={(item) => item._id}
      renderItem={rednerItem}
      refreshControl={
        <RefreshControl refreshing={refresing} onRefresh={onRefresh} />
      }
    />
  );
};

export default ProductList;
