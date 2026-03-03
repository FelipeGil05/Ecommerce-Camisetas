import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { View, StyleSheet } from 'react-native';

import TabNavigator from './Navigation/TabNavigator';
import Header from './Components/Header';

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <View style={styles.container}>
                    <Header />
                    <TabNavigator />
                </View>
            </NavigationContainer>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});