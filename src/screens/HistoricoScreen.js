import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCalculo } from '../context/CalculoContext';

const formatarMoeda = (valor) => {
    if (typeof valor !== 'number' || isNaN(valor)) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(valor);
};

const HistoricoScreen = () => {
    const { ultimoCalculo } = useCalculo();

    if (!ultimoCalculo) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Histórico de Resultados 📊</Text>
                <Text style={styles.aviso}>
                    Nenhum cálculo foi realizado ainda. Volte à tela principal para simular!
                </Text>
            </SafeAreaView>
        );
    }

    const {
        capitalInicial, 
        aporteMensal, 
        taxaAnual, 
        tempoAnos,
        valorTotalFinal,
        jurosTotais,
        valorInvestidoPuro
    } = ultimoCalculo;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Resumo do Último Cálculo</Text>
                
                <View style={styles.card}>
                    <Text style={styles.label}>Parâmetros Utilizados:</Text>
                    <Text style={styles.valor}>Capital Inicial: {formatarMoeda(capitalInicial)}</Text>
                    <Text style={styles.valor}>Aporte Mensal: {formatarMoeda(aporteMensal)}</Text>
                    <Text style={styles.valor}>Taxa Anual: {taxaAnual.toFixed(2)}%</Text>
                    <Text style={styles.valor}>Tempo: {tempoAnos} Anos</Text>
                </View>

                <View style={styles.resultadoContainer}>
                    <Text style={styles.resultadoTitle}>Resultados Finais</Text>
                    
                    <View style={styles.linhaResultado}>
                        <Text style={styles.resultadoLabel}>Valor Investido (Puro):</Text>
                        <Text style={styles.resultadoValor}>{formatarMoeda(valorInvestidoPuro)}</Text>
                    </View>
                    
                    <View style={styles.linhaResultado}>
                        <Text style={styles.resultadoLabel}>Total Ganho em Juros:</Text>
                        <Text style={styles.resultadoValorJuros}>{formatarMoeda(jurosTotais)}</Text>
                    </View>
                    
                    <View style={styles.linhaResultadoTotal}>
                        <Text style={styles.resultadoLabelTotal}>VALOR TOTAL FINAL:</Text>
                        <Text style={styles.resultadoValorTotal}>{formatarMoeda(valorTotalFinal)}</Text>
                    </View>
                </View>
                
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f4f7' },
    scrollContent: { padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#006400' },
    aviso: { fontSize: 16, textAlign: 'center', marginTop: 50, color: '#777' },
    card: { padding: 15, backgroundColor: '#fff', borderRadius: 10, marginBottom: 20, elevation: 3 },
    label: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: '#333' },
    valor: { fontSize: 16, color: '#555', marginBottom: 3 },

    resultadoContainer: { marginTop: 10, padding: 20, backgroundColor: '#fff', borderRadius: 10, borderLeftWidth: 5, borderLeftColor: '#006400', elevation: 5 },
    resultadoTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#006400', borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 5 },
    linhaResultado: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
    linhaResultadoTotal: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, marginTop: 10, borderTopWidth: 2, borderTopColor: '#333' },
    resultadoLabel: { fontSize: 16, color: '#555' },
    resultadoValor: { fontSize: 16, fontWeight: '600', color: '#333' },
    resultadoValorJuros: { fontSize: 16, fontWeight: '600', color: '#008000' },
    resultadoLabelTotal: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    resultadoValorTotal: { fontSize: 18, fontWeight: 'bold', color: '#006400' }
});

export default HistoricoScreen;