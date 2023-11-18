import react, { Component } from "react";
import {
    TextInput,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
} from "react-native";
import { db, auth } from "../../firebase/config";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Post from "../../components/Post/Post";
import PostForm from "../PostForm/PostForm";

const Tab = createBottomTabNavigator();

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: []
        };
    }
    componentDidMount() {
        //Traer los datos de Firebase y cargarlos en el estado.
        db.collection('posts')
            .orderBy('createdAt', 'desc')
            .onSnapshot(
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

    

    render() {
        return (
            <ScrollView><>
        
            
                <FlatList
                    data={this.state.posts}
                    keyExtractor={unPost => unPost.id.toString()}
                    renderItem={({ item }) => <Post navigation ={this.props.navigation} dataPost={item} />}
                />

            </>
            </ScrollView>
        );
    }
}

export default Home;