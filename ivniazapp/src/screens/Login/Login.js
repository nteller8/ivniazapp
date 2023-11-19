import React, { Component } from "react";
import { auth } from "../../firebase/config";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errorMessage: "",
      errorCodigo: "",
      error: "",
      logueado: false,
      cargando: true, // Nuevo estado para el Loader inicial
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user !== null) {
        this.setState({
          logueado: true,
          cargando: false,
        });
      } else {
        this.setState({
          logueado: false,
          cargando: false,
        });
      }
    });
  }

  login(email, pass) {
    if (email === "" || pass === "") {
      alert("No puede quedar un campo vacío");
    } else {
      auth
        .signInWithEmailAndPassword(email, pass)
        .then((response) => {
          console.log("Login ok", response);
          this.props.navigation.navigate("TabNavigator");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

render() {
  return (
    <View style={styles.formContainer}>
      {this.state.cargando ? (
        // ADICIONAL: muestra el loader
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="blue" />
          <Text>Cargando...</Text>
        </View>
      ) : (
        <>
          <Text style={styles.titulo}>Inicia sesión en tu cuenta</Text>

          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({ email: text })}
            placeholder="email"
            keyboardType="email-address"
            value={this.state.email}
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({ password: text })}
            placeholder="password"
            keyboardType="default"
            secureTextEntry={true}
            value={this.state.password}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.login(this.state.email, this.state.password)}
          >
            <Text style={styles.textButton}>Ingresar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Registro")}
          >
            <Text style={styles.textRegistro}>
              No tengo cuenta. Registrarme.
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  input: {
    height: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "solid",
    borderRadius: 6,
    marginVertical: 10,
  },
  titulo: {
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    fontSize: 20,
  },
  button: {
    backgroundColor: "blue",
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#28a745",
  },
  textButton: {
    color: "#fff",
  },
  textRegistro: {
    marginTop: 20,
    textAlign: "center",
    color: "#003569",
    fontWeight: "bold",
  },
});

export default Login;
