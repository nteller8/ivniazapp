import React, { Component } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth, db } from "../../firebase/config";
import firebase from 'firebase/app';


class Registro extends Component {
    constructor(){
        super()
        this.state={
            email: '',
            RegistroName: '',
            pass: '',
            bio: '',
            profileImage: '',
            errorMessage: '',
        }
    }

    //agregue componentDidMount para cheq si esta logueado en firebase y sino que rediriga al login
    componentDidMount(){
        console.log("Chequear si el usuario está logueado en firebase.");
        auth.onAuthStateChanged( user => {
            console.log(user)
            if( user ){
                this.props.navigation.navigate('Login') //
            }
        })
    }


    register(email, pass, userName, bio, profileImage){

        if (email && pass && RegistroName) {
            auth.createUserWithEmailAndPassword(email,pass)
            .then(res => {
                db.collection('usuarios').add({
                    owner: auth.currentUser.email,
                    userName: userName,
                    bio: bio || '',
                    profileImage: profileImage || '',
                    createdAt: Date.now(),
                    // podríamos hacer un -> console.log("el usuario fue creado con exito")) 
                })
                this.props.navigation.navigate("Login")
            })       
            .catch(error => {
                this.setState ({errorMessage: error.message});
                console.error('Firebase authentication error:', error)
            });
    } else{
        this.setState({errorMessage: "Por favor complete todos los cambos obligatios."});
    }
};

    render(){
        return(
            <View style= {styles.formContainer}>
                <Text>Registro</Text>
                {this.state.errorMessage ? <Text style={styles.errorText}>{this.state.errorMessage}</Text> : null}
                
             {/* Los inputs deben quedar identados de esta manera */}
                <Text>Email: </Text>
    
                <TextInput
                    style={styles.input}
                    keyboardType='email-address'
                    placeholder="ejemplo@gmail.com"
                    onChangeText={(text) => this.setState({email: text })}
                    value={this.state.email}
                    />
                 <Text>Nombre de usuario: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => this.setState({ RegistroName: text })}
                    placeholder='Nombre de usuario'
                    keyboardType='default'
                    value={this.state.userName}
                />
                <Text>Contraseña: </Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    keyboardType='default'
                    placeholder='Contraseña'
                    onChangeText={(text) => this.setState({pass: text })}
                    value={this.state.pass}
                    />
                <Text>Biografía opcional: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => this.setState({bio: text})}
                    placeholder='Biografía (opcional)'
                    keyboardType='default'
                    value={this.state.bio}
                />
                <Text>Foto de perfil: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => this.setState({profileImage: text })}
                    placeholder='URL de la foto de perfil (opcional)'
                    keyboardType='default'
                    value={this.state.profileImage}
                />
                <TouchableOpacity
                    style={styles.buton}
                    onPress={() => this.Registro(this.state.email, this.state.pass, this.state.userName, this.state.bio, this.state.profileImage)} disabled={!this.state.email || !this.state.pass || !this.state.userName}>
                    <Text style={styles.text}>Registrarse</Text>
                </TouchableOpacity>
                
                {/*SI YA TIENE CUENTA*/}
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                    <Text>¿Ya estás registrado? Ir al login</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input:{
        backgroundColor: "lightgrey",
        padding: 10,
        color: "grey",
    },
    text: {
        color: "white",
    },
    buton: {
        backgroundColor: 'red',
        padding: 20,
        marginTop: 10,
    },
    
})

export default Registro