import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Layout from "../components/Layout";
import { saveProduct, getProduct, updateProduct } from "../api";

const ProductsFormScreen = ({ navigation, route }) => {
  const [product, setProduct] = useState({
    barcode: "",
    description: "",
    brand: "",
    price: 0,
    cost: 0,
    stock: 0,
    expiredDate: new Date(),
    status: false,
  });

  const [editing, setEditing] = useState(false);

  console.log(route.params);

  const handleChange = (name, value) => {
    if (name === "price" || name === "cost") {
      value = parseFloat(value);
    } else if (name === "stock") {
      value = parseInt(value);
    }
    setProduct({ ...product, [name]: value });
  };

  const handleSumbit = async () => {
    try {
      if (!editing) {
        await saveProduct(product);
      } else {
        await updateProduct(route.params.barcode, product);
      }
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = (value) => {
    setProduct({ ...product, status: value });
  };

  useEffect(() => {
    if (route.params && route.params.barcode) {
      navigation.setOptions({ headerTitle: "Actualizar un producto" });
      setEditing(true);
      (async () => {
        const product = await getProduct(route.params.barcode);
        setProduct({
          barcode: product.barcode,
          description: product.description,
          brand: product.brand,
          price: String(product.price),
          cost: String(product.cost),
          stock: String(product.stock),
          expiredDate: new Date(product.expiredDate),
          status: product.status,
        });
      })();
    }
  }, []);

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          placeholder="Barcode"
          placeholderTextColor="#9A9B9C"
          style={styles.input}
          onChangeText={(text) => handleChange("barcode", text)}
          value={product.barcode}
        />
        <TextInput
          placeholder="Descrpcion"
          placeholderTextColor="#9A9B9C"
          style={styles.input}
          onChangeText={(text) => handleChange("description", text)}
          value={product.description}
        />
        <TextInput
          placeholder="Marca"
          placeholderTextColor="#9A9B9C"
          style={styles.input}
          onChangeText={(text) => handleChange("brand", text)}
          value={product.brand}
        />
        <TextInput
          placeholder="Precio"
          placeholderTextColor="#9A9B9C"
          keyboardType="numeric"
          style={styles.input}
          onChangeText={(text) => handleChange("price", text)}
          value={product.price.toString()}
        />
        <TextInput
          placeholder="Costo"
          placeholderTextColor="#9A9B9C"
          keyboardType="numeric"
          style={styles.input}
          onChangeText={(text) => handleChange("cost", text)}
          value={product.cost.toString()}
        />
        <TextInput
          placeholder="Cantidad"
          placeholderTextColor="#9A9B9C"
          keyboardType="numeric"
          style={styles.input}
          onChangeText={(text) => handleChange("stock", text)}
          value={product.stock.toString()}
        />
        <View style={styles.inputContainer}>
          <Text
            style={{
              marginVertical: 10,
              fontSize: 18,
              color: "#9A9B9C",
              textAlign: "center",
            }}
          >
            Fecha de Expiración:
          </Text>
          <DateTimePicker
            style={styles.dateTimePicker}
            mode="date"
            display="spinner"
            onChange={(event, date) => handleChange("expiredDate", date)}
            value={product.expiredDate}
          />
        </View>
        <Text style={styles.inputLabel}>Estatus:</Text>
        <View style={styles.statusContainer}>
          <TouchableOpacity
            style={[
              styles.statusButton,
              product.status ? styles.activeStatusButton : null,
            ]}
            onPress={() => handleStatusChange(true)}
          >
            <Text style={styles.statusButtonText}>Activo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.statusButton,
              !product.status ? styles.activeStatusButton : null,
            ]}
            onPress={() => handleStatusChange(false)}
          >
            <Text style={styles.statusButtonText}>Inactivo</Text>
          </TouchableOpacity>
        </View>

        {!editing ? (
          <TouchableOpacity style={styles.buttonSave} onPress={handleSumbit}>
            <Text style={styles.textButton}>Guardar Producto</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buttonSave} onPress={handleSumbit}>
            <Text style={styles.textButton}>Actualizar Producto</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "90%",
    marginBottom: 8,
    fontSize: 20,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "gray",
    height: 50,
    color: "black",
    padding: 10,
    textAlign: "center",
  },
  statusContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  statusButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: "#eeeeee",
  },
  activeStatusButton: {
    backgroundColor: "#596276",
  },
  statusButtonText: {
    color: "#000000",
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    marginBottom: 5,
    fontSize: 18,
    color: "#9A9B9C",
  },
  buttonSave: {
    paddingTop: 15,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: "#596276",
    width: "80%",
    height: 45,
  },
  textButton: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
  },
  datePickerContainer: {
    marginTop: 10,
  },
  datePickerLabel: {
    fontSize: 18,
    marginBottom: 5,
  },
  dateTimePicker: {
    width: "100%",
    borderRadius: 8,
    marginBottom: 8,
    padding: 10,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductsFormScreen;
