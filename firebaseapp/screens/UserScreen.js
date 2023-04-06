import React from "react";
import { Text, View } from "react-native";
import IonIcons from 'react-native-vector-icons/Ionicons';

const User = () => {
return (
	<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
	<Text style={{ color: "#006600", fontSize: 40 }}>User Screen!</Text>
	<IonIcons name="md-person-circle-outline" size={80} color="#006600" />
	</View>
);
};

export default User;
