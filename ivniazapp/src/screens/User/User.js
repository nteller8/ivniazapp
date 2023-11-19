import React, { Component } from 'react';
import { db, auth } from '../../firebase/config';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList } from 'react-native';
import Post from "../../components/Post/Post";
import firebase from 'firebase';


class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      susPosts: [],
      dataUser: "",
      id: '',
      mailusuario: this.props.route.params.mailusuario,
  
    };
  }

  componentDidMount() {
    console.log(this.props.route.params)
    db.collection('posts').where('owner', '==', this.state.mailusuario)

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
            posts: postsAMostrar
          })
        }
      )

    db.collection('usuarios')
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot(docs => {
        let usuario = []
        docs.forEach((doc) => {
          usuario.push({
            id: doc.id,
            data: doc.data()
          })
        })
        console.log(usuario)
        this.setState({
          dataUser: usuario[0]

        })


      })

  }


  render() {
    console.log('Esto es el Profile de otro usuario')
    return (
      <View>
 
     <Text>Biografia: {this.state.dataUser.bio}</Text> 
          <Text>Usuario: {this.state.dataUser.userName}</Text>
       <Text>{this.state.susPosts.length} posteos:</Text>

        <View>
          <FlatList
            data={this.state.susPosts}
            keyExtractor={unPost => unPost.id.toString()}
            renderItem={({ item }) => <Post dataPost={item.datos} navigation={this.props.navigation} />}
          />
        </View> 



      </View>


    )
  }
}
const styles = StyleSheet.create({
  container: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
          width: 0,
          height: 2,
  },
},
  profileInfo: {
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

