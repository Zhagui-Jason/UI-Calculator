import { Pressable, StyleSheet, View } from 'react-native';
import CustomText from './CustomText';

interface Props {
  label: string;
  type?: 'number' | 'operator' | 'action';
  doubleWidth?: boolean;
}

export default function CalculadoraButton({ label, type = 'number', doubleWidth = false }: Props) {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.button, 
        doubleWidth && styles.doubleButton,
        // 🌟 Si el botón está presionado, cambia su fondo a un naranja más oscuro
        pressed && styles.buttonPressed 
      ]}
    >
      {({ pressed }) => (
        <View style={[styles.blockInner, pressed && styles.innerPressed]}>
          {/* Remaches característicos de Mario */}
          <View style={[styles.dot, styles.topLeft]} />
          <View style={[styles.dot, styles.topRight]} />
          <View style={[styles.dot, styles.bottomLeft]} />
          <View style={[styles.dot, styles.bottomRight]} />
          
          <CustomText style={styles.text}>{label}</CustomText>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { 
    flex: 1, 
    height: 70, 
    backgroundColor: '#E3691A', // El naranja brillante de los bloques de Mario
    borderWidth: 3, 
    borderColor: '#000000', 
    margin: 2,
    // Sombra sutil para simular relieve en reposo
    borderBottomWidth: 6,
  },
  buttonPressed: {
    backgroundColor: '#B54C0B', // Naranja oscuro que simula el bloque "hundido" o golpeado
    borderBottomWidth: 3, // Reduce el borde inferior para simular que bajó el bloque
    marginTop: 5, // Empuja visualmente el bloque hacia abajo al presionarlo
  },
  doubleButton: { 
    flex: 2,
  },
  blockInner: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    position: 'relative',
  },
  innerPressed: {
    opacity: 0.9, // Hace que el texto se oscurezca una pizca al presionar
  },
  text: { 
    color: '#000000', 
    fontSize: 16, 
    fontWeight: 'bold',
  },
  dot: { 
    position: 'absolute', 
    width: 4, 
    height: 4, 
    backgroundColor: '#000000',
  },
  topLeft: { top: 4, left: 4 },
  topRight: { top: 4, right: 4 },
  bottomLeft: { bottom: 4, left: 4 },
  bottomRight: { bottom: 4, right: 4 },
});
