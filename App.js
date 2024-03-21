import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import ProductsFormScreen from "./screens/ProductsFormScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Abarotes TI',
            headerStyle: { backgroundColor: "#596276" },
            headerTitleStyle: { color: "#fff" },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("ProductsFromScreen")}
              >
                <Text style={{color: '#fff', marginRight: 20, fontSize: 15}}>Nuevo</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="ProductsFromScreen"
          component={ProductsFormScreen}
          options={{
            title: 'Crea un nuevo producto',
            headerStyle: {
              backgroundColor: '#596276'
            },
            headerTitleStyle: {
              color: '#fff'
            },
            headerTintColor: '#fff'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
