import { createContext, useEffect, useReducer, useState } from "react";
import { Reducer } from "./Reducer";

export const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
    const [storedTodos, setStoredTodos] = useState(() => {
        const storedValue = localStorage.getItem("todos");
        return storedValue ? JSON.parse(storedValue) : [];
    });

    useEffect(() => {
        const handleStorageChange = () => {
            const storedValue = localStorage.getItem("todos");
            setStoredTodos(storedValue ? JSON.parse(storedValue) : []);
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const [state, dispatch] = useReducer(Reducer, {
        todos: storedTodos
    });

    return (
        <TodoContext.Provider value={{ state, dispatch }}>
            {children}
        </TodoContext.Provider>
    );
};
