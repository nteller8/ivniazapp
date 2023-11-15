
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home/Home';
import PostForm from '../../screens/PostForm/PostForm';
import MyProfile from '../../screens/MyProfile/MyProfile';
import Buscador from '../../screens/Buscador/Buscador';
import { FontAwesome } from '@expo/vector-icons';


const Tab = createBottomTabNavigator()
export default function TabNavigator() {
    return (

        <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={
                    { tabBarIcon: () => <FontAwesome name="home" size={24} color="black" /> }
                } />
            {/* <Tab.Screen name="Profile" component={Profile} /> */}
            <Tab.Screen name="Buscador" 
                        component={Buscador}
                        options={
                            {tabBarIcon: () => <FontAwesome name="search" size={24} color="black" /> }
                        }  />
            <Tab.Screen name="PostForm" 
                        component={PostForm}
                        options={
                            {tabBarIcon: () => <FontAwesome name="camera" size={24} color="black" />}
                        }  />

            <Tab.Screen name="MyProfile" 
                        component={MyProfile}
                        options={
                            {tabBarIcon: () => <FontAwesome name="user" size={24} color="black" />}
                        } 
                         />
        </Tab.Navigator>
    )

}