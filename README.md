# 📈 Simulador de Investimentos com Juros Compostos

[![React Native](https://img.shields.io/badge/Tecnologia-React_Native-61DAFB?logo=react&logoColor=black)](https://reactnative.dev/)
[![JavaScript](https://img.shields.io/badge/Linguagem-JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![Expo](https://img.shields.io/badge/Plataforma-Expo_Go-1B1F23?logo=expo)](https://expo.dev/)
[![Licença](https://img.shields.io/badge/Licen%C3%A7a-MIT-blue)](LICENSE)

---

Este projeto é um simulador completo de **Juros Compostos com Aportes Mensais**, construído em **React Native** (Expo). Foi refatorado para incluir **navegação entre telas** e **gerenciamento de estado global**, cumprindo requisitos de projetos profissionais.

## 🚀 Funcionalidades

- 💰 **Cálculo de Juros Compostos:** Lógica robusta para simular a acumulação de juros sobre juros.
- 🔄 **Aportes Mensais:** Permite incluir uma contribuição mensal fixa no cálculo.
- 🎯 **Resultados Detalhados:** Exibe de forma clara as três métricas essenciais:
    * **Valor Total Final** (Montante)
    * **Valor Investido Puro** (Soma do Capital Inicial e todos os Aportes)
    * **Total Ganho em Juros** (O lucro gerado pelo investimento)
- 🖥️ **Multi-Telas:** Separação da entrada de dados e da visualização detalhada do resultado.
- 💾 **Persistência de Sessão:** O resultado do último cálculo é salvo e acessível em outra tela.

---

## 🗺️ Navegação e Telas

O aplicativo possui duas telas principais:

1.  **Simulação Principal:** Onde o usuário insere todos os parâmetros (Capital, Aporte, Taxa, Tempo) e inicia o cálculo.
2.  **Resumo do Investimento (Histórico):** Tela dedicada a exibir os resultados detalhados e os parâmetros utilizados no **último cálculo** realizado, buscando os dados via **Context API**.

---

## 📱 Capturas de Tela

<p align="center">
    <img width="300" height="600" alt="Tela 1: Calculadora de Input" src="" />
    <img width="300" height="600" alt="Tela 2: Resumo/Histórico do Cálculo" src="https://github.com/user-attachments/assets/36fc1d77-8346-4e77-aa68-ec224aaea9ea" />
</p>

---


## 🧱 Pilha de Tecnologia (Tech Stack)

- **Linguagem:** **JavaScript**
- **Framework:** **React Native**
- **Ambiente de Desenvolvimento:** **Expo**
- **Navegação:** **React Navigation (Native Stack)**
- **Gerenciamento de Estado:** **React Context API** (para compartilhar o resultado entre telas)
- **Fórmula Financeira:** Iteração Mês a Mês (Série Uniforme de Pagamentos)

---

## 💻 Como Rodar o Projeto

### Pré-requisitos
Certifique-se de ter o **Node.js** e o **Expo CLI** (`npm install -g expo-cli`) instalados.

1.  **Instalar Dependências:** Dentro da pasta do projeto, execute:
    ```bash
    npm install
    ```
    *Obs: Este projeto utiliza as bibliotecas nativas do React Navigation, que devem ser instaladas corretamente.*

2.  **Inicie o Servidor:**
    ```bash
    npx expo start
    ```

3.  **Execute no Celular:** Use o aplicativo **Expo Go** no seu dispositivo Android ou iOS para escanear o **QR Code** que aparecerá no seu terminal.

---

## 💡 Próximos Passos e Melhorias

- Implementar uma **tabela detalhada** com a evolução do montante mês a mês na tela de Histórico.
- Adicionar **gráficos** para visualização do crescimento dos juros vs. capital.
- Possibilidade de salvar o **histórico de múltiplos cálculos** (usando AsyncStorage).

---

## 🧑‍💻 Autor

**Lucas Samuel Dias**
*Desenvolvido para fins de aprendizado, demonstração e uso diário.*

---

## 🪪 Licença

Este projeto está disponível sob a licença **MIT**. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.
