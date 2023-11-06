import React, {Component} from "react";
import {Camera} from "expo-camera";
import {Text} from "react-native";

class MyCamera extends Component {
    constructor(props) {
        super (props);
        this.state = {permisos: false}
    }

    componentDidMount(){
        MyCamera.requestCameraPermissionAsync()
        .then(res => {
            if (res.granted===true) {
                this.setState({
                    permisos: true
                })
            }
        })
        .catch =(e=> console.log(e))
    }

    render(){
        return(
            <>
            
            </>
        )
    }
}