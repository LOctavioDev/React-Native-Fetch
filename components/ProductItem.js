import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ProductItem = ({ product, handleDelete }) => {
  const getStatusText = (status) => {
    return status ? "Activo" : "Inactivo";
  };

  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.itemContainer}>
      <View>
        <Text style={styles.title}>Barcode:</Text>
        <Text>{product.barcode}</Text>
      </View>
      <View>
        <Text style={styles.title}>Descripcion:</Text>
        <Text>{product.description}</Text>
      </View>
      <View>
        <Text style={styles.title}>Marca:</Text>
        <Text>{product.brand}</Text>
      </View>
      <View>
        <Text style={styles.title}>Precio:</Text>
        <Text>{product.price}</Text>
      </View>
      <View>
        <Text style={styles.title}>Costo:</Text>
        <Text>{product.cost}</Text>
      </View>
      <View>
        <Text style={styles.title}>Cantidad:</Text>
        <Text>{product.stock}</Text>
      </View>
      <View>
        <Text style={styles.title}>Fecha de Expiracion:</Text>
        <Text>{product.expiredDate}</Text>
      </View>
      <View>
        <Text style={styles.title}>Estatus:</Text>
        <Text>{getStatusText(product.status)}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(product.barcode)}
      >
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.updateButton}
        onPress={() => navigation.navigate("ProductsFromScreen", { barcode: product.barcode })}
      >
        <Text style={styles.deleteButtonText}>Editar</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    color: "#333",
    fontWeight: "bold",
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: "#DA3232",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },

  deleteButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  updateButton: {
    backgroundColor: "#8394DA",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
});

export default ProductItem;
