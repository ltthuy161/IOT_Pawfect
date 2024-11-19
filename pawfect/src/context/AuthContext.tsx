import React, { createContext, useEffect, useState, useContext, ReactNode } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase';
import { sendEmailVerification } from 'firebase/auth';

interface UserContextType {
    createUser: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    user: User | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const createUser = (email: string, password: string): Promise<void> => {
        return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            if (user) {
                return sendEmailVerification(user).then(() => {});
            }
        }) as Promise<void>; // Update the type of the promise to void.
    };

    const signIn = (email: string, password: string): Promise<void> => {
        return signInWithEmailAndPassword(auth, email, password).then(() => {});
    };

    const logout = (): Promise<void> => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <UserContext.Provider value={{ createUser, user, signIn, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const UserAuth = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('UserAuth must be used within a AuthContextProvider');
    }
    return context;
};
