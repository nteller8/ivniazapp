import React, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, Image} from 'react-native';
import { auth, db } from '../../firebase/config';
import firebase from 'firebase';


class Post extends Component {
    constructor(props){
        super(props)
        this.state={
            like: false,
            cantLikes: this.props.dataPost.datos.likes.length
        }

        
    }

    componentDidMount(){
        //Indicar si el post ya está likeado o no
        let likes = this.props.dataPost.datos.likes

        if(likes.length === 0){
            this.setState({
                like: false
            })
        }
        if(likes.length > 0){
            likes.forEach( like => {if (like === auth.currentUser.email) {
                this.setState({ like: true })
            }})
        }
    }


   likear(){
    //El post tendría que guardar una propiedad like con un array de los usuario que lo likearon.
    db.collection("posts").doc(this.props.dataPost.id).update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    })
    .then(this.setState({
        like: true,
        cantLikes: this.props.dataPost.datos.likes.length
    }))
    .catch(e=> console.log(e))
   }

   dislike(){
    //Quitar del array de likes al usario que está mirando el post.
    db.collection("posts").doc(this.props.dataPost.id).update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    })
    .then(this.setState({
        like: false,
        cantLikes: this.props.dataPost.datos.likes.length
    }))
   }
   

    render(){
        // console.log(this.props);
        return(
            <View style={styles.formContainer}>
                <Text>----------------------------------------------------</Text>
                <Text>Datos del Post</Text>
                <Text>Email: {this.props.dataPost.datos.owner}</Text>
                <Text>Texto: {this.props.dataPost.datos.post}</Text>
                <Image style={styles.camera} source={{uri:this.props.dataPost.datos.photo }}/>
                <Text>Cantidad de Likes: {this.state.cantLikes}</Text>

                {/* If ternario 
                
                AGREGAR EL BOTON DE COMENTARIOS
                */}
                {this.state.like ? 
                <TouchableOpacity style={styles.button} onPress={()=>this.dislike()}>
                    <Text style={styles.textButton} >Dislike</Text>
                    
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.button} onPress={()=>this.likear()}>
                    <Text style={styles.textButton} >Like</Text>
                </TouchableOpacity>
                }
                
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
        height: `60vh`,
        widht: `100vw`,
    },
    camera: {
        widht: '100%',
        height: '100%',
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
    button: {
      backgroundColor: "salmon",
      paddingHorizontal: 10,
      paddingVertical: 6,
      textAlign: "center",
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "salmon",
      width: "30%",
    },
    textButton: {
      color: "#fff",
    },
  });



export default Post;
