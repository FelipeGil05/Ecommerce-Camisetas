import react from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../Screens/Login';
import Register from '../Screens/Register';
import Header from '../Components/Header';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator
        initialRouteName='Login'
            screenOptions={{
                header: ( { route }) => <Header title={route.name} />,
            }}
        > 
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Register" component={Register}/>
        </Stack.Navigator>
    );
}