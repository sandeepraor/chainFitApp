import { View, Text, TextInput, StyleSheet, Button } from "react-native";

const Login = () => {
  return (
    <View style={styles.container}>
      <View style={styles.login_input}>
        <TextInput
          style={styles.field}
          placeholder="Enter the user email"
        ></TextInput>
        <TextInput
          style={styles.field}
          secureTextEntry={true}
          placeholder="Enter the password"
        ></TextInput>
      </View>
      <View style={styles.button_container}>
        <Button title="Login"></Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  button_container: {
    flex: 2,
  },
  login_input: {
    flex: 4,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  field: {
    borderColor: "#934beb",
    backgroundColor: "#f7f7f7",
    marginBottom: 20,
    borderRadius: 5,
    fontFamily: "Roboto",
    borderBottomWidth: 2,
    padding: 10,
    width: 300,
    fontSize: 20,
  },
  container: {
    flex: 1,
    height: "auto",
  },
});

export default Login;
