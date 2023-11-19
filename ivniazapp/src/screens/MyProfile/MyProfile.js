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

    

    render() {
      console.log('Esto es el Profile')
        return (
            <ScrollView style={styles.container}>
                <View style={styles.container}>
                    <Image style={styles.profileImage} source={{ uri: this.state.dataUser.profileImage }} />
                    <Text style={styles.username}>Bienvenido {this.state.dataUser.userName}</Text>
                    <Text style={styles.bio}>Biografia: {this.state.dataUser.bio}</Text>
                    <Text style={styles.email}>Mail: {auth.currentUser.email}</Text>
                    

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
               
            
            </ScrollView>
            
  )}}

  const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F8F8F8',
    },
    infoPerfil: {
        marginBottom: 20,
        alignItems: 'center',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#2C3E50', // Azul oscuro
    },
    bio: {
        fontSize: 18,
        marginBottom: 8,
        color: '#34495E', // Gris azulado
    },
    email: {
        fontSize: 18,
        marginBottom: 15,
        color: '#34495E', // Gris azulado
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#3498DB', // Azul brillante
    },
    logoutButton: {
        marginTop: 20,
        backgroundColor: '#E74C3C', // Rojo
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
    },
    logoutText: {
        color: '#ECF0F1', // Blanco
        fontWeight: 'bold',
    },
});


export default MyProfile;