import React, { Component } from 'react';
import { db, auth } from '../../firebase/config';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, ScrollView, Image } from 'react-native';
import Post from "../../components/Post/Post";
import firebase from 'firebase';


class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      susPosts: [],
      mailusuario: this.props.route.params.mailusuario,
      informacion: {}
  
    };
  }

  componentDidMount() {
    console.log(this.props.route.params)
    db.collection('posts')
      .where('owner', '==', this.state.mailusuario)
      .onSnapshot(
        listaPosts => { //docs
          let postsAMostrar = [];
          listaPosts.forEach(unPost => {
            postsAMostrar.push({
              id: unPost.id,
              datos: unPost.data()
            })
          })

          this.setState({
            susPosts: postsAMostrar
          })
        }
      )

    db.collection('usuarios')
      .where('owner', '==', this.state.mailusuario)
      .onSnapshot(unPost => {
        unPost.forEach(unPost => 
          this.setState({
            id: unPost.id,
            informacion: unPost.data()
          })
        )
       
        })

  }


  render() {
    console.log('Esto es el Profile de otro usuario')
    console.log(this.state.susPosts);
    return (

      <ScrollView style={styles.formContainer}>
        <View style={styles.infoProfile}>
          <Text style={styles.username}>Usuario: {this.state.informacion.userName}</Text>
          <Text style={styles.username}>Mail: {this.state.mailusuario}</Text>
          <Text style={styles.bio}>Biografia: {this.state.informacion.bio}</Text>
          <Text style={styles.posts} >Número de posts: {this.state.susPosts.length}</Text>
          <Image style={styles.profileImage} source={{ uri: this.state.informacion.profileImage }}/>
        </View> 
        <Text style={styles.sectionTitle}>Sus posteos:</Text>
        <FlatList
            data={this.state.susPosts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Post dataPost={item} navigation={this.props.navigation} />}/>
  
</ScrollView>

    )
  }
}
const styles = StyleSheet.create({
  formContainer: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      shadowColor: '#000',
  },
  infoProfile: {
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
  posts: {
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
});
export default User;

