import { StyleSheet, View } from 'react-native';
import CustomText from './CustomText';

interface Props {
  value: string;
  subValue?: string;
}

export default function Display({ value, subValue }: Props) {
  return (
    <View style={styles.container}>
      <CustomText style={styles.subText}>{subValue}</CustomText>
      <CustomText style={styles.mainText}>{value}</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    width: '100%', 
    alignItems: 'flex-end', 
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  mainText: { 
    color: '#FFFFFF', 
    fontSize: 32, // 🌟 Reducido de 60 a 32 para que "99.99" quepa perfectamente
    lineHeight: 40,
  },
  subText: { 
    color: '#D8EEFF', // 🌟 Un azul muy claro (estilo nube) que combina con el cielo
    fontSize: 14, // 🌟 Ajustado para píxeles
    marginBottom: 8,
  },
});
