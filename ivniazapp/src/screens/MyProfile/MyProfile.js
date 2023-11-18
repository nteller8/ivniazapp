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

        db.collection('users')
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
                    <Text style={styles.username}>Bienvenido {this.state.dataUser.userName}</Text>
                    <Text style={styles.bio}>Biografia: {this.state.dataUser.bio}</Text>
                    <Text style={styles.email}>Mail: {auth.currentUser.email}</Text>
                    <Image style={styles.profileImage} source={{ uri: this.state.dataUser.profileImage }} />

                </View>

                <Text style={styles.sectionTitle}>Mis posteos:</Text>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={unPost => unPost.id.toString()}
                    renderItem={({ item }) => <Post dataPost={item} />}
                />
               
                <TouchableOpacity onPress={() => this.logout()} style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Cerrar sesión</Text>
                </TouchableOpacity>
               
            
            </ScrollView>
            
  )}}

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
    }

});

export default MyProfile;