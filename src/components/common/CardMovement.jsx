import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Avatar } from "@rneui/base";
import { StyleSheet } from "react-native";

export default function CardMovement({ movement, showMoney }) {
  const dateFormat = new Date(movement?.date?.seconds * 1000);
  const formatDate = `${dateFormat.getDate()}/${(dateFormat.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${dateFormat.getFullYear()} ${(dateFormat.getHours() - 3)
    .toString()
    .padStart(2, "0")}:${dateFormat.getMinutes().toString().padStart(2, "0")} `;

  return (
    <TouchableOpacity style={styles.cardMovement}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
        <Avatar
          size={32}
          rounded
          source={{
            uri:
              movement.userAvatar ||
              "https://randomuser.me/api/portraits/men/35.jpg",
          }}
        />
        <View style={{ width: 150 }}>
          <Text style={{ color: "white", fontSize: 16, maxWidth: 150 }}>
            {movement.name}
          </Text>
          <Text style={{ color: "white", fontSize: 11 }}>{formatDate}</Text>
        </View>
        <Text
          style={{
            ...styles.amount,
            backgroundColor: movement.amount >= 0 ? "#00ffa8" : "#282929",
            color: movement.amount >= 0 ? "#161717" : "white",
          }}
        >
          {showMoney
            ? movement.amount.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })
            : "$ ****"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardMovement: {
    height: 60,
    backgroundColor: "#161717",
    margin: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  amount: {
    color: "white",
    backgroundColor: "green",
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontWeight: "bold",
    borderRadius: 5,
    width: 120,
    height: 30,
    textAlign: "center",
  },
});
