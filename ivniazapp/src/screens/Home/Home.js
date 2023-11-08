import react, { Component } from "react";
import {
    TextInput,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    FlatList,
} from "react-native";
import { db, auth } from "../../firebase/config";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Post from "../../components/Post/Post";
import PostForm from "../PostForm/PostForm";

const Tab = createBottomTabNavigator();

class Home extends Component {
    constructor() {
        super();
        this.state = {
            post: []
        };
    }
    componentDidMount() {
        //Traer los datos de Firebase y cargarlos en el estado.
        db.collection('posts').onSnapshot(
            listaPosts => {
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

    }

    logout() {
        auth.signOut();
        this.props.navigation.navigate("Login");
    }

    render() {
        return (
            <>
                <Text>HOME</Text>
                <TouchableOpacity onPress={() => this.logout()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
                <Text>Crear nuevo post</Text>
               

                <Text>Lista de posteos</Text>

                <FlatList
                    data={this.state.posts}
                    keyExtractor={unPost => unPost.id}
                    renderItem={({ item }) => <Post dataPost={item} />}
                />

            </>
        );
    }
}

export default Home;