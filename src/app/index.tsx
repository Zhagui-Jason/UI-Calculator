import { useState } from 'react';
import { FlatList, Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Boton from '../components/Boton';
import CustomText from '../components/CustomText';
import Display from '../components/Display';
import Regilla from '../components/Regilla';
import useCalculator from '../hooks/useCalculator';

export default function Index() {
  const { display, expression, history, handlePress, clearHistory } = useCalculator();
  const [showHistory, setShowHistory] = useState(false);

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.displayContainer}>
        <View style={styles.cloudsRow}>
          <Text style={styles.cloudPixel}>☁️</Text>
          <Text style={styles.cloudPixel}>☁️</Text>
          <Text style={styles.cloudPixel}>☁️</Text>
        </View>

        <Pressable style={styles.histButton} onPress={() => setShowHistory(true)}>
          <CustomText style={styles.histButtonText}>HIST</CustomText>
        </Pressable>

        <Display value={display} subValue={expression} />
      </View>

      <Regilla onPress={handlePress} />

      <Modal
        visible={showHistory}
        animationType="slide"
        transparent
        onRequestClose={() => setShowHistory(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <CustomText style={styles.modalTitle}>HISTORIAL</CustomText>

            <FlatList
              style={styles.list}
              data={history}
              keyExtractor={(_, i) => String(i)}
              ListEmptyComponent={
                <CustomText style={styles.emptyText}>Sin operaciones</CustomText>
              }
              renderItem={({ item }) => (
                <CustomText style={styles.historyItem}>{item}</CustomText>
              )}
            />

            <View style={styles.modalButtons}>
              <Boton label="BORRAR" onPress={clearHistory} />
              <Boton label="CERRAR" onPress={() => setShowHistory(false)} />
            </View>
          </View>
        </View>
      </Modal>
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
  histButton: {
    position: 'absolute',
    top: 90,
    right: 20,
    backgroundColor: '#E3691A',
    borderWidth: 3,
    borderColor: '#000000',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  histButtonText: {
    fontSize: 10,
    color: '#000000',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
  },
  modalBox: {
    maxHeight: '75%',
    backgroundColor: '#000000',
    borderWidth: 4,
    borderColor: '#E3691A',
    padding: 16,
  },
  modalTitle: {
    color: '#E3691A',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  list: {
    flexGrow: 0,
    marginBottom: 12,
  },
  historyItem: {
    color: '#FFFFFF',
    fontSize: 10,
    lineHeight: 16,
    textAlign: 'right',
    marginBottom: 14,
  },
  emptyText: {
    color: '#D8EEFF',
    fontSize: 10,
    textAlign: 'center',
    marginVertical: 20,
  },
  modalButtons: {
    flexDirection: 'row',
  },
});