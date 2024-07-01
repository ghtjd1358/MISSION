import React from "react";

const ThemeContext = React.createContext();

const theme = {
    colors : {
        background : '#000',
        text : '#fff',
        buttonBackground : 'orange',
        buttonText : '#fff'
    }
}

const ThemeProvider = ({children}) => {
    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeProvider}