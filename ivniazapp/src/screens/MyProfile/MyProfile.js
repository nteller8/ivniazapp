import React, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import Post from "../../components/Post/Post";
import firebase from 'firebase';
import {updatePassword} from 'firebase/auth'


class MyProfile extends Component{
    constructor(props){
        super(props)
        this.state={
            posts: [],
            dataUser: [],
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
    
    signOut() {
      auth.signOut();
      this.props.navigation.navigate('Login')
  }
  logout() {
    auth.signOut();
    this.props.navigation.navigate("Login");
}

    render() {
      console.log('Esto es el Profile')
        return (
            <ScrollView>
          <View>
                <Text>Bienvenido {this.state.dataUser.userName}</Text>
                <Text>Biografia: {this.state.dataUser.bio}</Text>
                <Text>Mail: {auth.currentUser.email}</Text>
                <Text>Mis posteos:</Text>
                <TouchableOpacity onPress={() => this.logout()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
                <View>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={unPost => unPost.id.toString()}
                    renderItem={({ item }) => <Post dataPost={item} />}
                />
                </View>
                <TouchableOpacity onPress={() => this.signOut()}>
                    <Text> Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
            
  )}}

export default MyProfile;