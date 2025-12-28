import { createContext, useReducer, useEffect } from "react";

const AuthContext = createContext()

const initialState = {
    accessToken: null
}

function reducer(state, action) {
    switch (action.type) {
        case "setToken":
            return { ...state, accessToken: action.payload };
        case "clearToken":
            return { ...state, accessToken: null };
        default:
            return state;
    }
}



export const AuthProvider = ({children, defaultState = initialState})=>{
    const [state, dispatch] = useReducer(reducer, defaultState)

     useEffect(() => {
        const savedToken = localStorage.getItem("auth-token");
        if (savedToken) {
            dispatch({ type: "setToken", payload: savedToken });
        }
    }, []);

    return <AuthContext.Provider value={[state, dispatch]}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext

// const savedToken = localStorage.getItem("accessToken");
