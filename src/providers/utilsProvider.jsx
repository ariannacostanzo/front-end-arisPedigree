import { createContext, useContext } from "react";

const UtilsContext = createContext();

const UtilsProvider = ({ children }) => {

    /**
         * Funzione che abbrevia una stringa alla lunghezza indicata
         * @param {String} word stringa da abbreviare
         * @param {Number} length lunghezza desiderata
         * @returns {String} la stringa abbreviata
         */
    const reduceStr = (word, length) => {
        return word.length > length ? word.substring(0, length) + "..." : word;
    }

    return (
        <UtilsContext.Provider
            value={{ reduceStr }}
        >
            {children}
        </UtilsContext.Provider>
    )
};

const useUtils = () => {
    const value = useContext(UtilsContext);
    return value;
}

export { UtilsProvider, useUtils };

