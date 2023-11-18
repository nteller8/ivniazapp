import React, { Component } from 'react';
import {TextInput, View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import { auth, db } from '../../firebase/config';
import firebase from 'firebase';
import { FontAwesome } from '@expo/vector-icons';


class Post extends Component {
    constructor(props){
        super(props)
        console.log(this.props);
        this.state={
            like: false,
            cantLikes: this.props.dataPost.datos.likes.length,
            cantComentarios: this.props.dataPost.datos.comentarios.length,
            comentarios: this.props.dataPost.datos.comentarios,
            MensajeAMostrar: false
        }

        
    }

    componentDidMount(){
        //Indicar si el post ya está likeado o no
        let likes = this.props.dataPost.datos.likes

        if (likes.includes(auth.currentUser.email)) {
            this.setState({
                like: true
            })
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
        cantLikes: this.state.cantLikes +1,
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
        cantLikes: this.state.cantLikes -1,
    }))
   }
//hacer que ande borrar para myprofile
   borrarPost(){
    const postOwner = this.props.dataPost.datos.owner;
    const currentUserEmail = auth.currentUser.email;
    console.log(this.props);
    if(postOwner === currentUserEmail){
        db.collection("posts")
        .doc(this.props.dataPost.id)
        .delete()
        .then(()=> {
            console.log("El posteo ha sido eliminado correctamente.")
        })
        .catch(error=>{
            console.error('Error al eliminar el post:', error)
        })
    } else{
        this.setState({MensajeAMostrar: true})

    }
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
                    <View style={styles.container}>
                    <Image style={styles.image} source={{uri:this.props.dataPost.datos.photo}}/>
                    </View>
                </View>
                <Text style={styles.postText}>{this.props.dataPost.datos.textPost}</Text>
                
                <View style={styles.likesContainer}>
                    {
                        this.state.like ?
                            <TouchableOpacity style={styles.likeButton} onPress={() => this.dislike()}>
                                <FontAwesome name='heart' color='red' size={20} />
                                
                            </TouchableOpacity>

                            :
                            <TouchableOpacity style={styles.likeButton} onPress={() => this.likear()}>
                                 <FontAwesome name='heart-o' color='black' size={20} />
                                 
                                
                               
                            </TouchableOpacity>

                    }


                    <Text style={styles.likeCount}>{this.state.cantLikes} Likes</Text>
                </View>
                <View style={styles.iconBar}>
                <TouchableOpacity style={styles.commentButton} onPress={() => this.props.navigation.navigate(
                        'Comments', { id: this.props.dataPost.id })}>
                        <FontAwesome name='comment' color='black' size={20} />
                    </TouchableOpacity>
                    <Text style={styles.commentCount}>{this.state.cantComentarios} Comentarios</Text>
        


                <TouchableOpacity style = {styles.trashCount} onPress={this.borrarPost}>
                    <FontAwesome name="trash" size={20} color="red" />
                </TouchableOpacity>
                
                {this.state.MensajeAMostrar?
                    (<Text> No tienes permiso para eliminar este post. </Text> ):
                    null}


                </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
        height: `60vh`,
        widht: `100vw`,
        margin: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        
    },
    username:{
        fontWeight: 'bold',
        fontSize: 16,
    },
    image: {
        height: 300,
        width: "100%"
    },
    container: {
        flex: 1,
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
        marginBottom: 10,
    },
    postText:{
        fontSize: 16,
        marginBottom: 10,
    },
    likeCount:{
        fontSize: 14,
        color: 'grey',
    },
    commentCount:{
        fontSize: 14,
        color: 'grey',
    },
    likesContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    trashCount: {
        position: 'absolute',
        bottom: 5,
        right: 5,
    },
  });



export default Post;
