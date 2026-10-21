import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import CalculadoraButton from '../components/CalculadoraButton';
import Display from '../components/Display';

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      {/* CIELO DE MARIO (Display) */}
      <View style={styles.displayContainer}>
        <View style={styles.cloudsRow}>
          <Text style={styles.cloudPixel}>☁️</Text>
          <Text style={styles.cloudPixel}>☁️</Text>
          <Text style={styles.cloudPixel}>☁️</Text>
        </View>
        
        {/* Usamos el componente Display para los resultados */}
        <Display value="99.99" subValue="10 + 89.99" />
      </View>

      {/* BLOQUES DE MARIO (Teclado) */}
      <View style={styles.keyboardContainer}>
        {/* Fila 1 */}
        <View style={styles.row}>
          <CalculadoraButton label="AC" type="action" />
          <CalculadoraButton label="±" type="action" />
          <CalculadoraButton label="%" type="action" />
          <CalculadoraButton label="÷" type="operator" />
        </View>

        {/* Fila 2 */}
        <View style={styles.row}>
          <CalculadoraButton label="7" />
          <CalculadoraButton label="8" />
          <CalculadoraButton label="9" />
          <CalculadoraButton label="×" type="operator" />
        </View>

        {/* Fila 3 */}
        <View style={styles.row}>
          <CalculadoraButton label="4" />
          <CalculadoraButton label="5" />
          <CalculadoraButton label="6" />
          <CalculadoraButton label="-" type="operator" />
        </View>

        {/* Fila 4 */}
        <View style={styles.row}>
          <CalculadoraButton label="1" />
          <CalculadoraButton label="2" />
          <CalculadoraButton label="3" />
          <CalculadoraButton label="+" type="operator" />
        </View>

        {/* Fila 5 */}
        <View style={styles.row}>
          <CalculadoraButton label="." />
          <CalculadoraButton label="0" />
          <CalculadoraButton label="=" type="operator" doubleWidth />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000000',
  },
  displayContainer: { 
    flex: 1, 
    backgroundColor: '#5C94FC', 
    justifyContent: 'flex-end', 
    padding: 20,
    position: 'relative',
  },
  cloudsRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    position: 'absolute', 
    top: 40, 
    left: 0, 
    right: 0,
  },
  cloudPixel: { 
    fontSize: 30, 
    opacity: 0.7,
  },
  keyboardContainer: { 
    padding: 4, 
    backgroundColor: '#000000',
    paddingBottom: 34, // 🌟 Protege el botón 0 e Igual de las barras del sistema
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 4,
  },
});
