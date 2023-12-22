import { View, Text, TextInput, StyleSheet } from "react-native";

const Login = () => {
  return (
    <View style={styles.container}>
      <View style={styles.login_header}>
        <Text>Login Page </Text>
      </View>
      <View style={styles.login_input}>
        <TextInput placeholder="Enter the user email"></TextInput>
        <TextInput
          secureTextEntry={true}
          placeholder="Enter the password"
        ></TextInput>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  login_header: {
    flex: 1,
    fontSize: 25,
    fontWeight: "900",
    justifyContent: "center",
    alignItems: "center",
  },
  login_input: {
    flex: 4,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    height: "auto",
    backgroundColor: "#ff0",
  },
});

export default Login;
