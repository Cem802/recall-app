import { createContext, useContext, useState } from 'react'

const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {
    const [bottomSheet, setBottomSheet] = useState()

    return (
        <GlobalContext.Provider
            value={{
                bottomSheet,
                setBottomSheet
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider