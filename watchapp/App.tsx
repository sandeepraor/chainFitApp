import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Button } from "react-native";
import { AuthProvider, useAuth } from "./app/context/authContext";
import Home from "./app/screens/Home";
import Login from "./app/screens/Login";
const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}

export const Layout = ({ children }: any) => {
  const { authState, onLogout } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group
          screenOptions={{ headerStyle: { backgroundColor: "papayawhip" } }}
        >
          {authState?.token ? (
            <Stack.Screen component={Home} name="Home"></Stack.Screen>
          ) : (
            <Stack.Screen
              options={{
                title: "This is working",
              }}
              component={Login}
              name="Login"
            ></Stack.Screen>
          )}
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
