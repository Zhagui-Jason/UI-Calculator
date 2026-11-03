import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import CustomText from '../components/CustomText';
import Display from '../components/Display';
import Regilla from '../components/Regilla';
import useCalculator from '../hooks/useCalculator';

export default function Index() {
  const { display, expression, history, handlePress } = useCalculator();

  return (
    <SafeAreaView style={styles.container}>
      {/* CIELO DE MARIO (Display) */}
      <View style={styles.displayContainer}>
        <View style={styles.cloudsRow}>
          <Text style={styles.cloudPixel}>☁️</Text>
          <Text style={styles.cloudPixel}>☁️</Text>
          <Text style={styles.cloudPixel}>☁️</Text>
        </View>

        {/* Historial de las últimas operaciones */}
        <View style={styles.historyBox}>
          {history.map((item, i) => (
            <CustomText key={i} style={styles.historyText} numberOfLines={1} adjustsFontSizeToFit>
              {item}
            </CustomText>
          ))}
        </View>

        <Display value={display} subValue={expression} />
      </View>

      {/* BLOQUES DE MARIO (Teclado) */}
      <Regilla onPress={handlePress} />
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
  historyBox: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  historyText: {
    color: '#D8EEFF',
    fontSize: 10,
    textAlign: 'right',
    opacity: 0.7,
    marginBottom: 6,
  },
});