import React, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import MyCamera from "../../components/MyCamera/MyCamera";

class PostForm extends Component{
    contructor(){
        super()
        this.state={
            textPost: "",
            showCamera: true,
            url: ""
        }
    }

    
    createPost(){
        db.collection('posts').add({
            owner: auth.currentUser.email, //auth.currentUser.email,
            textPost: this.state.textPost, //this.state.textPost,
            photo: this.state.url,
            likes:[],
            comentarios:[],
            createdAt: Date.now(),//Date.now(), 
        })
        .then( res => console.log(res))
        .catch( e => console.log(e))
    }

    onImageUpload(url){
        this.setState({
            url:url,
            showCamera:false
        })
    }

    render() {
        return (
          <View style={styles.formContainer}>
            <Text style={styles.title}>New Post</Text>
            {this.state.showCamera ? <MyCamera onImageUpload={(url)=> this.onImageUpload(url)}/>:
            <> 
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({ textPost: text })}
              placeholder='Escribí una descripción de foto'
              keyboardType='default'
              value={this.state.textPost}
            />
            <TouchableOpacity style={styles.button} onPress={() => this.createPost(auth.currentUser.email, this.state.textPost, Date.now())}>
              <Text style={styles.textButton}>Post</Text>
            </TouchableOpacity>
          </>}
          </View>
        );
      }
}

const styles = StyleSheet.create({
    formContainer: {
      paddingHorizontal: 20,
      marginTop: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingLeft: 10,
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#3498db',
      padding: 15,
      alignItems: 'center',
      borderRadius: 8,
    },
    textButton: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });

export default PostForm;
