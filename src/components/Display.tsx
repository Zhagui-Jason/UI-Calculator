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
    fontSize: 32, 
    lineHeight: 40,
  },
  subText: { 
    color: '#D8EEFF', 
    fontSize: 14, 
    marginBottom: 8,
  },
});
