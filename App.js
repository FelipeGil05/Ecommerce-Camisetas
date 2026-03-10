import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { View, StyleSheet } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import TabNavigator from './Navigation/TabNavigator';

import Login from './Screens/Login';
import Register from './Screens/Register';
import Header from './Components/Header';

const RootStack = createNativeStackNavigator();

const MainScreen = () => {
    const tabNavigation = useNavigation();
    
    return (
        <View style={styles.container}>
            <Header navigation={tabNavigation} />
            <TabNavigator />
        </View>
    );
};

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <RootStack.Navigator screenOptions={{ headerShown: false }}>
                    <RootStack.Screen name="Main" component={MainScreen} />
                    <RootStack.Screen name="Login" component={Login} />
                    <RootStack.Screen name="Register" component={Register} />
                </RootStack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});