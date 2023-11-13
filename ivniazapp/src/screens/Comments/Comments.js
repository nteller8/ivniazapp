import { Text, View, TextInput, TouchableOpacity, StyleSheet,FlatList} from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import firebase from 'firebase'

class Comments extends Component{
    constructor(props){
        super(props)
        this.state = {
            nuevoComentario: "",
            id: "",
            data: {},
        }
    }
    componentDidMount(){
        db.collection("posts")
        .doc(this.props.route.params.id)
        .onSnapshot(doc=>{
            this.setState({id:doc.id,data:doc.data()})
        })
    }

    agregarComentario(id,comentario){
        db.collection("posts")
        .doc(id)
        .update({
            comentarios: firebase.firestore.FieldValue.arrayUnion({
                owner:auth.currentUser.email,
                createdAt:Date.now(),
                comentario:comentario
            })
        })

    }
    render(){
        return(
            
            <View> 
                {this.state.data.comentarios && this.state.data.comentarios.length > 0 ? (
                <View>
                    <FlatList data={this.state.data.comentarios} 
                    keyExtractor={item => item.createdAt.toString()}
                    renderItem={({item}) => <View>
                      <Text>{item.owner}:</Text>
                      <Text>{item.comment}</Text>
                    </View>}
                    />
                </View>)
                :(<Text>Sin comentarios aún.</Text>)}
                <View>
                    <TextInput onChangeText=
                        {text => this.setState({nuevoComentario: text})}
                        keyboardType='default'
                        placeholder='Añade un comentario'
                        value={this.state.nuevoComentario} />  
                        <TouchableOpacity onPress={()=> this.agregarComentario(this.state.id, this.state.nuevoComentario)}>
                            <Text>
                                Comentar
                            </Text>

                        </TouchableOpacity>
                </View>
                <Text onPress={ () => this.props.navigation.navigate ("TabNavigation")}>
                    Volver a Home
                </Text>
            </View>
        )
    }
}
export default Comments;
