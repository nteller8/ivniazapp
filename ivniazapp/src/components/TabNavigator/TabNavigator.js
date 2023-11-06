import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Profile from '../screens/profile';
import NewPost from '../screens/newPost';
import { FontAwesome } from '@expo/vector-icons';


const Tab = createBottomTabNavigator()

return (
    <NavigationContainer>
        <Tab.Navigator screenOptions={ { tabBarShowLabel: false } }>
            <Tab.Screen
                name="Home"
                component={Home}
                options={
                    { tabBarIcon: () => <FontAwesome name="home" size={24} color="black" /> }
                } ></Tab.Screen>
            <Tab.Screen name="Profile" component={Profile} />
            <Tab.Screen name="NewPost" component={NewPost} />
        </Tab.Navigator>
    </NavigationContainer>
)
