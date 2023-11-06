
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home/Home';
import PostForm from '../../screens/PostForm/PostForm';
import Profile from '../../screens/Profile/Profile';
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
            <Tab.Screen name="PostForm" component={PostForm} />
            <Tab.Screen name="Buscador" component={Buscador} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    )

}