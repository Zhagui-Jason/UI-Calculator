import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet, Vibration, View } from 'react-native';
import CustomText from './CustomText';

const vibrar = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => Vibration.vibrate(30));
};  

export type ButtonType = 'number' | 'operator' | 'action';

interface Props {
  label: string;
  type?: ButtonType;
  doubleWidth?: boolean;
  onPress?: () => void;
}

export default function Boton({ label, type = 'number', doubleWidth = false, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      onPressIn={vibrar}
      style={({ pressed }) => [
        styles.button,
        doubleWidth && styles.doubleButton,
        pressed && styles.buttonPressed,
  ]}
>
      {({ pressed }) => (
        <View style={[styles.blockInner, pressed && styles.innerPressed]}>
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
    backgroundColor: '#E3691A',
    borderWidth: 3,
    borderColor: '#000000',
    margin: 2,
    borderBottomWidth: 6,
  },
  buttonPressed: {
    backgroundColor: '#B54C0B',
    borderBottomWidth: 3,
    marginTop: 5,
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
    opacity: 0.9,
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