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
    constructor(props) {
        super(props);
        this.state = {
            textoDelInput: '',
            usuarios: [],
            mail: [],
            buscador: false
        }
    }

    componentDidMount() {
        db.collection('users').onSnapshot(docs => {
            let usuario = [];
            docs.forEach(doc => {
                usuario.push({
                    id: doc.id,
                    data: doc.data
                })
                this.setState({
                    usuarios: usuario,
                    cargando: false
                })
            })
        })
    }
    buscar(texto) {
        this.setState({
            textoDelInput: texto,
            buscador:texto.length =! 0,
            mail: texto == '' ? []: this.state.usuarios.filter(usuario => usuario.data.owner.toLowerCase().includes(texto.toLowerCase())|| usuario.data.username.toLowerCase().includes(texto.toLowerCase()))
        })
    }


    controlarCambios(texto) {
        this.setState({
            textoDelInput: texto
        })
    }
    borrarBuscador() {
        this.setState({
            mail:[],
            textoDelInput: '',
           buscador:false
        })
    }

    render() {
        console.log(this.props);
        return (
            <div className="formDeBusqueda">
                <form style={{ color: "black" }} className="filter" action="" method='GET' onSubmit={(e) => this.controlarEnvio(e)}>
                    <input style={{ color: "black" }} value={this.state.textoDelInput} className="search" type="text" name='filtro' placeholder="¿Qué queres filtrar?" onChange={(e) => this.guardarDatosDelInput(e)} />
                    <button className="bottonsearch" type='submit'>Filtrar</button>
                </form>
            </div>
        )
    }

}
//hacer on snapshot con el where que busca prop o valor o array (traer datos y filtrar)

export default Buscador
