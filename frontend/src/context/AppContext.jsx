import { createContext } from "react";
import { services } from "../assets/assets";

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const value = {
        services
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>

    )
}

export default AppContextProvider