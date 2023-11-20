import React, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, ScrollView, Image} from 'react-native';
import Post from "../../components/Post/Post";
import firebase from 'firebase';
import {updatePassword} from 'firebase/auth'


class MyProfile extends Component{
    constructor(props){
        super(props)
        this.state={
            posts: [],
            dataUser: {},
            id: '',
            newPass:"",
            nombreUser: "",
            perfilABorrar: null,
            edit: false,
            newUsername: '',
            newEmail: '',
            newBio: '',
            errors: '',
        };
    }

    componentDidMount(){
      db.collection('posts').where('owner', '==', auth.currentUser.email)
      .orderBy('createdAt', 'desc')
        .onSnapshot(
            listaPosts => {
                let postsAMostrar = [];
                listaPosts.forEach(unPost => {
                    postsAMostrar.push({
                        id: unPost.id,
                        datos: unPost.data()
                    })
                })

                this.setState({
                    posts: postsAMostrar
                })
            }
        )

        db.collection('usuarios')
            .where('owner', '==', auth.currentUser.email)
            .onSnapshot(docs => {
                docs.forEach(doc =>
                    this.setState({
                        id: doc.id,
                        dataUser: doc.data()
                    }))
            })
    }
    
   
    logout() {
    auth.signOut();
    this.props.navigation.navigate("Login");
    }

    borrarPerfil(item){
        db.collection('users').doc(this.state.dataUser[0]).delete()
        .then(()=> {
            const user = firebase.auth().currentUser;
            user.delete();
            alert('El perfil se eliminó exitosamente');
            this.props.navigation.navigate('Register')
        })
            
        .catch(error => {
            console.error('error')
        })
    }

    confBorrarPerfil(item){
        this.setState({perfilABorrar: item})
    }

    finalBorrarPerfil(){
        this.borrarPerfil(this.state.perfilABorrar);
        this.setState({ perfilABorrar: null});
        this.navigation.navigate("Register")
    }    

    noBorrarPerfil(){
        this.setState({ perfilABorrar: null});
    }

    saveChanges() {
        const { newUsername, newBio } = this.state;

        if (newUsername.trim() === '') {
            this.setState({ errors: 'El nombre de usuario no puede estar vacío' });
        } else {
            db.collection('users').doc(this.state.user.id).update({
                nombreUser: newUsername,
                bio: newBio,
            })
            .then(() => {
                this.setState({
                    edit: false,
                    errors: '',
                });
            })
            .catch(error => {
                this.setState({ errors: error.message });
            });
        }
    }

    render() {
      console.log('Esto es el Profile')
        return (
            <ScrollView style={styles.container}>
                <View style={styles.container}>
                    <Text style={styles.username}>Bienvenido {this.state.dataUser.userName}</Text>
                    <Text style={styles.bio}>Biografia: {this.state.dataUser.bio}</Text>
                    <Text style={styles.email}>Mail: {auth.currentUser.email}</Text>
                    <Image style={styles.profileImage} source={{ uri: this.state.dataUser.profileImage }} />

                </View>

                <Text style={styles.sectionTitle}>Mis posteos:</Text>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={unPost => unPost.id.toString()}
                    renderItem={({ item }) => <Post dataPost={item} navigation={this.props.navigation}/>}
                />
               
                <TouchableOpacity onPress={() => this.logout()} style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Cerrar sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.setState({ edit: true })} style={styles.button}>
                    <Text style={styles.buttonText}>Editar Perfil</Text>
                </TouchableOpacity>

                {this.state.user
                    ? <View style={styles.container}>
                        
                        <View style={styles.container}>
                            {this.state.edit ? (
                                <View>
                                    <Text style={styles.nombreUser}>Nuevo nombre de usuario:</Text>
                                    <TextInput
                                        placeholder="Nuevo nombre de usuario"
                                        onChangeText={(text) => this.setState({ newUsername: text })}
                                        value={this.state.newUsername}
                                    />
                                    
                                    <Text style={styles.nombreUser}>Nueva bio:</Text>
                                    <TextInput
                                       
                                        placeholder="Nueva bio"
                                        onChangeText={(text) => this.setState({ newBio: text })}
                                        value={this.state.newBio}
                                    />
                                    <TouchableOpacity style={styles.button} onPress={() => this.saveChanges()}>
                                        <Text style={styles.buttonText}>Confirmar Cambios</Text>
                                    </TouchableOpacity>
                                   
                                </View>
                            ) : (
                                <View>
                                    <Text style={styles.username}>{this.state.user.data.username}</Text>
                                    <Text style={styles.email}>{this.state.user.data.owner}</Text>
                                    <Text style={styles.bio}>{this.state.user.data.bio}</Text>
                                    <Image style={styles.profileImage} source={{ uri: this.state.dataUser.profileImage }} />
                                
                                </View>
                            )}
                        </View>
                    </View>
                    : <Text> </Text>
                }
               
                <TouchableOpacity style={styles.button} onPress={() => this.confBorrarPerfil()}>
                        <Text>Borrar perfil </Text>
                </TouchableOpacity>

                {this.state.perfilABorrar !== null ?
                <View>
                   <Text>
                    Querés eliminar el perfil? No podrás recuperarlo
                </Text>

                <TouchableOpacity style={styles.button} onPress={() => this.finalBorrarPerfil()}>
                <Text style={styles.textButtonDelete}>Aceptar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => this.noBorrarPerfil()}>
                <Text style={styles.textButtonDelete}>Cancelar</Text>
                </TouchableOpacity>
                </View>
                
                 :
                null
            }
            </ScrollView>
            
  )}
        }
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 20,
    },
    infoPerfil:{
        alignItems: 'center',
        marginBottom: 20,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    bio: {
        fontSize: 16,
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        marginBottom: 15,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    logoutButton: {
        backgroundColor: '#ff5a5f',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    logoutText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#3498db',
        padding: 15,
        alignItems: 'center',
        borderRadius: 8,
      }

});

export default MyProfile;