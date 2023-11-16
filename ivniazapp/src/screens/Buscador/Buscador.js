import React, { Component } from 'react';
import {
    TextInput,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    FlatList,
} from "react-native";
import { db, auth } from '../../firebase/config'


class Buscador extends Component {
    constructor() {
        super();
        this.state = {
            backup: [],
            textoDelInput: '',
            filter: [],
            usuarios: [],
            usuarioId: ''
            
        }
    }

    componentDidMount() {
        db.collection('users').onSnapshot(docs => {
            let usuarios = [];
            docs.forEach(doc => {
                usuarios.push({
                    id: doc.id,
                    data: doc.data
                })
                this.setState({
                    backup: usuarios
                })
            })
        })
    }
    buscar() {
        let filtroUsuarios = this.state.backup.filter(ain => {
            if (ain.data.owner.toLowerCase().includes(this.state.textoDelInput.toLowerCase())){
                return ain
            } else if (ain.data.username.toLowerCase().includes(this.state.textoDelInput.toLowerCase())) {
                return ain
            }
        })
        this.setState({
            filter: filtroUsuarios
        })
    }

    render() {
        console.log(this.props);
        return (
            <View>
            <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({ textoDelInput: text })}
                placeholder="username"
                keyboardType="default"
                value={this.state.textoDelInput}
            />  
            <TouchableOpacity style={styles.button} onPress={() => this.buscar()}>
                <Text>Búsqueda</Text>
            </TouchableOpacity>
            {this.state.textoDelInput == '' ?
            <Text> No ingresaste una búsqueda aún</Text> :
            <Text> Resultado de búsqueda: {this.state.textoDelInput}</Text>   
            }
            {this.state.filter.length > 0 ?
                <FlatList
                    data={this.state.filter}
                    keyExtractor={usuario => usuario.id}
                    renderItem={({item})=>
                    <TouchableOpacity style={styles.button} onPress={() => this.SelectedUser(item.data.owner)}>
                    <Text>{item.data.username}</Text>
                    </TouchableOpacity>
                    }
                />
                : <Text> Usuario/ mail inexistente </Text>
            }
            </View>
        )
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

export default Buscador
