import React, { Component } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../../firebase/config";


class Register extends Component {
    constructor(){
        super()
        this.state={
            email: '',
            userName: '',
            pass: '',
            bio: '',
            profileImage: '',
        }
    }

    //agregue componentDidMount para cheq si esta logueado en firebase y sino que rediriga al login
    componentDidMount(){
        console.log("Chequear si el usuario está loguado en firebase.");
        auth.onAuthStateChanged( user => {
            console.log(user)
            if( user ){
                this.props.navigation.navigate('Login')
            }
        })
    }


    register(email, pass, userName, bio, profileImage){
            auth.createUserWithEmailAndPassword(email,pass)
            .then(res => {
                db.collection('users').add({
                    owner: auth.currentUser.email,
                    userName: userName,
                    bio: bio || '',
                    profileImage: profileImage || '',
                    createdAt: Date.now(),
                    // podríamos hacer un -> console.log("el usuario fue creado con exito")) 
        })
    })       
            .catch(error => console.log(`ocurrio el siguiente error : ${error}`))
    }

    render(){
        return(
            <View>
                <Text>Register</Text>
                <Text>Email: </Text>
                {/* Los inputs deben quedar identados de esta manera */}
                <TextInput
                    style={styles.input}
                    keyboardType='email-address'
                    placeholder="ejemplo@gmail.com"
                    onChangeText={(text) => this.setState({email: text })}
                    value={this.state.email}
                    />
                <Text>Password: </Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    keyboardType='default'
                    placeholder='Contraseña'
                    onChangeText={(text) => this.setState({pass: text })}
                    value={this.state.pass}
                    />
                <TextInput
                    style={styles.input}
                    onChangeText={text => this.setState({bio: text})}
                    placeholder='Biografía (opcional)'
                    keyboardType='default'
                    value={this.state.bio}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => this.setState({profileImage: text })}
                    placeholder='URL de la foto de perfil (opcional)'
                    keyboardType='default'
                    value={this.state.profileImage}
                />
                <TouchableOpacity
                    style={styles.buton}
                    onPress={() => this.register(this.state.email, this.state.pass, this.state.userName, this.state.bio, this.state.profileImage)}>
                    <Text style={styles.text}>Register</Text>
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

export default Register