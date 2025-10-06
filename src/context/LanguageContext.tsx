import {createContext, type ReactNode, useContext, useState} from "react";

type lang = 'de' | 'en';

interface LanguageContextType {
    language: lang;
    setLanguage: (language: lang) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LanguageProvider = ({ children } : {children: ReactNode}) => {
    const [language, setLanguage] = useState<lang>('en');

    return (
        <LanguageContext.Provider value={{language, setLanguage}}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};

export { LanguageContext, LanguageProvider };