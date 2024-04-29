import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [bottomSheet, setBottomSheet] = useState()

    useEffect(() => {
        console.log(user)
        try {
            supabase.auth.getSession().then(({ data: { session } }) => {
                if (session) {
                    setIsLoggedIn(true)
                    setUser(session.user)
                } else {
                    setIsLoggedIn(false)
                    setUser(null)
                }
            })

            supabase.auth.onAuthStateChange((_event, session) => {
                if (session) {
                    setIsLoggedIn(true)
                    setUser(session.user)
                } else {
                    setIsLoggedIn(false)
                    setUser(null)
                }
            })
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading,
                bottomSheet,
                setBottomSheet
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider