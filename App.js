import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { CalculoProvider } from './src/context/CalculoContext';

export default function App() {
  return (
    <SafeAreaProvider>
        {/* Contexto global envolve toda a aplicação */}
        <CalculoProvider>
            {/* O contêiner de navegação */}
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </CalculoProvider>
    </SafeAreaProvider>
  );
}