import { createContext, useContext } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
    let sharedState = { firstTest: "Ceci est partagé à travers toute mes pages" }

    return (
        <AppContext.Provider value={sharedState}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}