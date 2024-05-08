import React, { createContext } from "react";
import { initializeApp, getApps } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

type FirebaseContextProps = {
  firestore?: Firestore;
};

export const FirebaseContext = createContext<FirebaseContextProps>({});

interface FirebaseProviderProps extends React.PropsWithChildren<{}> {
  firebaseConfig: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
  };
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children,
  firebaseConfig,
}) => {
  const app =
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

  const firestore = getFirestore(app);

  return (
    <FirebaseContext.Provider value={{ firestore }}>
      {children}
    </FirebaseContext.Provider>
  );
};
