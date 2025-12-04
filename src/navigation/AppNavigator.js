import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalculadoraJuros from '../components/CalculadoraJuros'; // Componente Principal
import HistoricoScreen from '../screens/HistoricoScreen'; // Segunda Tela

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Calculadora">
            <Stack.Screen 
                name="Calculadora" 
                component={CalculadoraJuros} 
                options={{ title: 'Simulador de Investimentos' }}
            />
            <Stack.Screen 
                name="Historico" 
                component={HistoricoScreen} 
                options={{ title: 'Resumo do Investimento' }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;