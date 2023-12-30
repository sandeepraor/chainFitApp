import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DeviceModal from "./DeviceConnectionModal";
// import { PulseIndicator } from "./PulseIndicator";
import useBLE from "./useBLE";

const App = () => {
  const {
    requestPermissions,
    scanForPeripherals,
    // allDevices,
    // connectToDevice,
    // connectedDevice,
    // heartRate,
    // disconnectFromDevice,
  } = useBLE();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      scanForPeripherals();
    }
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const openModal = async () => {
    scanForDevices();
    setIsModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heartRateTitleWrapper}>
        {/* {connectedDevice ? (
          // <>
          //   <PulseIndicator />
          //   <Text style={styles.heartRateTitleText}>Your Heart Rate Is:</Text>
          //   <Text style={styles.heartRateText}>{heartRate} bpm</Text>
          // </>
        ) : (
          <Text style={styles.heartRateTitleText}>
            Please Connect to a Heart Rate Monitor
          </Text>
        )} */}
        <Text style={styles.heartRateTitleText}>
          Please Connect to a Heart Rate Monitor
        </Text>
      </View>
      <TouchableOpacity onPress={openModal} style={styles.ctaButton}>
        <Text style={styles.ctaButtonText}>{"Connect"}</Text>
      </TouchableOpacity>
      <DeviceModal
        closeModal={hideModal}
        visible={isModalVisible}
        connectToPeripheral={() => {}}
        devices={[]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  heartRateTitleWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heartRateTitleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 20,
    color: "black",
  },
  heartRateText: {
    fontSize: 25,
    marginTop: 15,
  },
  ctaButton: {
    backgroundColor: "#FF6060",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default App;

// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { StyleSheet, Button } from "react-native";
// import { AuthProvider, useAuth } from "./app/context/authContext";
// import Devices from "./app/screens/Devices";
// import Home from "./app/screens/Home";
// import Login from "./app/screens/Login";
// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <AuthProvider>
//       <Layout>
//         <Devices />
//       </Layout>
//     </AuthProvider>
//   );
// }

// export const Layout = ({ children }: any) => {
//   const { authState, onLogout } = useAuth();
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Group
//           screenOptions={{
//             headerStyle: { backgroundColor: "#934beb" },
//           }}
//         >
//           {authState?.token ? (
//             <Stack.Screen component={Home} name="Home"></Stack.Screen>
//           ) : (
//             <Stack.Screen
//               options={{
//                 title: "Login",
//               }}
//               component={Login}
//               name="Login"
//             ></Stack.Screen>
//           )}
//         </Stack.Group>
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };
