import React, { Component } from 'react';
import {TextInput, View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import { auth, db } from '../../firebase/config';
import firebase from 'firebase';
import { FontAwesome } from '@expo/vector-icons';


class Post extends Component {
    constructor(props){
        super(props)
        this.state={
            like: false,
            cantLikes: this.props.dataPost.datos.likes.length,
            cantCometarios: this.props.dataPost.datos.comentarios.length,
         
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
    console.log("hola");
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

   borrarPost(){
    db.collection("posts")
    .doc(this.props.dataPost.id)
    .delete()
    .then(()=> {
        console.log("El posteo ha sido eliminado correctamente.")
    })

   }
   

    render(){
        console.log(this.props);
        return(
            <View style={styles.formContainer}>
                
                <View style={styles.infoUser}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate(
                        'User', this.props.dataPost.datos.owner )}>
                        <Text style={styles.username}> {this.props.dataPost.datos.owner}</Text>
                    </TouchableOpacity>
                    <Image style={styles.camera} source={{uri:this.props.dataPost.datos.photo}}/>

                </View>
                <Text style={styles.postContainer}>{this.props.dataPost.datos.textPost}</Text>
                <View style={styles.likesContainer}>
                    {
                        this.state.like ?
                            <TouchableOpacity style={styles.likeButton} onPress={() => this.dislike()}>
                                <FontAwesome name='heart-o' color='black' size={20} />
                            </TouchableOpacity>

                            :
                            <TouchableOpacity style={styles.likeButton} onPress={() => this.likear()}>
                                <FontAwesome name='heart' color='red' size={20} />
                               
                            </TouchableOpacity>

                    }


                    <Text style={styles.likeCount}>{this.state.cantLikes} Likes</Text>
                </View>
                <View>
                    <Text>{this.state.cantComentarios} Comentarios</Text>
                    <TouchableOpacity style={styles.commentButton} onPress={() => this.props.navigation.navigate(
                        'Comments', { id: this.props.dataPost.id })}>
                        <FontAwesome name='comment' color='black' size={20} />
                    </TouchableOpacity>
                </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
        height: `60vh`,
        widht: `100vw`,
    },
    postContainer: {

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
    likeButton: {
        marginLeft: 7,
    },
    infoUser:{

    },
    likesContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },
  });



export default Post;
