import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Input } from "@rneui/themed";
import { Button } from "@rneui/base";

export default function LoginScreen({ navigation }) {
  const { top } = useSafeAreaInsets();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    navigation.navigate("HomeScreen");
  };

  return (
    <SafeAreaView style={{ top: top, ...styles.containerLogin }}>
      <View style={{ marginHorizontal: 20 }}>
        <Text style={styles.title}>Iniciar sesion</Text>

        <View>
          <Input
            placeholder="Email"
            placeholderTextColor={"white"}
            inputStyle={{ color: "white" }}
            onChangeText={(text) => setUser({ ...user, email: text })}
          />
          <Input
            placeholder="Contraseña"
            placeholderTextColor={"white"}
            inputStyle={{ color: "white" }}
            secureTextEntry={true}
            onChangeText={(text) => setUser({ ...user, password: text })}
          />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Button
            title={"Ingresar"}
            type="outline"
            containerStyle={{
              backgroundColor: "#00ffa8",
              width: 200,
            }}
            buttonStyle={{
              borderColor: "#00ffa8",
              border: 1,
            }}
            titleStyle={{ color: "black" }}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerLogin: {
    backgroundColor: "#161717",
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: "whitesmoke",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 50,
  },
});
