
import { useContext } from "react";
import { TareaContext } from "../TareaProvider";

const useTareas = () => {
    return useContext(TareaContext)
}

export default useTareas