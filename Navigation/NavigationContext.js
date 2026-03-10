import React, { createContext } from 'react';

export const NavigationContext = createContext(null);

export const NavigationProvider = ({ children, navigation }) => {
    return (
        <NavigationContext.Provider value={navigation}>
            {children}
        </NavigationContext.Provider>
    );
};
