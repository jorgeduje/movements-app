import { View, Text } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { Skeleton } from "@rneui/base";

export default function CardMovementSkelenton() {
  return (
    <View style={styles.cardMovement}>
      <View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
        <Skeleton circle width={32} height={32} animation="wave" />
        <Skeleton width={150} height={32} animation="wave" />
      </View>
      <Skeleton width={100} height={32} animation="wave" />
    </View>
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
});
