import react from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import AuthStack from './AuthStack';

export default function MainNavigator() {
    const [user, setUser] = react.useState(null);

    return (
        <NavigationContainer>
            {user ? <TabNavigator user={user} setUser={setUser} /> : <AuthStack />}
        </NavigationContainer>
    );
}