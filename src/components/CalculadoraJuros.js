import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    Button, 
    StyleSheet, 
    ScrollView,
    ActivityIndicator,
    Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; // Hook de navegação
import { useCalculo } from '../context/CalculoContext';      // Hook do Context

// Função para formatar números como moeda brasileira (R$)
const formatarMoeda = (valor) => {
    if (typeof valor !== 'number' || isNaN(valor)) return 'R$ 0,00';
    
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(valor);
};

// =======================================================
// LÓGICA DE CÁLCULO DE JUROS COMPOSTOS COM APORTES MENSAIS
// =======================================================
const calcularJurosCompostos = (capitalInicial, aporteMensal, taxaAnual, tempoAnos) => {
    
    if (tempoAnos <= 0 || (capitalInicial <= 0 && aporteMensal <= 0)) {
        return {
            valorTotalFinal: capitalInicial,
            jurosTotais: 0,
            valorInvestidoPuro: capitalInicial,
        };
    }
    
    const taxaDecimalAnual = taxaAnual / 100;
    // Fórmula de taxa mensal equivalente (mais precisa que dividir por 12)
    const taxaMensal = Math.pow((1 + taxaDecimalAnual), (1/12)) - 1; 
    
    const totalMeses = tempoAnos * 12;

    let montanteAtual = capitalInicial;
    let valorInvestidoPuro = capitalInicial;
    
    // Loop Mês a Mês (Iteração)
    for (let mes = 1; mes <= totalMeses; mes++) {
        
        // Aplica o juro sobre o montante atual
        const jurosDoMes = montanteAtual * taxaMensal;
        montanteAtual += jurosDoMes;
        
        // Adiciona o aporte mensal (a partir do 1º mês)
        montanteAtual += aporteMensal;
        valorInvestidoPuro += aporteMensal;
    }

    const valorTotalFinal = montanteAtual;
    const jurosTotais = valorTotalFinal - valorInvestidoPuro;
    
    return { 
        valorTotalFinal,
        jurosTotais,
        valorInvestidoPuro,
    };
};

// =======================================================
// COMPONENTE PRINCIPAL (CalculadoraJuros)
// =======================================================
const CalculadoraJuros = () => {
    const navigation = useNavigation();
    const { salvarCalculo } = useCalculo(); // Context API
    
    const [capitalInicial, setCapitalInicial] = useState('');
    const [aporteMensal, setAporteMensal] = useState('');
    const [taxaAnual, setTaxaAnual] = useState('');
    const [tempoAnos, setTempoAnos] = useState('');
    
    const [resultados, setResultados] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const parseNumericInput = (text) => {
        const cleanedText = text.replace(/[^0-9,.]/g, ''); 
        const finalNumber = cleanedText.replace(',', '.');
        return parseFloat(finalNumber) || 0;
    };

    const handleCalcular = () => {
        setIsLoading(true);
        setResultados(null);
        
        const P = parseNumericInput(capitalInicial);
        const A = parseNumericInput(aporteMensal);
        const i = parseNumericInput(taxaAnual);
        const t = parseInt(tempoAnos) || 0;

        // Validação
        if (t <= 0) {
            Alert.alert("Erro", "O tempo em anos deve ser maior que zero.");
            setIsLoading(false);
            return;
        }
        if ((P <= 0 && A <= 0)) {
            Alert.alert("Erro", "Você deve inserir um Valor Inicial ou um Aporte Mensal.");
            setIsLoading(false);
            return;
        }
        
        if (i < 0) {
             Alert.alert("Erro", "A taxa de juros não pode ser negativa.");
             setIsLoading(false);
             return;
        }

        try {
            const result = calcularJurosCompostos(P, A, i, t);
            
            // --- NOVO: SALVAR NO CONTEXTO E NAVEGAR ---
            const dadosCompletos = {
                ...result, 
                capitalInicial: P, 
                aporteMensal: A, 
                taxaAnual: i, 
                tempoAnos: t
            };
            
            setResultados(result);
            salvarCalculo(dadosCompletos); // 1. Salva no estado global
            // 2. Navega para o Histórico após um pequeno delay
            setTimeout(() => {
                navigation.navigate('Historico');
            }, 100); 
            // ------------------------------------------

        } catch (e) {
            Alert.alert("Erro", "Ocorreu um erro inesperado no cálculo. Verifique os valores.");
            console.error(e);
        } finally {
            setTimeout(() => setIsLoading(false), 500);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Simulador de Juros Compostos 📈</Text>

                {/* --- CAMPOS DE ENTRADA --- */}
                <Text style={styles.label}>Capital Inicial (R$):</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Ex: 1000"
                    value={capitalInicial}
                    onChangeText={setCapitalInicial}
                />

                <Text style={styles.label}>Aporte Mensal (R$):</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Ex: 500"
                    value={aporteMensal}
                    onChangeText={setAporteMensal}
                />

                <Text style={styles.label}>Taxa Anual (%):</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Ex: 12"
                    value={taxaAnual}
                    onChangeText={setTaxaAnual}
                />

                <Text style={styles.label}>Tempo (Anos):</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Ex: 10"
                    value={tempoAnos}
                    onChangeText={setTempoAnos}
                />

                {/* --- BOTÃO DE CÁLCULO --- */}
                <Button 
                    title={isLoading ? "Calculando..." : "Calcular Investimento"}
                    onPress={handleCalcular}
                    disabled={isLoading}
                    color="#006400"
                />

                {/* --- NOVO: BOTÃO PARA HISTÓRICO (para navegação manual) --- */}
                <View style={{ marginTop: 15 }}>
                    <Button 
                        title="Ver Último Cálculo"
                        onPress={() => navigation.navigate('Historico')}
                        color="#008B8B"
                    />
                </View>

                {/* --- RESULTADOS LOCAIS --- */}
                {isLoading && <ActivityIndicator size="large" color="#006400" style={{ marginTop: 20 }} />}
                
                {resultados && (
                    <View style={styles.resultadoContainer}>
                        <Text style={styles.resultadoTitle}>Prévia de Resultados</Text>
                        
                        <View style={styles.linhaResultadoTotal}>
                            <Text style={styles.resultadoLabelTotal}>VALOR TOTAL FINAL:</Text>
                            <Text style={styles.resultadoValorTotal}>{formatarMoeda(resultados.valorTotalFinal)}</Text>
                        </View>
                        
                        <Text style={styles.observacao}>
                            * Detalhes completos e histórico disponíveis na tela "Resumo do Investimento".
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

// =======================================================
// ESTILOS (Permanecem Iguais)
// =======================================================
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9f9f9', },
    scrollContent: { padding: 20, },
    title: { fontSize: 26, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#006400', },
    label: { fontSize: 16, marginBottom: 5, marginTop: 10, fontWeight: '600', color: '#333', },
    input: { height: 48, borderColor: '#ddd', borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, backgroundColor: '#fff', fontSize: 16, },
    resultadoContainer: { marginTop: 30, padding: 20, backgroundColor: '#fff', borderRadius: 10, borderLeftWidth: 5, borderLeftColor: '#006400', elevation: 5, },
    resultadoTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#006400', borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 5, },
    linhaResultadoTotal: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, marginTop: 10, borderTopWidth: 2, borderTopColor: '#333', },
    resultadoLabelTotal: { fontSize: 18, fontWeight: 'bold', color: '#333', },
    resultadoValorTotal: { fontSize: 18, fontWeight: 'bold', color: '#006400', },
    observacao: { fontSize: 12, color: '#777', marginTop: 15, textAlign: 'center', }
});

export default CalculadoraJuros;