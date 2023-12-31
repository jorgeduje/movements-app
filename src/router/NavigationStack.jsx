import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../components/screens/LoginScreen";
import HomeScreen from "../components/screens/HomeScreen";
import CvuScreen from "../components/screens/CvuScreen";
import NewMovement from "../components/screens/NewMovement";

const Stack = createStackNavigator();

export default function NavigationStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Cvu" component={CvuScreen} />
      <Stack.Screen name="NewMovement" component={NewMovement} />
    </Stack.Navigator>
  );
}
