// QuadroContext.jsx
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import PropTypes from "prop-types"

const QuadroContext = createContext();

export const QuadroProvider = ({ children }) => {
  const [quadros, setQuadros] = useState([]);

  const fetchQuadros = async () => {
    try {
      const response = await axios.get("http://localhost:5005/quadros");
      setQuadros(response.data);
    } catch (err) {
      console.error("Erro ao buscar quadros:", err.message);
    }
  };

  return (
    <QuadroContext.Provider value={{ quadros, fetchQuadros }}>
      {children}
    </QuadroContext.Provider>
  );
};

QuadroContext.propTypes = {
  children: PropTypes.object,
};

export const useQuadroContext = () => {
  return useContext(QuadroContext);
};
