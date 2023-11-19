import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { db } from "../../firebase/config"

class Buscador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mensaje: '',
            usuariosdb: [],
            busquedaInput: '',
            arrayRes: [],
        };
    }

    componentDidMount() {
        db.collection('usuarios').onSnapshot(docs => {
            let users = []
            docs.forEach(doc => {
                users.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                usuariosdb: users,
            });
        })
    }

    controlarCambios(text) {
        this.setState({
            busquedaInput: text
        })
    }

    buscador() {
        const buscadoToLowerCase = this.state.busquedaInput.toLowerCase();

        const arrayRes = this.state.usuariosdb.filter((usuario) => 
            usuario.data.userName.toLowerCase().includes(buscadoToLowerCase)
        );

        if (arrayRes.length === 0) {
            this.setState({
                arrayRes: [],
                mensaje: 'No hay resultados para tu búsqueda.',
            });
        } else {
            this.setState({
                arrayRes: arrayRes,
                mensaje: '',
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='Buscar nombre de usuario'
                    onChangeText={(text) => this.controlarCambios(text)}
                    value={this.state.busquedaInput}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.buscador()}
                >
                    <Text style={styles.buttonText}>Buscar</Text>
                </TouchableOpacity>

                {this.state.mensaje ? (
                    <Text style={styles.error}>{this.state.mensaje}</Text>
                ) : (
                    <FlatList
                        data={this.state.arrayRes}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.userContainer}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate(
                                'User', {mailusuario:item.data.owner})}>
                                <Text style={styles.userName}>Nombre de usuario: {item.data.userName}</Text>
                                </TouchableOpacity>

                            </View>
                        )}
                    />
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#3498db',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    error: {
        fontSize: 16,
        marginBottom: 10,
        color: 'red',
    },
    userContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    userName: {
        fontSize: 16,
    },
});


export default Buscador;