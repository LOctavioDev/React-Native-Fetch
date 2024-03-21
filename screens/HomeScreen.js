import { View, Text, Button } from "react-native";
import React from "react";

import ProductList from "../components/ProductList";
import Layout from "../components/Layout";

const HomeScreen = () => (
  <Layout>
    <ProductList />
  </Layout>
);

export default HomeScreen;
