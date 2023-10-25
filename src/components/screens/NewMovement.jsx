import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Input } from "@rneui/base";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { useEffect } from "react";
import { db } from "../../firebaseConfig";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";

export default function NewMovement({ navigation }) {
  const { top } = useSafeAreaInsets();
  const [typeMovement, setTypeMovement] = useState("Ingreso");
  const [movement, setMovement] = useState({
    amount: 0,
    name: "",
    userAvatar: "",
  });

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 1000);
    const imageUrl = `https://picsum.photos/200/200?random=${randomNumber}`;
    setMovement({ ...movement, userAvatar: imageUrl });
  }, []);

  const addNewMovement = () => {
    const amount =
      typeMovement === "Ingreso"
        ? Number(movement.amount)
        : -Number(movement.amount);

    let newMovement = {
      ...movement,
      amount,
      date: serverTimestamp(),
    };

    const movementCollection = collection(db, "movements");
    addDoc(movementCollection, newMovement).then(() => {
      navigation.navigate("HomeScreen");
    });
  };

  return (
    <SafeAreaView
      style={{
        top: top,
        flex: 1,
        backgroundColor: "#161717",
      }}
    >
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontSize: 30,
          marginVertical: 30,
        }}
      >
        Agregar Movimiento
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 20,
        }}
      >
        {/* Aca el boton ingreso */}
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Button
            title={"Ingreso"}
            type="outline"
            containerStyle={{
              width: 150,
              backgroundColor:
                typeMovement === "Ingreso" ? "#00ffa8" : "transparent",
            }}
            titleStyle={{
              color: typeMovement === "Ingreso" ? "black" : "white",
            }}
            buttonStyle={{ borderWidth: 1, borderColor: "#00ffa8" }}
            onPress={() => setTypeMovement("Ingreso")}
          />
        </View>

        {/* Aca el boton egresp */}
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Button
            title={"Egreso"}
            type="outline"
            containerStyle={{
              width: 150,
              backgroundColor:
                typeMovement === "Egreso" ? "#00ffa8" : "transparent",
            }}
            titleStyle={{
              color: typeMovement === "Egreso" ? "black" : "white",
            }}
            buttonStyle={{ borderWidth: 1, borderColor: "#00ffa8" }}
            onPress={() => setTypeMovement("Egreso")}
          />
        </View>
      </View>

      <View style={styles.containerForm}>
        <Input
          placeholder="Monto"
          placeholderTextColor={"white"}
          inputStyle={{ color: "white" }}
          keyboardType="numeric"
          onChangeText={(text) => setMovement({ ...movement, amount: text })}
        />
        <Input
          placeholder={typeMovement === "Ingreso" ? "Origen" : "Destino"}
          placeholderTextColor={"white"}
          inputStyle={{ color: "white" }}
          onChangeText={(text) => setMovement({ ...movement, name: text })}
        />
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Button
            title={"Agregar"}
            type="outline"
            containerStyle={{
              width: 170,
              backgroundColor: "#00ffa8",
              borderRadius: 5,
            }}
            titleStyle={{ color: "black" }}
            buttonStyle={{ borderWidth: 1, borderColor: "#00ffa8" }}
            onPress={addNewMovement}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 60,
        }}
      >
        <Button
          title={"Regresar"}
          type="outline"
          containerStyle={{
            width: 170,
            backgroundColor: "#00ffa8",
            borderRadius: 5,
          }}
          titleStyle={{ color: "black" }}
          buttonStyle={{ borderWidth: 1, borderColor: "#00ffa8" }}
          onPress={() => navigation.navigate("HomeScreen")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerForm: {
    backgroundColor: "#292829",
    borderRadius: 5,
    padding: 20,
    marginHorizontal: 20,
  },
});
