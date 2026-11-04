import { StyleSheet, useWindowDimensions, View } from 'react-native';
import CustomText from './CustomText';

interface Props {
  value: string;
  subValue?: string;
}

// Tamaños máximo y mínimo de letra
const MAIN_MAX = 32;
const MAIN_MIN = 14;
const SUB_MAX = 14;
const SUB_MIN = 8;

// Tamaño = ancho disponible / cantidad de caracteres, sin pasar los límites
const fitSize = (text: string, max: number, min: number, available: number) =>
  Math.max(min, Math.min(max, Math.floor(available / Math.max(text.length, 1))));

export default function Display({ value, subValue = '' }: Props) {
  const { width } = useWindowDimensions();
  const available = width - 60; // se descuentan los márgenes de la pantalla

  return (
    <View style={styles.container}>
      <CustomText
        style={[styles.subText, { fontSize: fitSize(subValue, SUB_MAX, SUB_MIN, available) }]}
        numberOfLines={1}
        ellipsizeMode="head"
      >
        {subValue}
      </CustomText>
      <CustomText
        style={[styles.mainText, { fontSize: fitSize(value, MAIN_MAX, MAIN_MIN, available) }]}
        numberOfLines={1}
      >
        {value}
      </CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  mainText: {
    color: '#FFFFFF',
    lineHeight: 40,
    textAlign: 'right',
  },
  subText: {
    color: '#D8EEFF',
    lineHeight: 20,
    marginBottom: 8,
    textAlign: 'right',
  },
});