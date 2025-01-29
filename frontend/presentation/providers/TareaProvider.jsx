import { useState,createContext} from 'react';

const TareaContext = createContext()

const TareaProvider = ({children}) => {

    const [tareas,setTareas] = useState([])

    return(
        <TareaContext.Provider
            value={{
                        tareas,
                        setTareas,
            }}
        >   {children}
        </TareaContext.Provider>
    )
}

export {TareaProvider,TareaContext}