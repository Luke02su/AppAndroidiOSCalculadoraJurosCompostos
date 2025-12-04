import React, { createContext, useState, useContext } from 'react';

const CalculoContext = createContext();

export const CalculoProvider = ({ children }) => {
    // Armazena os resultados do último cálculo realizado
    const [ultimoCalculo, setUltimoCalculo] = useState(null);

    // Função para salvar os resultados de um cálculo
    const salvarCalculo = (dados) => {
        setUltimoCalculo(dados);
    };

    return (
        <CalculoContext.Provider value={{ ultimoCalculo, salvarCalculo }}>
            {children}
        </CalculoContext.Provider>
    );
};

export const useCalculo = () => useContext(CalculoContext);