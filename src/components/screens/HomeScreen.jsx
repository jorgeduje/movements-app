import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, color } from "@rneui/base";
import CardMovement from "../common/CardMovement";
import CardMovementSkelenton from "../common/CardMovementSkelenton";
import { useEffect } from "react";
import { db } from "../../firebaseConfig";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";

export default function HomeScreen({ navigation }) {
  const { top } = useSafeAreaInsets();

  const [showMoney, setShowMoney] = useState(true);
  const [movements, setMovents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [movementToDelete, setMovementToDelete] = useState(null);
  const [isDelete, setIsDelete] = useState();

  const handleModal = (movement) => {
    setModalVisible(true);
    setMovementToDelete(movement);
  };

  const confirmDelete = async () => {
    setIsDelete(true);
    setModalVisible(false);
    setMovents([]);

    await deleteDoc(doc(db, "movements", movementToDelete.id));
    setMovementToDelete(null);
  };

  let totalAmount = movements.reduce((acc, movement) => {
    return acc + movement.amount;
  }, 0);

  useEffect(() => {
    setIsDelete(false);
    let movementsCollection = collection(db, "movements");
    getDocs(movementsCollection)
      .then((res) => {
        let arrayMovements = res.docs.map((movement) => {
          return { id: movement.id, ...movement.data() };
        });
        setMovents(arrayMovements);
      })
      .catch((error) => console.log(error));
  }, [isDelete]);

  return (
    <SafeAreaView
      style={{
        top: top,
        flex: 1,
        backgroundColor: "#161717",
      }}
    >
      <ScrollView
        style={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* ACA LA TARJETA DEL SALDO  */}
        <View style={styles.containerAmount}>
          <Text style={styles.title}>Tu saldo</Text>

          <View style={styles.cardMoney}>
            <FontAwesome name="money" size={40} color="#00ffa8" />
            {showMoney ? (
              <Text style={{ color: "white", fontSize: 25 }}>
                {totalAmount.toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                })}
                .-
              </Text>
            ) : (
              <Text style={{ color: "white", fontSize: 25 }}>$ ****** .-</Text>
            )}

            {showMoney ? (
              <Ionicons
                name="eye-off-sharp"
                size={40}
                color="#00ffa8"
                onPress={() => setShowMoney(false)}
              />
            ) : (
              <Ionicons
                name="eye-sharp"
                size={40}
                color="#00ffa8"
                onPress={() => setShowMoney(true)}
              />
            )}
          </View>
        </View>

        {/* ACA LAS MINI TARJETAS  */}
        <View style={styles.containerMiniCards}>
          <TouchableOpacity
            style={styles.miniCard}
            onPress={() => navigation.navigate("Cvu")}
            activeOpacity={0.5}
          >
            <FontAwesome name="newspaper-o" size={24} color="#00ffa8" />
            <Text style={{ color: "white" }}>CVU</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.miniCard} activeOpacity={0.5}>
            <MaterialIcons name="graphic-eq" size={24} color="#00ffa8" />
            <Text style={{ color: "white" }}>Historial</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.miniCard} activeOpacity={0.5}>
            <FontAwesome name="credit-card" size={24} color="#00ffa8" />
            <Text style={{ color: "white" }}>Tarjetas</Text>
          </TouchableOpacity>
        </View>

        {/* EL SUBTITULO DE MOVIMIENTOS Y EL BOTON DE AGREGAR 0 */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Text style={{ fontSize: 16, color: "white" }}>
            Ultimos movimientos
          </Text>
          <Button
            title={"Agregar movimiento"}
            type="outline"
            containerStyle={{
              width: 170,
              backgroundColor: "#00ffa8",
              borderRadius: 5,
            }}
            titleStyle={{ color: "black" }}
            buttonStyle={{ borderWidth: 1, borderColor: "#00ffa8" }}
            onPress={() => navigation.replace("NewMovement")}
          />
        </View>

        {/* EL LISTADO DE MOVIMIENTO  */}

        <View style={styles.containerMovements}>
          {movements.length === 0 && (
            <>
              <CardMovementSkelenton />
              <CardMovementSkelenton />
              <CardMovementSkelenton />
              <CardMovementSkelenton />
            </>
          )}

          {movements.map((movement) => (
            <CardMovement
              key={movement.id}
              movement={movement}
              showMoney={showMoney}
              handleModal={handleModal}
            />
          ))}
        </View>
      </ScrollView>
      {/* MODAL */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.textModal}>
              Seguro quieres eliminar {movementToDelete?.name} ?
            </Text>
            <View style={{ gap: 15 }}>
              <Button
                title={"Si, eliminar"}
                type="outline"
                containerStyle={{
                  width: 170,
                  backgroundColor: "#161717",
                  borderRadius: 5,
                }}
                titleStyle={{
                  color: "whitesmoke",
                }}
                buttonStyle={{
                  borderWidth: 1,
                  borderColor: "#161717",
                }}
                onPress={confirmDelete}
              />
              <Button
                title={"No, cancelar"}
                type="outline"
                containerStyle={{
                  width: 170,
                  backgroundColor: "#161717",
                  borderRadius: 5,
                }}
                titleStyle={{
                  color: "whitesmoke",
                }}
                buttonStyle={{
                  borderWidth: 1,
                  borderColor: "#161717",
                }}
                onPress={() => {
                  setModalVisible(false);
                  setMovementToDelete(null);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    marginHorizontal: 20,
    paddingVertical: 20,
  },
  containerAmount: {
    backgroundColor: "#282929",
    borderRadius: 5,
    color: "white",
  },
  title: {
    color: "white",
    fontSize: 20,
    paddingLeft: 10,
    paddingTop: 10,
  },
  cardMoney: {
    flexDirection: "row",
    height: 80,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 40,
  },
  containerMiniCards: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  miniCard: {
    backgroundColor: "#282929",
    width: 120,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  containerMovements: {
    minHeight: 300,
    backgroundColor: "#282929",
    borderRadius: 5,
    marginBottom: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "#00ffa8",
    borderRadius: 5,
    padding: 25,
    alignItems: "center",
    margin: 20,
  },
  textModal: {
    color: "#282929",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 15,
  },
});
