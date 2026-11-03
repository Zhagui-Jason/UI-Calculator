import { StyleSheet, View } from 'react-native';
import Boton, { ButtonType } from './Boton';

interface ButtonDef {
  label: string;
  type?: ButtonType;
  doubleWidth?: boolean;
}

const ROWS: ButtonDef[][] = [
  [
    { label: 'AC', type: 'action' },
    { label: '%', type: 'action' },
    { label: 'DEL', type: 'action' },
    { label: '÷', type: 'operator' },
  ],
  [{ label: '7' }, { label: '8' }, { label: '9' }, { label: '×', type: 'operator' }],
  [{ label: '4' }, { label: '5' }, { label: '6' }, { label: '-', type: 'operator' }],
  [{ label: '1' }, { label: '2' }, { label: '3' }, { label: '+', type: 'operator' }],
  [
    { label: '.' },
    { label: '0' },
    { label: '=', type: 'operator', doubleWidth: true },
  ],
];

interface Props {
  onPress: (label: string) => void;
}

export default function Regilla({ onPress }: Props) {
  return (
    <View style={styles.container}>
      {ROWS.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((btn) => (
            <Boton
              key={btn.label}
              label={btn.label}
              type={btn.type}
              doubleWidth={btn.doubleWidth}
              onPress={() => onPress(btn.label)}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
    backgroundColor: '#000000',
    paddingBottom: 34,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
});