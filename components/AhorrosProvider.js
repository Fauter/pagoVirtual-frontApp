import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AhorrosContext = createContext();

export const useAhorros = () => useContext(AhorrosContext);

export const AhorrosProvider = ({ children }) => {
    const [ahorros, setAhorros] = useState([]);

    const fetchAhorros = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get('http://192.168.100.6:5000/api/auth/ahorros', {
                headers: { 'x-auth-token': token }
            });
            if (Array.isArray(response.data)) {
                setAhorros(response.data);
            } else {
                console.error('Los datos no tienen el formato esperado:', response.data);
            }
        } catch (error) {
            console.error('Error al obtener ahorros:', error.response ? error.response.data : error.message);
        }
    };

    const crearAhorro = async (nuevoAhorro) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('http://192.168.100.6:5000/api/auth/ahorros/crear', nuevoAhorro, {
                headers: { 'x-auth-token': token }
            });
            setAhorros(prev => [...prev, response.data]); 
        } catch (error) {
            console.error('Error al crear ahorro:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchAhorros();
    }, []);

    return (
        <AhorrosContext.Provider value={{ ahorros, crearAhorro, fetchAhorros }}>
            {children}
        </AhorrosContext.Provider>
    );
};