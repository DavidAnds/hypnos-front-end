import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export function AuthProvider(props) {
    const [currentUser, setCurrentUser] = useState();

    const login = (user) => {
        setCurrentUser(user)
    }

    const logout = () => {
        setCurrentUser(null)
    }

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
}
